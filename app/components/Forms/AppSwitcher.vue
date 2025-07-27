<template>
    <label :class="['switch', { 'switch--disabled': disabled } , { active : !!modelValue }]">
        <input
            v-model="model"
            type="checkbox"
            :disabled="disabled"
        />
        <span class="slider"></span>
    </label>
</template>

<script setup lang="ts">
interface IProps {
    modelValue: boolean | [],
    disabled?: boolean
}
const props = defineProps<IProps>()

const emit = defineEmits<{
    'update:modelValue': [value: boolean | []]
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
.switch {
    position: relative;
    display: inline-block;
    width: 64px;
    height: 24px;

    input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba($black, .1);
        border-radius: 14px;

        &::before {
            position: absolute;
            content: "";
            width: 20px;
            height: 20px;
            top: 50%;
            left: 0;
            transform: translate(2px, -50%);
            background-color: $light;
            border-radius: 50%;
            transition: $base-ui-transition;
            box-shadow: 0 2px 4px 0px rgba($black, .15);
        }
    }

    &.active {
        .slider {
            background-color: $success;

            &::before {
                transform: translate(42px, -50%);
            }
        }
    }

    &--disabled {
        .slider {
            background-color: $light;
            pointer-events: none;
            
            &::before {
                background-color: $secondary;
            }
        }
    }
}
</style>