// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/AutomationCompatible.sol";

error Lottery__notEnoughETH();
error lottery__FailedTranfer();
error Lottery__notOpened();
error Lottery__loteryAlreadyOpened();
error Lottery__ticketSupplyExceeded();

/** @title A fair lottery contract
    @author Michal Vokolek
    @notice This contract is creates untamperable decentralized lottery with fair chance for everyone to win.
 */

contract Lottery is VRFConsumerBaseV2, Ownable, AutomationCompatible {
    struct LotteryData {
        uint256 ticketFee;
        uint256 ticketSupply;
        uint256 maxTicketPerPlayer;
        Player[] players;
        uint256 deadline;
        string lotteryState;
    }

    struct Player {
        address playerAddress;
        uint256 numberOfTickets;
    }

    event LotteryEntered(address player, uint256 numberOfTickets);
    event LotteryStarted();
    event LotteryClosed();
    event ChoosingWinner();
    event WinnerRequestSent(uint256 indexed requestId);
    //for debugging purposes
    event TestUpkeep(uint256 blockTimestamp, uint256 deadline);
    event WinnerChosen(address indexed winner, uint256 amount);

    enum LotteryState {
        Open,
        Closed,
        ChoosingWinner
    }

    uint16 private constant REQUEST_CONFIRMATIONS = 3;
    uint32 private constant NUM_WORDS = 1;
    //values for requesting random number from Chainlink VRF
    bytes32 private immutable i_keyHas;
    uint64 private immutable i_subscriptionId;
    uint32 private immutable i_callbackGasLimit;
    //address where the lottery fee will be sent
    address private s_adminAddress;
    uint256 public s_ticketFee;
    uint256 private s_ticketSupply;
    uint256 s_maxTicketsPerPlayer;
    address payable[] private s_tickets;
    mapping(address => uint256) private s_ticketsPerPlayer;
    address[] private s_ticketsPerPlayerKeys;
    uint256 private s_lotteryDeadline;
    VRFCoordinatorV2Interface private immutable i_vrfCoordinator;
    LotteryState private s_lotteryState;
    uint256 public s_totalTickets;

    constructor(
        address vrfCoordinatorV2,
        address adminAddress,
        uint256 entranceFee,
        bytes32 key_hash,
        uint64 subscriptionId,
        uint32 callbackGasLimit
    ) VRFConsumerBaseV2(vrfCoordinatorV2) {
        s_ticketFee = entranceFee;
        i_vrfCoordinator = VRFCoordinatorV2Interface(vrfCoordinatorV2);
        i_keyHas = key_hash;
        i_subscriptionId = subscriptionId;
        i_callbackGasLimit = callbackGasLimit;
        s_lotteryState = LotteryState.Closed;
        s_adminAddress = adminAddress;
    }

    //automation compatible functions for Chainlink

    function checkUpkeep(
        bytes memory /*checkData */
    )
        public
        override
        returns (bool upkeepNeeded, bytes memory /*performData */)
    {
        emit TestUpkeep(block.timestamp, s_lotteryDeadline);
        upkeepNeeded =
            s_lotteryState == LotteryState.ChoosingWinner &&
            block.timestamp >= s_lotteryDeadline;
    }

    function performUpkeep(bytes memory /*performData */) external override {
        (bool upkeepNeeded, ) = checkUpkeep(bytes(""));
        require(upkeepNeeded, "No upkeep needed");
        s_lotteryState = LotteryState.ChoosingWinner;
        uint256 requestResult = i_vrfCoordinator.requestRandomWords(
            i_keyHas,
            i_subscriptionId,
            REQUEST_CONFIRMATIONS,
            i_callbackGasLimit,
            NUM_WORDS
        );
        emit WinnerRequestSent(requestResult);
    }

    // for debugging purposes
    function requestRandomNumber() public onlyOwner {
        uint256 requestResult = i_vrfCoordinator.requestRandomWords(
            i_keyHas,
            i_subscriptionId,
            REQUEST_CONFIRMATIONS,
            i_callbackGasLimit,
            NUM_WORDS
        );
        emit WinnerRequestSent(requestResult);
    }

    function enterLottery() public payable {
        if (s_lotteryState != LotteryState.Open) {
            revert Lottery__notOpened();
        }
        if (msg.value < s_ticketFee) {
            revert Lottery__notEnoughETH();
        }
        uint256 numOfTickets = msg.value / s_ticketFee;
        //think of a better way to do this
        for (uint256 i = 0; i < numOfTickets; i++) {
            s_tickets.push(payable(msg.sender));
        }

        if (s_ticketsPerPlayer[msg.sender] == 0) {
            s_ticketsPerPlayerKeys.push(msg.sender);
        }
        s_ticketsPerPlayer[msg.sender] += numOfTickets;
        emit LotteryEntered(msg.sender, numOfTickets);
    }

    function fulfillRandomWords(
        uint256 /*requestId */,
        uint256[] memory randomWords
    ) internal override {
        s_lotteryState = LotteryState.Closed;
        uint256 winnerIndex = randomWords[0] % s_tickets.length;
        address payable winner = s_tickets[winnerIndex];
        uint256 winnerShare = (address(this).balance * 90) / 100;
        (bool success, ) = winner.call{value: winnerShare}("");
        (bool sc, ) = s_adminAddress.call{value: address(this).balance}("");
        emit WinnerChosen(winner, winnerShare);
        resetState();
        if (!success || !sc) {
            revert lottery__FailedTranfer();
        }
    }

    // for debugging purposes
    function chooseWinner() public onlyOwner {
        if (s_lotteryState != LotteryState.ChoosingWinner) {
            revert Lottery__loteryAlreadyOpened();
        }
        s_lotteryState = LotteryState.Closed;
        uint256 winnerIndex = s_tickets.length / 2;
        address payable winner = s_tickets[winnerIndex];
        s_tickets = new address payable[](0);
        uint256 winnerShare = (address(this).balance * 90) / 100;
        (bool success, ) = winner.call{value: winnerShare}("");
        (bool sc, ) = s_adminAddress.call{value: address(this).balance}("");
        emit WinnerChosen(winner, winnerShare);
        if (!success || !sc) {
            revert lottery__FailedTranfer();
        }
    }

    function startLotery(
        uint256 ticketFee,
        uint256 ticketSuply,
        uint256 ticketsPerUser,
        uint256 durationInHours
    ) external onlyOwner {
        if (s_lotteryState == LotteryState.Open) {
            revert Lottery__loteryAlreadyOpened();
        }
        s_ticketFee = ticketFee;
        s_ticketSupply = ticketSuply;
        s_maxTicketsPerPlayer = ticketsPerUser;
        s_lotteryDeadline = block.timestamp + (durationInHours * 1 minutes);
        s_lotteryState = LotteryState.Open;
        emit LotteryStarted();
    }

    function closeLottery() external onlyOwner {
        if (s_lotteryState != LotteryState.Open) {
            revert Lottery__notOpened();
        }
        s_lotteryState = LotteryState.Closed;
        s_tickets = new address payable[](0);

        emit LotteryClosed();
    }

    function getLotteryState() external view returns (LotteryData memory) {
        string memory state;
        if (s_lotteryState == LotteryState.Open) {
            state = "Open";
        } else if (s_lotteryState == LotteryState.Closed) {
            state = "Closed";
        } else {
            state = "Choosing winner";
        }
        Player[] memory players = new Player[](s_ticketsPerPlayerKeys.length);
        for (uint256 i = 0; i < s_ticketsPerPlayerKeys.length; i++) {
            players[i] = Player(
                s_ticketsPerPlayerKeys[i],
                s_ticketsPerPlayer[s_ticketsPerPlayerKeys[i]]
            );
        }
        return
            LotteryData(
                s_ticketFee,
                s_ticketSupply,
                s_maxTicketsPerPlayer,
                players,
                s_lotteryDeadline,
                state
            );
    }

    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }

    function setAdminAddress(address adminAddress) external onlyOwner {
        s_adminAddress = adminAddress;
    }

    function getUserTickets(
        address userAddress
    ) external view returns (uint256) {
        return s_ticketsPerPlayer[userAddress];
    }

    function resetState() internal {
        address[] memory keys = s_ticketsPerPlayerKeys;
        s_tickets = new address payable[](0);
        for (uint256 i = 0; i < keys.length; i++) {
            s_ticketsPerPlayer[keys[i]] = 0;
        }
        s_ticketsPerPlayerKeys = new address payable[](0);
        s_lotteryState = LotteryState.Closed;
        s_ticketSupply = 0;
        s_maxTicketsPerPlayer = 0;
        s_totalTickets = 0;
        emit LotteryClosed();
    }
}
