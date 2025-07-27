<template>
    <div class="add-form">
        <div class="add-form__content">
            <AppInputFiles
                name="imageFiles"
                ref="imageFiles"
                :initialImg="designImg"
                @update:modelValue="onImagesUpdated"
            />
            <div class="add-form__row">
                <AppInput 
                    v-model="designId"
                    placeholder="###"
                    class="add-form__id"
                    type="number"
                />
                <AppInput
                    v-model="designName"
                    placeholder="Назва дизайну"
                    class="add-form__design-name"
                    fullWidth
                />
            </div>
            <AppInput
                v-model="designURL"
                placeholder="https://design###.horoshop.ua/"
                class="add-form__design-url"
                fullWidth
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import AppInput from '~/components/Forms/AppInput.vue'
import AppInputFiles from '~/components/Forms/AppInputFiles.vue'
import type { IImage } from '~/types'

interface IEmits {
    'designIdChange': [value: number],
    'designNameChange': [value: string],
    'designURLChange': [value: string],
    'designImgChange': [imgData: string],
}

interface IProps {
    designId: number,
    designName: string,
    designURL: string,
    designImg: string
}

const emit = defineEmits<IEmits>()
const props = defineProps<IProps>()

const imageFiles = ref()

const designId = ref(props.designId)
const designName = ref(props.designName)
const designURL = ref(props.designURL)

const onImagesUpdated = (newImage: IImage) => emit('designImgChange', newImage.image_base64)

watch(designId, (newId) => {
    emit('designIdChange', newId)
})

watch(designName, (newName) => {
    emit('designNameChange', newName)
})

watch(designURL, (newUrl) => {
    emit('designURLChange', newUrl)
})
</script>

<style lang="scss" scoped>
.add-form {
    @media (min-width: $lg-breakpoint) {
        padding-left: 88px;
    }

    &__id {
        width: 80px;
    }

    &__content {
        @media (min-width: $lg-breakpoint) {
            width: 50%;
        }
    }

    &__row {
        display: flex;
        gap: 8px;
        margin-bottom: 24px;
    }
}
</style>