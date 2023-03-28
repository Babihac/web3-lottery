<script setup>

</script>

<template>
    <div class="popup">
        <div class="popup-bg">
          <div class="popup-content">
            <slot></slot>
          </div> 
        </div>
    </div>
</template>

<style lang="scss" scoped>

.popup {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100vh;
  padding: 16px;
  z-index: 99;
}


.popup-bg {
    background: rgba(0, 0, 0, 0.9);
    border-radius: 22px;
    width: 100%;
    height: 100%;
  border: 1px solid #145add7e;
  box-shadow: 1px 1px 2px rgba(31, 128, 170, 0.45), inset 1.5px 1.5px 1px rgba(17, 134, 255, 0.7);
}


.popup-content {
     display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  flex-direction: column;
}

.big-title {
    position: relative;
    font-size: 82px;
    font-family: "Creepster", cursive;
    display: flex;
    justify-content: center;
    text-align: center;

    @media (max-width: 768px) {
        font-size: 52px;
    }
}



</style>
