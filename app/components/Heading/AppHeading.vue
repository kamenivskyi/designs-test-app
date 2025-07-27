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
    flex-wrap: wrap;
    align-items: center;
    min-height: 80px;
    padding: 20px 0;
    gap: 20px;
    width: 100%;

    @media (min-width: $lg-breakpoint) {
        padding: 0;
    }

    :deep(a) {
        color: $light;
    }
}
</style>