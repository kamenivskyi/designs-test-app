<template>
    <div class="main-layout">
        <TheSidebar />
        <main class="main-layout__content">
            <slot />
        </main>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.main-layout {
    display: flex;
    flex-grow: 1;
    min-height: 100vh;

    &__content {
        flex-grow: 1;
    }
}
</style>