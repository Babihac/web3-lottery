<template>
  <div class="wallet">
    <UiSharedButton v-if="!web3.isConnected" :onClick="web3.connect">
      Select wallet
    </UiSharedButton>
    <UiWalletAddress v-else> {{ web3.shortAddress }} </UiWalletAddress>
    <UiWalletBalance> {{ web3.balanceFromWei }} AVAX </UiWalletBalance>
    <UiWalletMetamask />
  </div>
</template>

<script lang="ts" setup>
import { useWeb3 } from "~/stores/web3"

const web3 = useWeb3()

onMounted(async () => {
  addListeners()
})

onUnmounted(() => {
  removeListeners()
})

const addListeners = () => {
  if (window?.ethereum) {
    window.ethereum.on("accountsChanged", (accounts: any) => {
      const account = accounts.length > 0 ? accounts[0] : ""
      web3.switchAccount(account)
    })
    window.ethereum.on("chainChanged", (chainId: any) => {
      web3.switchChainId(chainId)
    })
  }
}
const removeListeners = () => {
  if (window?.ethereum) {
    window.ethereum.removeListener("accountsChanged", () => {})
    window.ethereum.removeListener("chainChanged", () => {})
  }
}
</script>

<style lang="scss" scoped>
.wallet {
  z-index: 50;
  width: 300px;
  position: absolute;
  top: 20px;
  right: 20px;
  border-radius: 12px;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  box-shadow: 0 10px 20px rgb(0, 0, 0, 0.4);

  @media (max-width: 1024px) {
    width: 200px;
  }

  @media (max-width: 800px) {
    top: unset;
    bottom: 36%;
    right: 0px;
    border-radius: 12px 0px 0px 12px;
    padding: 12px;
  }
}
</style>
