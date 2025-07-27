<template>
    <div class="input-file" @drop.prevent="onDropFiles" @dragover.prevent>
        <div v-if="previewUrl" class="input-file__preview">
            <img
                :src="previewUrl"
                class="input-file__selected-img"
                alt="Вибрана картинка"
                title="Вибрана картинка"
            />
            <button
                type="button"
                class="input-file__remove"
                @click="removePreviewUrl"
                title="Видалити"
            >
                <SvgoTrashBin class="input-file__remove-icon" />
            </button>
        </div>
        <template v-else>
            <label :for="name" class="input-file__inner">
            <span class="input-file__placeholder">
                <SvgoSkeletonImg class="input-file__skeleton-img" />
            </span>
            </label>
    
            <input
                type="file"
                :id="name"
                :name="name"
                class="input-file__input"
                accept="image/*"
                @change="onInputChange"
            />
    
        </template>
        <div v-if="!isValidFile" class="input-file__error">{{ errorText }}</div>
    </div>
</template>

<script setup lang="ts">
interface IProps {
    name: string,
    error?: string,
    initialImg: string | undefined
}

const props = defineProps<IProps>()

const emit = defineEmits<{
    'update:modelValue': [data: { file_name: string, image_base64: string }]
}>()

const validTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif']
const maxSize = 5 * 1024 * 1024

const previewUrl = ref(props.initialImg)
const isValidFile = ref(true)
const errorText = ref('')

const removePreviewUrl = () => {
    previewUrl.value = ''

    emit('update:modelValue', {
        file_name: '',
        image_base64: ''
    })
}

const onDropFiles = (event: DragEvent) => {
    const files = event.dataTransfer?.files

    if (files) {
        onChangeFile(files)
    }
}

const onInputChange = (event: Event) => {
    const target = event.target as HTMLInputElement
    const files = target.files

    if (files) {
        onChangeFile(files)
    }
}

const onChangeFile = async (files: FileList) => {
    const file = files[0]
    if (!file) return

    const isValid = validateFile(file)
    if (!isValid) return

    previewUrl.value = URL.createObjectURL(file)

    const base64 = await fileToBase64(file)
    emit('update:modelValue', {
        file_name: file.name,
        image_base64: base64
    })
}

const validateFile = (file: File) => {
    if (!validTypes.includes(file.type)) {
        isValidFile.value = false
        errorText.value = 'Непідтримуваний формат файлу'
        return false
    }

    if (file.size > maxSize) {
        isValidFile.value = false
        errorText.value = 'Файл занадто великий (макс 5MB)'
        return false
    }

    isValidFile.value = true
    errorText.value = ''
    return true
}

const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            if (typeof reader.result === 'string') {
                resolve(reader.result)
            }
        }
        reader.onerror = reject
    })
}

const resetInputFile = () => {
    isValidFile.value = true
    errorText.value = ''
}


defineExpose({
    resetInputFile,
})

</script>

<style lang="scss" scoped>
.input-file {
    margin-bottom: 40px;

    input {
        display: none;
    }

    &__inner {
        padding: 36px 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        border: 2px dashed rgba($black, .1);
        border-radius: 3px;
    }

    &__icon {
        height: 40px;
        width: 40px;
    }

    &__file-type {
        color: $secondary;
        width: 99px;
    }

    &__error {
        color: $error;
        margin-top: 10px;
    }

    &__preview {
        position: relative;
        width: 120px;
        box-shadow: 0 8px 20px 0 rgba($black, .15);
        border: 1px solid rgba($black, .15);
        border-radius: 3px;
        overflow: hidden;
    }

    &__skeleton-img {
        width: 60px;
        height: 48px;
    }

    &__selected-img {
        height: 100%;
        width: 100%;
    }

    &__remove {
        position: absolute;
        right: 4px;
        bottom: 4px;
        background-color: rgba($dark, .5);
        padding: 4px;
        border-radius: 3px;
        border: none;
        cursor: pointer;
    }

    &__remove-icon {
        width: 16px;
        height: 16px;
        stroke: $light;
    }
}
</style>
