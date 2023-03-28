<script setup>

</script>

<template>
        <UiPopup>
        <div class="header">
            <div class="exit">
                <div class="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48" fill="#ffffff">
                    <path d="M24 26.1 13.5 36.6q-.45.45-1.05.45-.6 0-1.05-.45-.45-.45-.45-1.05 0-.6.45-1.05L21.9 24 11.4 13.5q-.45-.45-.45-1.05 0-.6.45-1.05.45-.45 1.05-.45.6 0 1.05.45L24 21.9l10.5-10.5q.45-.45 1.05-.45.6 0 1.05.45.45.45.45 1.05 0 .6-.45 1.05L26.1 24l10.5 10.5q.45.45.45 1.05 0 .6-.45 1.05-.45.45-1.05.45-.6 0-1.05-.45Z"/>
                    </svg>
                </div>
            </div>
        </div>
          <div class="big-title">
            <h2>Lotery Closed</h2>
          </div>
            <div class="ufo">
                <div class="ufo-cabine">
                    <img src="@/assets/img/bigufo.png" />
                </div>
                <div class="ufo-trail-1"></div>
                <div class="ufo-trail-2"></div>
                <div class="ufo-trail-3"></div>
            </div>
        </UiPopup>
</template>

<style lang="scss" scoped>


.header {
    display: flex;
    justify-content: flex-end;
    padding-top: 16px;
    padding-right: 16px;
    width: 100%;
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

.ufo {
    position: absolute;
    width: 200px;
    animation: animUfo 5s linear infinite;
    padding-bottom: 32px;
    top: 50px;
    
    @media (max-width: 1024px) {
        max-width: 200px;
        padding-bottom: 0px;
        width: unset;
        top: 0px;
    }
}

@keyframes animUfo {
    0% {
        transform: translateX(0) translateY(0) rotate(0);
    }
    25% {
        transform: translateX(10px) translateY(5px) rotate(-2deg);
    }
    50% {
        transform: translateX(0px) translateY(-15px) rotate(-5deg);
    }
    75% {
        transform: translateX(-10px) translateY(-20px) rotate(3deg);
    }
    100% {
        transform: translateX(0) translateY(0) rotate(0);
    }
}

.ufo-cabine {
    width: 200px;
    position: relative;
    z-index: 10;

    img {
        width: 100%;
        height: auto;
    }

    @media (max-width: 768px) {
        width: 162px
    }
}

.ufo-trail-1 {
    width: 20px;
    height: 210px;
    background-color: #fff;
    position: absolute;
    top: 70px;
    z-index: 0;
    left: 50%;
    margin-left: -10px;
    background: linear-gradient(0deg, rgba(9,9,121,0) 40%, rgba(0,212,255,1) 100%);
    animation: ufoTrail 0.1s linear infinite;
}

.ufo-trail-2 {
    width: 20px;
    height: 210px;
    background-color: #fff;
    position: absolute;
    top: 60px;
    z-index: 0;
    left: 50%;
    margin-left: -5px;
    background: linear-gradient(0deg, rgba(9,9,121,0) 40%, rgba(0,212,255,1) 100%);
    animation: ufoTrail 0.1s linear infinite;
    transform: rotate(5deg);
}

.ufo-trail-3 {
    width: 20px;
    height: 210px;
    background-color: #fff;
    position: absolute;
    top: 60px;
    z-index: 0;
    left: 50%;
    margin-left: -15px;
    background: linear-gradient(0deg, rgba(9,9,121,0) 40%, rgba(0,212,255,1) 100%);
    animation: ufoTrail 0.1s ease infinite;
    transform: rotate(-5deg);
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
