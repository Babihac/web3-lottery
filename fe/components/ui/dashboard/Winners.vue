<template>
  <div class="winners-w">
    <div class="header">
      <div class="text">TOP</div>
      <div class="number">10</div>
      <div class="text">BOOMERS</div>
    </div>
    <div class="winners">
      <div v-for="player in lotteryContract.topFiveParticipants" class="winner">
        <div class="winner-img">
          <img src="@/assets/img/profile.jpg" />
        </div>
        <div class="winner-text">
          <div class="winner-name">{{ player.playerAddress }}</div>
          <div class="winner-price">
            <div class="value">{{ player.numberOfTickets }}</div>
            <UiSharedDiamond class="diamond" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLotteryContract } from "~/stores/lotteryContract"
const lotteryContract = useLotteryContract()
</script>

<style lang="scss" scoped>
.winners {
  padding-top: 10px;

  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
  }
}

.header {
  display: flex;
  align-items: center;
  padding-bottom: 10px;

  .number {
    font-size: 56px;
    padding: 0 10px;
    color: $color-primary;
    transform: rotate(-5deg);
    font-family: "Creepster", cursive;
  }

  .text {
    font-size: 18px;
    text-transform: uppercase;
    font-weight: bold;
    letter-spacing: 0.4px;
  }

  @media (max-width: 768px) {
    justify-content: center;
  }
}

.winner {
  width: 100%;
  display: flex;
  padding: 5px;
  height: 40px;
  padding-left: 65px;
  padding-right: 30px;
  background: rgba(17, 19, 39, 0.8);
box-shadow: 1px 1px 4px rgba(91, 91, 91, 0.25), inset 1px 1px 4px rgba(87, 87, 87, 0.25);
  position: relative;
  border-radius: 40px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    max-width: 320px; 
  }
}

.winner-img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: absolute;
  left: -5px;
  top: -5px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.winner-text {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.winner-price {
  padding-left: 20px;
  display: flex;
  align-items: center;
}

.diamond {
  width: 10px;
  margin-left: 10px;
  position: relative;
  top: 2px;
}
</style>
