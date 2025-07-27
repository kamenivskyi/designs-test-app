<template>
    <input :class="['input', { 'fullWidth': fullWidth }]" v-model="model" />
</template>

<script setup lang="ts">
interface IProps {
    modelValue: string | number,
    fullWidth?: boolean
}

const props = defineProps<IProps>()

const emit = defineEmits<{
    'update:modelValue': [value: string | number]
}>()

const model = computed({
    get() {
        return props.modelValue
    },
    
    set(value) {
        emit("update:modelValue", value)
    },
})
</script>

<style lang="scss" scoped>
.input {
    font-family: $main-font;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    padding: 6px 11px;
    font-style: normal;
    border: 1px solid rgba($black, .2);
    background-color: $light;
    caret-color: rgba($black, .2);
    border-radius: 3px;
    transition: box-shadow $base-ui-transition;

    &::placeholder {
        color: rgba($black, .2);
    }

    &:focus {
    }

    &.fullWidth {
        width: 100%;
    }
}
</style>