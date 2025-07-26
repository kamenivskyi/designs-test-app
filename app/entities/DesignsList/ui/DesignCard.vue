<template>
    <div class="design-card">
        <div class="design-card__img-wrap">
            <img
                :src="data?.img"
                class="design-card__img"
                :alt="data.name"
                :title="data.name"
            />
        </div>
        <div class="design-card__row">
            <span class="design-card__id">
                {{ data.design_id }}
            </span>
            <span class="design-card__name">{{ data.name }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { IDesign } from '../types'

interface IProps {
    data: IDesign
}

defineProps<IProps>()
</script>

<style lang="scss" scoped>
.design-card {
    width: 100%;

    &__img-wrap {
        margin-bottom: 16px;
        height: 428px;
    }

    &__img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    &__row {
        display: flex;
        align-items: center;
        gap: 8px;
    }
    
    &__id {
        font-size: 11px;
        line-height: 18px;
        font-weight: 400;
        color: $black;
        padding: 0 5px;
        border-radius: 8px;
        background-color: $light;
    }

    &__name {
        font-size: 16px;
        line-height: 18px;
    }
}
</style>