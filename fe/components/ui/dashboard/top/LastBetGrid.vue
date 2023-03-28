<template>
  <div class="bet-grid">
    <div
      v-for="(user, index) in lotteryContract.fourLastParticipants"
      :class="`user-last-bet ${getClassName(index)}`"
    >
      <div class="last-bet">
        <div class="user-img">
          <img src="@/assets/img/profile.jpg" />
        </div>
        <div class="user-text">
          <div class="user-price">
            <div class="value">+ {{ user.numberOfTickets }}</div>
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
const getClassName = (index: number) => {
  switch (index) {
    case 0:
      return "first"
    case 1:
      return "two"
    case 2:
      return "three"
    case 3:
      return "four"
    default:
      return ""
  }
}
</script>

<style lang="scss" scoped>
.bet-grid {
  padding-top: 32px;
}

.user-last-bet {
  &.first {
    @media (max-width: 1024px) {
      left: 80px;
    }
  }

  &.two {
    position: relative;
    right: -50%;

    @media (max-width: 1024px) {
      right: 80px;
    }
  }

  &.three {
    position: relative;
    left: -12%;
    top: -20%;

    @media (max-width: 1024px) {
      left: 80px;
      top: -22px;
    }
  }

  &.four {
    position: relative;
    right: -48%;
    top: -4%;

    @media (max-width: 1024px) {
      right: 40px;
      top: -32px;
    }
  }

  @media (max-width: 1024px) {
    width: max-content;
  }
}

.last-bet {
  width: max-content;
  display: flex;
  padding: 5px;
  height: 32px;
  padding-left: 22px;
  padding-right: 16px;
  background-color: #111327;
  position: relative;
  border-radius: 40px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    margin-bottom: 12px;
  }
}

.user-img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  position: absolute;
  left: -5px;
  top: 0px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.user-price {
  padding-left: 20px;
  display: flex;
  align-items: center;
  font-weight: 800;
  font-size: 18px;
}

.diamond {
  width: 10px;
  margin-left: 10px;
  position: relative;
  top: 2px;
}
</style>
