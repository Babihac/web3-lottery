<template>
  <div class="about-page">
    <UiHeader />
    <FxSpace />
    <div class="container">
        <div class="title">
            <h2>ABOUT</h2>
        </div>
        <div class="description">
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                incididunt ut labore et dolore magna aliqua
            </p>
        </div>

        <div class="team-container">
            <section class="box flex relative">
                <div class="profile roman">
                    <!-- <img src="@/assets/img/roman.jpg" alt=""> -->
                </div>
                <h3 class="mt-4 mb-2">Roman Teicher</h3>
                <span>Fullstack developer</span>
            </section>
            <section class="box flex relative">
                <div class="profile julo"></div>
                <h3 class="mt-4 mb-2">Július Petrik</h3>
                <span>Frontend, UX/UI</span>
            </section>
            <section class="box flex relative">
                <div class="profile michal"></div>
                <h3 class="mt-4 mb-2">Michal Vokolek </h3>
                <span>Backend developer</span>
            </section>
        </div>

       <UiFooter />
    </div>
  </div>
</template>

<script lang="ts" setup>
</script>

<style lang="scss" scoped>

h2 {
    font-size: 64px;
    font-family: "Creepster", cursive;
    margin-top: 0px;
    margin-bottom: 16px;
}

h3 {
    color: #ffffff;
    font-size: 20px;
    margin-bottom: 8px;
}

span {
    color: #ffffff;
    font-size: 18px;
    font-weight: 300;
}

.container {
    max-width: 1000px;
    width: 100%;
    position: relative;
    z-index: 0;
    margin: 0 auto;

    @media (max-width: 1024px) {
        padding-left: 16px;
        padding-right: 16px;
    }
}

.description {
    text-align: center;
    font-size: 18px;
    margin-bottom: 32px;
    display: flex;
    justify-content: center;

    p {
        max-width: 520px;
        margin-top: 0px;
        margin-bottom: 0px;
    }
}

.about-page {
  width: 100%;
  min-height: 100vh;
  position: relative;

  .team-container {
    position: relative;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 8px;

    @media (max-width: 640px) {
        grid-template-columns: repeat(1, minmax(0, 1fr));
        gap: 32px;
    }
  }
}

 .team-container {
    @media (max-width: 1024px) {
        gap: 32px;
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media (max-width: 768px) {
        gap: 32px;
        grid-template-columns: repeat(1, minmax(0, 1fr));
    }
}

.title {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
}

.text {
    max-width: 520px;
}

.box {
    display: flex;
    flex-direction: column;
    align-items: center;


    &::before {
            content: '';
            position: absolute;
            width: 180px;
            height: 180px;
            top: -10px;
            // left: 6px;
            border: solid 1px #8C52FF;
            border-radius: 50%;
            transform: translateX(10px);
        }

    .profile {
        position: relative;
        width: 172px;
        height: 172px;
        border-radius: 50%;
        overflow: hidden;

        &.roman {
            background: url('./assets/img/roman.png');
            background-position: center;
            background-size: 100%;
        }

        &.julo {
            background: url('./assets/img/julius.png');
            background-position: center;
            background-size: 100%;
        }

        &.michal {
            background: url('./assets/img/michal.png');
            background-position: center;
            background-size: 100%;
        }
    
    }
}

</style>
