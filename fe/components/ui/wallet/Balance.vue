<template>
    <div class="balance">
        <UiSharedDiamond class="diamond"/>
        Balance: <span class="value"><slot></slot></span>
    </div>
</template>

<style lang="scss" scoped>
.balance {
    background-color: #fff;
    border: 2px solid #2052F3;
    border-radius: 6px;
    padding: 10px 20px;
    width: 100%;
    text-align: center;
    font-size: 14px;
    color: $color-dark-text;
    margin-top: 10px;
    position: relative;
}

.value {
    font-weight: bold;
    letter-spacing: 0.2px;
}

.diamond {
    position: absolute;
    left: -10px;
    bottom: -15px;
}
</style> 