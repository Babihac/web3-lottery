<template>
<div class="footer">
    <NuxtLink to="https://gettogether.cz/" target="_blank">
        <div class="logo">
            <img src="@/assets/img/logo-white.svg" alt="">
        </div>
    </NuxtLink>
    <div class="copywrither">
        <NuxtLink to="https://gettogether.cz/" target="_blank">
            <strong>© Created with love Gettogether technology 2022</strong>
        </NuxtLink>
    </div>
</div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>

.footer {
    margin-top: 52px;
    padding-bottom: 32px;
    display: flex;
    gap: 16px;
    align-items: center;
    justify-content: space-between;

    .logo {
        width: 120px;

        img {
            width: 100%
        }
    }

    .copywrither {
        a {
            color: white;
        }
    }

    @media (max-width: 640px) {
        flex-direction: column;
        gap: 16px;
        justify-content: flex-start;
        align-items: flex-start;
    }
}

</style>