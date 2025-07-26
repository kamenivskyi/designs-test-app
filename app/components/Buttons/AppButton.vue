<template>
    <NuxtLink 
        v-if="to" 
        :to="to"
        v-bind="$attrs"
        :class="classes"
    >
        <slot />
    </NuxtLink>
    <button 
        v-else
        :type="type"
        v-bind="$attrs"
        :class="classes"
    >
        <slot />
    </button>
</template>

<script setup lang="ts">
interface IProps {
    to?: string | undefined,
    type?: 'button' | 'submit' | 'reset',
    fullWidth?: boolean,
    isDisabled?: boolean,
    variant?: 'primary' | 'error'
}

const props = withDefaults(defineProps<IProps>(), {
    variant: 'primary',
    type: 'button'
})

const classes = computed(() => [
    'app-button',
    props.variant,
    { 'full-width': props.fullWidth },
    { 'is-disabled': props.isDisabled },
])
</script>

<style lang="scss" scoped>
.app-button {
    position: relative;
    display: inline-block;
    width: fit-content;
    font-size: 14px;
    line-height: 20px;
    padding: 7px 11px;
    font-family: inherit;
    border-radius: 3px;
    border: 1px solid rgba($black, .2);
    transition: color $base-ui-transition, filter $base-ui-transition;

    @media (any-hover: hover) {
        &:hover {
            filter: brightness(90%);
        }
    }

    &.primary {
        color: $light;
        background-color: $primary;
    }

    &.error {
        color: $error;
        background-color: $light;
    }

    &.full-width {
        width: 100%;
    }

    &.is-disabled {
        pointer-events: none;
        opacity: .5;
    }
}
</style>