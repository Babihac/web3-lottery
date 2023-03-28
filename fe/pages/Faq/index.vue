<template>
  <div class="faq-page">
    <UiHeader />
    <FxSpace />
    <div class="container">
        <div class="fac-container">
                  <div class="faq-content">
        <section class="title">
            <h2>FAQ</h2>
        </section>

        <section class="faq-section">
            
            <transition-group name="home">
            <div 
                v-for="(item, index) in items"
                :key="item.id"
                class="faq-tab"
            >
                <div 
                    @click="openTab(index)"
                    class="title"
                >
                    <h3>{{ item.title }}</h3>
                    <div class="icon">
                        <img v-show="isActive < 0" src="@/assets/img/faq-plus.svg" alt="">
                    </div>
                </div>
                    <div 
                        class="description"
                        :class="{ active: index === isActive }"
                    >
                        <p>
                        {{ item.content }}
                        </p>
                    </div>
                </div>
            </transition-group>
        </section>
      </div>
        </div>

       <UiFooter />
    </div>
  </div>
</template>

<script lang="ts" setup>
    const transition =  {
        name: 'home'
    }
    const isActive = ref(false)
    const openTab = (index: any) => {
        console.log(index)
        isActive.value = index
        console.log(isActive.value)
    }
    const items = [
        {
            title: 'Co je to metamask ?',
            content: 'MetaMask je softwarová kryptoměnová peněženka používaná k interakci s blockchainem Ethereum. Umožňuje uživatelům přistupovat ke své Ethereum peněžence prostřednictvím rozšíření prohlížeče nebo mobilní aplikace, kterou pak lze použít k interakci s decentralizovanými aplikacemi. '
        },
        {
            title: 'Ako sa pripojit do BetSpace',
            content: ' Staci si zalozit penazenku Metamask a jednoducho sa pripojite do cez tlacisko select wallet na uvodnej stranke'
        },
        {
            title: 'Kolko stoji jeden ticket',
            content: 'cena jedneho ticketu je ..... ale mozete si zakupit lubovolne mnozstvo ticketov, cim sa vam zvysuje sanca na vyhru'
        }
    ]
    onMounted(() => {
        openTab(0)
    })

</script>

<style lang="scss" scoped>

h2 {
    font-size: 64px;
    font-family: "Creepster", cursive;
    margin-top: 0px;
    margin-bottom: 32px;
}

h3 {
    color: #ffffff;
    font-size: 32px;
    font-family: "Creepster", cursive;
    margin-bottom: 8px;
    margin-top: 0px;
}

.faq-tab {
    margin-bottom: 16px;
    border-bottom: solid 2px #ffffff47;
    border-radius: 4px;

    .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    &:last-child {
        border-bottom: 0px;
    }
}

span {
    color: #ffffff;
    font-size: 18px;
    font-weight: 300;
}

.fac-container {
    display: flex;
    justify-content: center;
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

.faq-content {
    max-width: 620px;
    width: 100%;
    min-height: 420px;
}

.description {
    display: none;
    opacity: 0;
   transition: all ease .3s;

    &.active {
        display: block;
        opacity: 1;
        transition: all ease .3s;
    }
}

.home-enter-active, .home-leave-active { transition: opacity .5s; }
  .home-enter, .home-leave-active { opacity: 0; transform: translateX(40px); }

</style>
