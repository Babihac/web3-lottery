<template>
    <div class="top">
        <div class="ufo">
            <div class="ufo-cabine">
                <img src="@/assets/img/bigufo.png" />
            </div>
            <div class="ufo-trail-1"></div>
            <div class="ufo-trail-2"></div>
            <div class="ufo-trail-3"></div>
        </div>
        <uiDashboardTopLastBetGrid />
    </div>
</template>

<style lang="scss" scoped>
.top {
    padding-top: 80px;

    @media (max-width: 1024px) {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    
    @media (max-width: 768px) {
        padding-top: 52px;
    }
}

.ufo {
    position: relative;
    animation: animUfo 5s linear infinite;
    padding-bottom: 32px;
    
    @media (max-width: 1024px) {
        max-width: 200px;
        padding-bottom: 0px;
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