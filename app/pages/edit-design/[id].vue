<template>
    <div class="edit-design">
        <AppContainer>
            <template v-if="data">
                <AppHeading>
                    <template #left-content>
                        <div class="edit-design__heading">
                            <NuxtLink to="/" class="edit-design__back" title="На головну">
                                <SvgoArrowLeft />
                            </NuxtLink>
                            <AppSwitcher v-model="fields.is_published" />
                            <span class="edit-design__label">{{ fields.is_published ? 'Опублікований' : 'Неопублікований' }}</span>
                        </div>
                    </template>
                    <template #right-content>
                        <AppButton @click="handleSaveAndQuitClick" :is-disabled="!hasChanges">Зберегти і вийти</AppButton>
                    </template>
                </AppHeading>
                <DesignForm
                    :design-img="fields.img"
                    :designId="fields.design_id"
                    :designName="fields.name"
                    :designURL="fields.url"
                    @designIdChange="(value) => fields.design_id = value"
                    @designNameChange="(value) => fields.name = value"
                    @designURLChange="(value) => fields.url = value"
                    @designImgChange="(value) => fields.img = value"
                />
            </template>
            <div v-else>
                За цим посиланням немає дизайну
                <br>
                <NuxtLink to="/">На головну</NuxtLink>
            </div>
        </AppContainer>
    </div>
</template>

<script setup lang="ts">
import { collection, doc, getFirestore, updateDoc } from 'firebase/firestore'
import AppButton from '~/components/Buttons/AppButton.vue'
import AppContainer from '~/components/Container/AppContainer.vue'
import AppSwitcher from '~/components/Forms/AppSwitcher.vue'
import AppHeading from '~/components/Heading/AppHeading.vue'
import DesignForm from '~/entities/DesignForm/DesignForm.vue'
import type { IDesign } from '~/entities/DesignsList/types'
import { isValidUrl } from '~/utils'

const route = useRoute()
const { $firebaseApp } = useNuxtApp()
const db = getFirestore($firebaseApp)

const fields = reactive({
    design_id: 0,
    img: '',
    is_published: false,
    name: '',
    url: '',
})

const initialData = ref<IDesign | null>(null)

const areFieldsFilled = (data: Record<string, unknown>) => Object.values(data).every(Boolean) 

const docRef = doc(collection(db, 'designs'), route.params.id as string)
const data = useDocument(docRef)

const hasChanges = computed(() => {
    if (!initialData.value) return false
        return Object.entries(fields).some(([key, value]) => {
        return value !== initialData.value?.[key as keyof IDesign]
    })
})

const handleSaveAndQuitClick = () => {
    if (!hasChanges.value) {
        alert('Немає змін — запит не буде виконано')
        return
    }

    const { is_published, url, ...requiredPayload } = fields

    if (!areFieldsFilled(requiredPayload)) {
        return alert('Заповніть всі поля!')
    }

    if (!isValidUrl(url)) {
        return alert('Не валідний урл!')
    }

    saveAndQuit()
}

const saveAndQuit = async () => {
    try {
        await updateDoc(docRef, fields)
        alert('Успіх!')
        navigateTo('/')
    } catch (error) {
        console.log('Помилка', error)
    }
}

const populateData = (data: IDesign) => {
    initialData.value = { ...data }
    Object.assign(fields, data)
}

watchEffect(() => {
    if (data.value) {
        populateData(data.value as IDesign)
    }
})
</script>

<style lang="scss" scoped>
.edit-design {
    min-height: 100%;
    background-color: $light;
    color: $black;

    &__heading {
        display: flex;
        align-items: center;
    }

    &__back {
        margin-right: 14px;
        color: $black-200;

        @media (min-width: $lg-breakpoint) {
            margin-right: 64px;
        }

        :deep(svg) path {
            fill: $black-200 !important;
        }
    }

    &__label {
        margin-left: 10px;
        font-size: 14px;
        line-height: 18px;
    }
}
</style>