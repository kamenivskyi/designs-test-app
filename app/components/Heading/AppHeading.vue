<template>
    <div class="app-heading">
        <slot name="left-content" />
        <slot name="right-content" />
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.app-heading {
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 80px;
    gap: 20px;
    width: 100%;

    :deep(a) {
        color: $light;
    }
}
</style>