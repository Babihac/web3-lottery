<script setup>
import { useLotteryContract } from "~~/stores/lotteryContract"

// time in seconds
const lotteryContract = useLotteryContract()
console.log(
  "DEADLINE?",
  lotteryContract.lotteryDeadline - Date.now() / 1000,
  lotteryContract.lotteryDeadline
)
const timer = ref(0)

/*
     let hours   = Math.floor(sec / 3600); // get hours
    let minutes = Math.floor((sec - (hours * 3600)) / 60); // get minutes
    let seconds = sec - (hours * 3600) - (minutes * 60); //  get seconds
    */

const hours = computed(() => {
  return Math.floor(timer.value / 3600)
})

const minutes = computed(() => {
  return Math.floor((timer.value - hours.value * 3600) / 60)
})

const seconds = computed(() => {
  return timer.value - hours.value * 3600 - minutes.value * 60
})

setInterval(() => {
  timer.value = Math.round(lotteryContract.lotteryDeadline - Date.now() / 1000)
}, 1000)
</script>

<template>
  <div class="timer-w">
    <div v-if="lotteryContract.lotteryNotClosed && timer > 0" class="timer">
      <div class="hours">{{ hours }}</div>
      :
      <div class="minutes">{{ minutes < 10 ? "0" + minutes : minutes }}</div>
      :
      <div class="seconds">{{ seconds < 10 ? "0" + seconds : seconds }}</div>
    </div>
    <div class="timer-text">
      <h2>Enter to raffle lottery and win 🔥</h2>
      <p>
        Na to aby si sa mohol zapojiť, stačí sa prihlásiť pomocou wallet Metamask a vybrať počet ticketov,
        ktoré chceš vlastniť v tejto lotérií. Čim väčšie množstvo nakúpiš, tým máš väčšiu šancu vyhrať.
      </p>
    </div>
    <UiDashboardTimerTickets />
  </div>
</template>

<style lang="scss" scoped>
.timer-w {
  padding-top: 80px;
  width: 400px;

  @media (max-width: 768px) {
    padding-top: 0px;
    width: 100%;
    display: flex;
    flex-direction: column;

    .timer-text {
      text-align: center;
      order: 3;

      h2 {
        margin-top: 0px;
      }
    }
  }


  @media (max-width: 640px) {
    .timer-text {
      display: none;
    }
  } 
}

.timer {
  display: flex;
  color: $color-primary;
  font-family: "Creepster", cursive;
  font-size: 64px;


  @media (max-width: 768px) {
    position: absolute;
    top: 0%;
    justify-content: center;
    width: 100%;
    left: 0px;
  }
}
</style>
