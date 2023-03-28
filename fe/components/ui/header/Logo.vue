<template>
    <NuxtLink to="/" class="logo">
        <div class="ufo">
            <div class="ufo-cabin">
                <img src="@/assets/img/ufo.png" />
            </div>
            <div class="ufo-trail-1"></div>
            <div class="ufo-trail-2"></div>
            <div class="ufo-trail-3"></div>
        </div>
        <div class="logo-text">
            BETSPACE
        </div>
    </NuxtLink>
</template>

<style lang="scss" scoped>
.logo {
    display: flex;
    align-items: center;
    text-decoration: none;

    &:hover .logo-text{
        color: $color-primary;
    }
}

.logo-text {
    width: 150px;
    padding-left: 20px;
    color: #fff;
    font-family: 'Creepster', cursive;
    font-size: 48px;

    img {
        width: 100%;
        height: auto;
    }

    @media (max-width: 800px) {
        width: 100px;
        font-size: 32px;
    }

    @media (max-width: 500px) {
        display: none;
    }
}
.ufo {
    width: 100px;
    height: auto;
    position: relative;

   @media (max-width: 800px) {
        width: 50px;
    }
}

.ufo-cabin {
    width: 100%;
    position: relative;
    z-index: 10;
    img {
        width: 100%;
        height: auto;
    }
}

.ufo-trail-1 {
    width: 20px;
    height: 50px;
    background-color: #fff;
    position: absolute;
    top: 40px;
    z-index: 0;
    left: 50%;
    margin-left: -10px;
    background: linear-gradient(0deg, rgba(9,9,121,0) 40%, rgba(0,212,255,1) 100%);
    animation: ufoTrail 0.1s linear infinite;

    @media (max-width: 800px) {
        top: 18px;
    }

    @media (max-width: 500px) {
        height: 24px
    }
}

.ufo-trail-2 {
    width: 20px;
    height: 60px;
    background-color: #fff;
    position: absolute;
    top: 30px;
    z-index: 0;
    left: 50%;
    margin-left: -5px;
    background: linear-gradient(0deg, rgba(9,9,121,0) 40%, rgba(0,212,255,1) 100%);
    animation: ufoTrail 0.1s linear infinite;
    transform: rotate(5deg);

    @media (max-width: 800px) {
        top: 18px;
    }
    @media (max-width: 500px) {
        height: 24px
    }
}

.ufo-trail-3 {
    width: 20px;
    height: 60px;
    background-color: #fff;
    position: absolute;
    top: 30px;
    z-index: 0;
    left: 50%;
    margin-left: -15px;
    background: linear-gradient(0deg, rgba(9,9,121,0) 40%, rgba(0,212,255,1) 100%);
    animation: ufoTrail 0.1s ease infinite;
    transform: rotate(-5deg);

    @media (max-width: 800px) {
        top: 18px;
    }
    @media (max-width: 500px) {
        height: 24px
    }
}

@keyframes ufoTrail {
    0% {	
        opacity: 0.5;
    }
    50% {
        opacity: 0.7;
    }
    to {		
        opacity: 0.5;
    }
}
</style> 