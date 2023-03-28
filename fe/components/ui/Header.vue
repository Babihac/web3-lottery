<template>
    <div class="header">
        <UiHeaderLogo />
        <UiHeaderMenu />
    </div>
</template>

<style lang="scss" scoped>
.header {
    position: relative;
    width: 100%;
    height: 130px;
    padding: 40px;
    display: flex;
    align-items: center;
    z-index: 20;

    @media (max-width: 800px) {
        height: 82px;
        padding: 16px;
    }
}
</style> 