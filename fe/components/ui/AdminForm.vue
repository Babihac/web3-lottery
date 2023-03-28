<script lang="ts" setup>
import { useLotteryContract } from "~/stores/lotteryContract"

interface StartLotteryForm {
  ticketFee?: number
  ticketSuply?: number
  ticketPerUser?: number
  duration?: number
}

const lotteryContract = useLotteryContract()
const startLotery = reactive<StartLotteryForm>({
  ticketFee: undefined,
  ticketSuply: undefined,
  ticketPerUser: undefined,
  duration: undefined,
})

// quick and dirty validation

const onStartLottery = async () => {
  if (!startLotery.ticketFee || startLotery.ticketFee < 0) {
    return
  }
  if (!startLotery.duration || startLotery.duration < 0) {
    return
  }

  if (startLotery.ticketPerUser && startLotery.ticketPerUser < 0) {
    return
  }
  if (startLotery.ticketSuply && startLotery.ticketSuply < 0) {
    return
  }
  await lotteryContract.startLottery(
    startLotery.ticketFee,
    startLotery.duration,
    startLotery.ticketSuply,
    startLotery.ticketPerUser
  )
}
</script>

<template>
  <div class="admin-dashboard">
    <div class="custom-form">
      <form action="submit">
        <h2>ADMIN</h2>
        <div class="custom-input">
          <label for="ticketFee">Ticket Fee</label>
          <input name="ticketFee" type="number" v-model="startLotery.ticketFee" />
        </div>
        <div class="custom-input">
          <label for="ticketSuply">Ticket Suply</label>
          <input name="ticketSuply" type="number" v-model="startLotery.ticketSuply" />
        </div>
        <div class="custom-input">
          <label for="ticketPerUser">Ticket Per User</label>
          <input name="ticketPerUser" type="number" v-model="startLotery.ticketPerUser" />
        </div>
        <div class="custom-input">
          <label for="duration">duration Hours</label>
          <input name="duration" type="number" v-model="startLotery.duration" />
        </div>
      </form>
      <UiSharedButton class="btn" @click="onStartLottery">Start Lottery</UiSharedButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.admin-dashboard {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.453);
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
}

.custom-form form {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 32px;
  z-index: 20;
  padding: 32px;
}

.custom-input {
  display: flex;
  flex-direction: column;
  gap: 4px;

  input {
    width: 320px;
    padding-left: 16px;
    padding-right: 16px;
    height: 32px;
    border-radius: 24px;
    border: 1px solid black;
    background: rgba(255, 255, 255, 0.929);
  }
}
</style>
