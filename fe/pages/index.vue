<template>
  <div class="home">
    <FxSpace />
    <UiHeader />
    <UiWallet />
    <UiDashboard />
    <UiLoteryClose v-if="!lotteryContract.isLotteryOpen" />
  </div>
</template>

<script lang="ts" setup>
import { useLotteryContract } from "~/stores/lotteryContract"
import { useWeb3 } from "~/stores/web3"
const lotteryContract = useLotteryContract()
const web3 = useWeb3()
onMounted(async () => {
  await web3.connect()
  await lotteryContract.subscribeToContractEvents()
  await lotteryContract.getLotteryState()
  console.log(lotteryContract.lotteryNotClosed)
})
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100vh;
  position: relative;
}
</style>
