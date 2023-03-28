import { defineStore } from "pinia"
import Web3 from "web3"
import { Contract } from "web3-eth-contract"
import lotteryContrantJSON from "../contracts/Lottery.json"

declare global {
  interface Window {
    ethereum?: any
  }
}

export interface State {
  provider?: Web3
  chainId?: number
  account?: string
  balance?: string
  error?: string
  activeChainIds: number[]
  lotteryContract?: Contract
  lotteryContractAddress?: string
}

export const useWeb3 = defineStore("web3", {
  state: () =>
    ({
      provider: undefined,
      account: undefined,
      chainId: undefined,
      error: undefined,
      balance: undefined,
      lotteryContract: undefined,
      lotteryContractAddress: "0x69fb9E88C118413dF2B57fd094300F8BD36D7c3F",
      activeChainIds: [31337, 5],
    } as State),
  getters: {
    isConnected: (state) => !!state.account,
    shortAddress: (state) => {
      if (!state.account) return ""
      return `${state.account.slice(0, 6)}...${state.account.slice(-4)}`
    },
    balanceFromWei: (state) => {
      if (!state.balance) return ""
      const balance = Web3.utils.fromWei(state.balance, "ether")
      // round to 4 decimals
      return Math.round(Number(balance) * 10000) / 10000
    },
  },
  actions: {
    async connect() {
      if (window.ethereum && !this.account) {
        try {
          const web3 = new Web3(window.ethereum)

          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          })
          const account = accounts[0]
          const chainId = await window.ethereum.request({
            method: "eth_chainId",
          })
          const balance = await web3.eth.getBalance(account)
          this.lotteryContract = new web3.eth.Contract(
            lotteryContrantJSON.abi as any,
            this.lotteryContractAddress
          )
          this.provider = web3
          this.account = account
          this.chainId = chainId
          this.balance = balance
        } catch (error: any) {
          this.error = error.message
        }
      } else {
        this.error = "Please install MetaMask!"
      }
    },
    async switchAccount(currentAccount?: string) {
      if (!currentAccount) {
        this.account = undefined
        this.balance = undefined
        return
      }
      this.account = currentAccount
      this.balance = await this.provider?.eth.getBalance(currentAccount)
    },
    async loadAccountBalance() {
      if (!this.provider) {
        this.error = "Please connect to MetaMask!"

        return
      }
      if (!this.account) {
        this.balance = undefined
        return
      }
      const balance = await this.provider.eth.getBalance(this.account)
      this.balance = balance
    },
    setErrorMessage(error: string) {
      this.error = error
    },
    switchChainId(chainId: number) {
      if (!this.activeChainIds.includes(chainId)) {
        this.error = `chain id ${chainId} is not supported`
        return
      }
      this.chainId = chainId
    },
  },
})
