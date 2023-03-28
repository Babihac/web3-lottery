<template>
    <div class="space">
        <div class="stars"></div>
        <div class="stars-2"></div>
        <div class="stars-3"></div>
        <div class="big-planet">
            <img src="@/assets/img/bigplanet.png" />
        </div>
        <div class="small-planet">
            <img src="@/assets/img/smallplanet.png" />
        </div>
        <div class="stones">
            <div class="big-stone">
                <img src="@/assets/img/bigstone.png" />
            </div>
            <div class="small-stone-1">
                <img src="@/assets/img/smallstone1.png" />
            </div>
            <div class="small-stone-2">
                <img src="@/assets/img/smallstone2.png" />
            </div>
            <div class="small-stone-3">
                <img src="@/assets/img/smallstone3.png" />
            </div>

        </div>
    </div>
</template>

<style lang="scss" scoped>

.space {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(180deg, #121212 0%, #011549 40%, #043DA1 80%, #02A6BF 120%);
    overflow: hidden;
}

// $n is number of stars, $color is color of stars
@function multiple-box-shadow ($n, $color) {
    $value: '#{random(3000)}px #{random(3000)}px #{$color}';

    @for $i from 2 through $n {
        $value: '#{$value}, #{random(3000)}px #{random(3000)}px #{$color}';
    }

    @return unquote($value);
}

$shadows-small: multiple-box-shadow(1000, '#fff');
$shadows-medium: multiple-box-shadow(500, '#fff');
$shadows-big: multiple-box-shadow(200, '#fff');
    
.stars {
    width: 1px;
    height: 1px;
    background: transparent;
    box-shadow: $shadows-small;
    animation: animStar 200s linear infinite;
    
    &:after {
        content: "";
        position: absolute;
        top: 3000px;
        width: 1px;
        height: 1px;
        background: transparent;
        box-shadow: $shadows-small;
    }
}

.stars-2 {
    width: 1px;
    height: 1px;
    background: transparent;
    box-shadow: $shadows-medium;
    animation: animStar 250s linear infinite;

    &:after {
        content: "";
        position: absolute;
        top: 3000px;
        width: 1px;
        height: 1px;
        background: transparent;
        box-shadow: $shadows-medium;
    }
}
    
.stars-3 {
    width: 2px;
    height: 2px;
    background: transparent;
    box-shadow: $shadows-big;
    animation: animStar 300s linear infinite;

    &:after {
        content: " ";
        position: absolute;
        top: 3000px;
        width: 2px;
        height: 2px;
        background: transparent;
        box-shadow: $shadows-big;
    }
}
    
@keyframes animStar {
    from {	
        transform: translateY(0px);
    }
    to {		
        transform: translateY(-3000px);
    }
}

.big-planet {
    position: absolute;
    width: 400px;
    height: auto;
    right: -100px;
    top: -100px;
    animation: animBigPlanet 200s linear infinite;

    img {
        width: 100%;
        height: auto;
        display: block;
    }

    @media (max-width: 768px) {
       width: 162px;
        top: unset;
        bottom: 120px;
    }
}

@keyframes animBigPlanet {
    0% {	
        transform: rotate(0) translateX(0);
    }
    50% {
        transform: rotate(180%) translateX(-200px);
    }
    100% {		
        transform: rotate(360deg) translateX(0);
    }
}

.small-planet {
    position: absolute;
    width: 100px;
    height: auto;
    left: 0;
    top: calc(50vh - 50px);
    animation: animSmallPlanet 100s linear infinite;

    img {
        width: 100%;
        height: auto;
        display: block;
    }
}

@keyframes animSmallPlanet {
    from {	
        transform: translateY(0) translateX(-100px);
    }
    to {		
        transform: translateY(0) translateX(100vw);
    }
}

.stones {
    position: absolute;
    width: 200px;
    height: 200px;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 1024px) {
        width: 80px;
        height: 130px;
        left: 0px;
    }
}

.big-stone {
    width: 150px;
    height: auto;

    img {
        width: 100%;
        height: auto;
    }

    animation: animBigStone 100s linear infinite;

    @media (max-width: 1024px) {
        width: 80px;
    }
}

.small-stone-1 {
    position: absolute;
    left: 20px;
    top: 0;
    width: 40px;
    height: auto;

    img {
        width: 100%;
        height: auto
    }

    animation: animSmallStone1 20s linear infinite;
}

.small-stone-2 {
    position: absolute;
    right: 20px;
    top: 10px;
    width: 20px;
    height: auto;

    img {
        width: 100%;
        height: auto
    }

    animation: animSmallStone2 100s linear infinite;
}

.small-stone-3 {
    position: absolute;
    right: 5px;
    bottom: 10px;
    width: 30px;
    height: auto;

    img {
        width: 100%;
        height: auto
    }

    animation: animSmallStone2 30s linear infinite;
}

@keyframes animBigStone {
    0% {	
        transform: rotate(0) translateX(0);
    }
    50% {
        transform: rotate(-180deg) translateX(100px);
    }
    100% {		
        transform: rotate(-360deg) translateX(0);
    }
}

@keyframes animSmallStone1 {
    0% {	
        transform: rotate(0);
    }
    50% {
        transform: rotate(-180deg);
    }
    100% {		
        transform: rotate(-360deg);
    }
}

@keyframes animSmallStone2 {
    0% {	
        transform: rotate(0);
    }
    50% {
        transform: rotate(180deg);
    }
    100% {		
        transform: rotate(360deg);
    }
}
    
</style>