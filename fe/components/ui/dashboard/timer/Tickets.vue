<script lang="ts" setup>
import { useLotteryContract } from "~~/stores/lotteryContract"
const tickets = ref(1)
const lotteryContract = useLotteryContract()
const enterLottery = async () => {
  await lotteryContract.enterLottery(tickets.value)
  tickets.value = 1
}
</script>

<template>
  <div v-if="lotteryContract.isLotteryOpen" class="tickets">
    <div class="your-tickets">
      <div class="ticket-info balance">
        <div class="label">
          <span>Sold tickets:</span>{{ lotteryContract.totalNumberOfTickets }}
        </div>
        <div class="label"><span>Your tickets:</span> {{ lotteryContract.getMyTickets }}</div>
      </div>
      <div class="ticket-info ratio">
        <div class="coins">
          <div class="value">1 ticket = {{ lotteryContract.ticketFee }}</div>
          <UiSharedDiamond class="diamond" />
        </div>
      </div>
    </div>
    <div class="buy-ticket">
      <input type="number" class="ticket-count" v-model="tickets" min="1" />
      <UiSharedButton theme="secondary" :onClick="enterLottery">Buy ticket</UiSharedButton>
    </div>
  </div>
  <div v-else-if="lotteryContract.isChoosingWinner">
    you can't enter the lottery anymore. Winner is being chosen soon
  </div>
</template>

<style lang="scss" scoped>
.tickets {
  padding: 10px 0;

  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
}

.your-tickets {
  margin-bottom: 12px;

  @media (max-width: 768px) {
    order: 2;
  }
}

.buy-ticket {
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    order: 1;
    min-width: 320px;
  }
}

.ticket-count {
  display: block;
  width: 60px;
  border-radius: 6px;
  border: 2px solid $color-primary;
  margin-right: 10px;
  height: 40px;
  padding: 5px;
  font-size: 18px;
}

.ticket-info {
  display: flex;
  align-items: center;
  padding-top: 10px;
  justify-content: flex-start;

  @media (max-width: 768px) {
    justify-content: center;
    padding-top: 12px;
    flex-direction: column;
  }
}

.coins {
  padding-left: 10px;
  display: flex;
  align-items: center;
}

.label {
  font-family: "Creepster", cursive;
  font-size: 32px;
}

.value {
  font-weight: bold;
}

.balance {
  padding-top: 6px;

  span {
    color: $color-primary;
  }

  @media (max-width: 768px) {
    padding-top: 10px;
  }
}

.diamond {
  width: 15px;
  margin-left: 10px;
}
</style>
