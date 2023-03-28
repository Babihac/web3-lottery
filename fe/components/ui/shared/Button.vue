<script setup>
const props = defineProps({
  theme: {
    type: String,
    required: false,
    default: "primary",
  },
  onClick: {
    type: Function,
    required: false,
    default: () => {},
  },
})
</script>

<template>
  <div class="button" :class="theme" @click="onClick">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.button {
  color: $color-default-text;
  background: linear-gradient(180deg, #0094ff 0%, #2052f3 100%);
  border-radius: 6px;
  text-transform: uppercase;
  padding: 10px 20px;
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-weight: bold;
  font-size: 14px;
  letter-spacing: 0.2px;

  &.secondary {
    background: linear-gradient(180deg, #5200ff 0%, #db00ff 100%);
  }

  &:hover {
    background: #2052f3;
  }
}
</style>
