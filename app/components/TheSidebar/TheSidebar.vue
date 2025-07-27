<template>
    <aside class="sidebar">
        <NuxtLink to="/">
            <Logo class="sidebar__logo" title="Logo" />
        </NuxtLink>
    </aside>
</template>

<script setup>
import Logo from '~/assets/icons/logo.svg'
</script>

<style lang="scss" scoped>
.sidebar {
    display: flex;
    justify-content: center;
    padding-top: 9px;
    min-width: 40px;
    max-width: 40px;
    background-color: $secondary;
    min-height: 100%;

    &__logo {
        width: 24px;
        height: 24px;
        color: $light;
    }
}
</style>