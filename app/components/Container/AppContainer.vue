<template>
    <div class="app-container">
        <slot />
    </div>
</template>

<style scoped lang="scss">
.app-container {
    padding: 0 15px;
    
    @media (min-width: 720px) {
        padding: 0 32px;
    }
}
</style>
