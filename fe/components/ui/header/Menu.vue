<template>
    <div class="menu">
        <NuxtLink class="menu-link" to="/">GAME</NuxtLink>
        <NuxtLink class="menu-link" to="/about">ABOUT</NuxtLink>
        <NuxtLink class="menu-link" to="/faq">FAQ</NuxtLink>
        <!-- <NuxtLink class="menu-link" to="/">Contact</NuxtLink> -->
    </div>
    <div class="mobile-menu">
        <div class="count-section">
            <div class="wallet-count">
            Coins: 
        </div>
        </div>
        <div @click="activeMenu = !activeMenu" class="hamburger-button">
            <div v-if="!activeMenu" class="icon">
                 <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    viewBox="0 0 384.97 384.97" style="enable-background:new 0 0 384.97 384.97;" xml:space="preserve">
                    <g id="Menu">
                        <path d="M12.03,84.212h360.909c6.641,0,12.03-5.39,12.03-12.03c0-6.641-5.39-12.03-12.03-12.03H12.03
                            C5.39,60.152,0,65.541,0,72.182C0,78.823,5.39,84.212,12.03,84.212z"/>
                        <path d="M372.939,180.455H12.03c-6.641,0-12.03,5.39-12.03,12.03s5.39,12.03,12.03,12.03h360.909c6.641,0,12.03-5.39,12.03-12.03
                            S379.58,180.455,372.939,180.455z"/>
                        <path d="M372.939,300.758H12.03c-6.641,0-12.03,5.39-12.03,12.03c0,6.641,5.39,12.03,12.03,12.03h360.909
                            c6.641,0,12.03-5.39,12.03-12.03C384.97,306.147,379.58,300.758,372.939,300.758z"/>
                    </g>
                </svg>
            </div>
            <div v-else class="icon">
                <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.22676 4.22676C4.5291 3.92441 5.01929 3.92441 5.32163 4.22676L12 10.9051L18.6784 4.22676C18.9807 3.92441 19.4709 3.92441 19.7732 4.22676C20.0756 4.5291 20.0756 5.01929 19.7732 5.32163L13.0949 12L19.7732 18.6784C20.0756 18.9807 20.0756 19.4709 19.7732 19.7732C19.4709 20.0756 18.9807 20.0756 18.6784 19.7732L12 13.0949L5.32163 19.7732C5.01929 20.0756 4.5291 20.0756 4.22676 19.7732C3.92441 19.4709 3.92441 18.9807 4.22676 18.6784L10.9051 12L4.22676 5.32163C3.92441 5.01929 3.92441 4.5291 4.22676 4.22676Z" fill="#030D45"/>
                </svg>
            </div>
        </div>
        <div class="popup-menu" :class="{ active: activeMenu}">
            <NuxtLink class="menu-link" to="/">Home</NuxtLink>
             <NuxtLink class="menu-link" to="/about">About</NuxtLink>
            <NuxtLink class="menu-link" to="/faq">FAQ</NuxtLink>
            <!-- <NuxtLink class="menu-link" to="/">Contact</NuxtLink> -->
        </div> 
    </div>
</template>
<script lang="ts" setup>
    const activeMenu = ref(false)

</script>

<style lang="scss" scoped>

.count-section {
    width: 100%;
    display: flex;
    justify-content: center;
}

.wallet-count {
    background-color: #fff;
    border: 2px solid #2052F3;
    border-radius: 6px;
    padding: 10px 20px;
    text-align: center;
    font-size: 14px;
    color: #222;
    position: relative;
    min-width: 120px;
    margin-left: 42px;
}

.menu {
    padding: 0 80px;

    @media (max-width: 800px) {
        display: none;
    }
}
.menu-link {
    color: $color-default-text;
    text-decoration: none;
    font-weight: bold;
    padding: 10px;

    &:hover {
        color: $color-primary;
    }
}

.mobile-menu {
    display: none;


    @media (max-width: 800px) {
        display: block;
    }

    .hamburger-button {
        position: absolute;
        z-index: 99;
        right: 16px;
        top: 16px;
    }

    .icon {
        width: 52px;
        height: 52px;
        // padding: 12px;
        background: white;
        border-radius: 50%;
        border: 1px solid #145CDD;
        display: flex;
        justify-content: center;
        align-content: center;
        align-items: center;

        svg {
            width: 24px;
            height: 24px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        &:hover {
            cursor: pointer;
            background: #145CDD; 
            transition: all ease .3s;

            svg {
               path {
                fill: white;
               }
            }
        }
    }
    

    .popup-menu {
        display: none;
        position: absolute;
        left: 0px;
        top: 0px;
        z-index: 51;
        width: 100%;
        background: rgba(17, 19, 39, 0.8);
        height: 100vh;
        padding: 32px;
        padding-top: 64px;

        &.active {
            display: flex;
            flex-direction: column;
        }

        a {
            font-size: 42px;
        }
    }
}
</style> 