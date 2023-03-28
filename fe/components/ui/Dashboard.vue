<template>
    <div class="dashboard">
        <UiDashboardWinners />
        <UiDashboardTop />
        <UiDashboardTimer />
    </div>
</template>

<style lang="scss" scoped>

.dashboard {
    width: 100%;
    height: calc(100vh - 130px);
    overflow: auto;
    display: flex;
    justify-content: space-between;
    padding: 20px 40px;
    position: relative;
    z-index: 10;

    @media (max-width: 1024px) {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 16px;

        .winners-w {
            order: 3;
        }

        .top{ 
            order: 2;
        }

        .timer-w {
            order: 1;
            padding-top: 54px;
        }

    }

    @media (max-width: 768px) {
        display: grid;
        grid-template-columns: repeat(1, minmax(0, 1fr));
        gap: 0px;
        padding: 16px;

         .top{ 
            order: 1;
        }

        .timer-w {
            order: 1;
            padding-top: 0px;
        }
    }
}
</style> 