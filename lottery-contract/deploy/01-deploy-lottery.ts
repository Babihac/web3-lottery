import { ethers, network } from "hardhat"
import { DeployFunction } from "hardhat-deploy/types"
import { HardhatRuntimeEnvironment } from "hardhat/types"
import { developmentChains, networkConfig } from "../helper-hardhat-config"
import { verify } from "../utils/verify"

const deployLottery: DeployFunction = async function ({
  getNamedAccounts,
  deployments,
}: HardhatRuntimeEnvironment) {
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()
  const chainId = network.config.chainId
  const VRF_SUB_FUND_AMOUNT = ethers.utils.parseEther("2")
  let vrfCoordinatorV2Address, subscriptionId

  if (developmentChains.includes(network.name)) {
    const vrfCoordinatorV2Mock = await ethers.getContract(
      "VRFCoordinatorV2Mock"
    )
    vrfCoordinatorV2Address = vrfCoordinatorV2Mock.address
    log("ADDRESS", vrfCoordinatorV2Address)
    const transactionResponse = await vrfCoordinatorV2Mock.createSubscription()
    const transactionReceipt = await transactionResponse.wait()
    subscriptionId = transactionReceipt.events[0].args.subId
    await vrfCoordinatorV2Mock.fundSubscription(
      subscriptionId,
      VRF_SUB_FUND_AMOUNT
    )
  } else {
    log("Network detected, deploying Lottery")
    vrfCoordinatorV2Address = networkConfig[chainId!]["vrfCoordinatorV2"]
    subscriptionId = networkConfig[chainId!]["subscriptionId"]
  }
  log("VRFCoordinatorV2 address: " + vrfCoordinatorV2Address)
  const entranceFee = networkConfig[chainId!]["entranceFee"]
  const gasLane = networkConfig[chainId!]["gasLane"]
  const callbackGasLimit = networkConfig[chainId!]["callbackGasLimit"]
  const interval = networkConfig[chainId!]["interval"]
  const adminAddress = "0x3718c360Aa8EA1Aa6706a960875BB405AEAbEE57"
  log("SUB ID: " + subscriptionId)
  const args = [
    vrfCoordinatorV2Address,
    adminAddress,
    entranceFee,
    gasLane,
    subscriptionId,
    callbackGasLimit,
  ]

  const lottery = await deploy("Lottery", {
    from: deployer,
    args: args,
    log: true,
    waitConfirmations: 1,
  })

  //   const test = await vrfCoordinatorV2Mock.addConsumer(
  //     subscriptionId,
  //     "0xdc64a140aa3e981100a9beca4e685f962f0cf6c9"
  //   )
  //   const test2 = await test.wait()
  //   const event = test2.events[0]

  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    log("Verifying Lotery contract")
    await verify(lottery.address, args)
    log("______________________________________")
  }
}

export default deployLottery
deployLottery.tags = ["all", "lottery"]
