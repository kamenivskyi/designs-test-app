<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>

<script setup>
useSeoMeta({
    title: 'Test task',
    robots: 'noindex, nofollow'
})
</script>

<style lang="scss">
@use '@/assets/styles/index' as *;
</style>
