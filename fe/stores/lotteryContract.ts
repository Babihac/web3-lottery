import { defineStore, Store } from "pinia"
import { useWeb3 } from "./web3"
import { editParticipants } from "./utils"

export interface Participant {
  playerAddress: string
  numberOfTickets: number
}

interface State {
  lotteryState: string | null
  ticketFee: number
  maxTicketsSupply: number | null
  maxTicketsPerPlayer: number | null
  participants: Participant[]
  lotteryDeadline: number | null
}

export const useLotteryContract = defineStore("lotteryContract", {
  state: () =>
    ({
      lotteryState: null,
      ticketFee: 1000,
      maxTicketsSupply: null,
      maxTicketsPerPlayer: null,
      participants: [],
      lotteryDeadline: null,
    } as State),
  getters: {
    isLotteryOpen: (state) => state.lotteryState === "Open",
    isChoosingWinner: (state) => state.lotteryState === "ChoosingWinner",
    lotteryNotClosed: (state) => state.lotteryState !== "Closed",
    topFiveParticipants: (state) => {
      if (state.participants) {
        return [...state.participants]
          .sort((a, b) => b.numberOfTickets - a.numberOfTickets)
          .slice(0, 5)
      }
    },
    fourLastParticipants: (state) => {
      if (state.participants) {
        return [...state.participants].slice(-4)
      }
    },
    totalNumberOfTickets: (state) => {
      if (state.participants) {
        return state.participants.reduce((acc, participant) => acc + participant.numberOfTickets, 0)
      }
      return 0
    },
    getMyTickets: (state) => {
      const { account } = useWeb3()
      const myTickets = state.participants.find(
        (participant) =>
          participant.playerAddress.toLocaleLowerCase() === account?.toLocaleLowerCase()
      )
      return myTickets ? myTickets.numberOfTickets : 0
    },
  },
  actions: {
    async getLotteryState() {
      if (!window?.ethereum) return
      const web3 = useWeb3()
      if (!web3.provider) return
      const lotteryState = await web3?.lotteryContract?.methods?.getLotteryState().call()
      this.lotteryState = lotteryState.lotteryState
      this.ticketFee = lotteryState.ticketFee
      this.maxTicketsSupply = lotteryState.ticketSupply
      this.maxTicketsPerPlayer = lotteryState.maxTicketPerPlayer
      this.participants = lotteryState.players
      this.lotteryDeadline = lotteryState.deadline
      console.log("lotteryState", lotteryState)
    },
    async enterLottery(tickets: number) {
      console.log("value", tickets * this.ticketFee, "tickets", tickets, "fee", this.ticketFee)
      if (!window?.ethereum) return
      const web3 = useWeb3()
      if (!web3.provider) return
      const tx = await web3?.lotteryContract?.methods?.enterLottery().send({
        from: web3?.account,
        value: tickets * this.ticketFee,
      })
    },
    myTickets() {
      if (!window?.ethereum) return
      const web3 = useWeb3()
      if (!web3?.account) return

      const userTickets = this.participants.find(
        (participant) => participant.playerAddress === web3?.account
      )
      return userTickets?.numberOfTickets ?? 0
    },
    async subscribeToContractEvents() {
      if (!window?.ethereum) return
      const web3 = useWeb3()
      if (!web3.provider) return

      web3?.lotteryContract?.events.allEvents({}, async (error: any, event: any) => {
        console.log("EVENT", event)
        switch (event.event) {
          case "LotteryStarted":
            // TODO add some notification on frontend
            await this.getLotteryState()
            break
          case "LotteryEntered":
            this.participants = editParticipants(
              this.participants,
              event.returnValues.player,
              event.returnValues.numberOfTickets
            )
            break
          case "LotteryClosed":
            await this.getLotteryState()
            break
          case "WinnerChosen":
            // TODO - add some notification on frontend
            console.log("WinnerChosen", event.returnValues.winner, event.returnValues.amount)
            break
        }
      })
    },
    async startLottery(
      ticketFee: number,
      duration: number,
      ticketSupply?: number,
      ticketsPerPlayer?: number
    ) {
      if (!window?.ethereum) return
      const web3 = useWeb3()
      if (!web3?.provider) return
      console.log("Starting lottery")
      const tx = await web3?.lotteryContract?.methods
        ?.startLotery(ticketFee, ticketSupply ?? 0, ticketsPerPlayer ?? 0, duration)
        .send({
          from: web3?.account,
        })
    },
  },
})
