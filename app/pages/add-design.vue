<template>
    <div class="add-design">
        <AppContainer>
            <AppHeading>
                <template #left-content>
                    <div class="add-design__heading">
                        <NuxtLink to="/" class="add-design__back">
                            <SvgoArrowLeft />
                        </NuxtLink>
                        <AppSwitcher v-model="isPublished" />
                        <span class="add-design__label">{{ isPublished ? 'Опублікований' : 'Неопублікований' }}</span>
                    </div>
                </template>
                <template #right-content>
                    <AppButton @click="handleSaveAndQuitClick">Зберегти і вийти</AppButton>
                </template>
            </AppHeading>
            <DesignForm
                :designId="payload.design_id"
                :designName="payload.name"
                :designURL="payload.url"
                @designIdChange="(value) => payload.design_id = value"
                @designNameChange="(value) => payload.name = value"
                @designURLChange="(value) => payload.url = value"
                @designImgChange="(value) => payload.img = value"
            />
        </AppContainer>
    </div>
</template>

<script setup>
import { addDoc, collection, getFirestore } from 'firebase/firestore'
import { SvgoArrowLeft } from '#components'

import AppButton from '~/components/Buttons/AppButton.vue'
import AppHeading from '~/components/Heading/AppHeading.vue'
import AppContainer from '~/components/Container/AppContainer.vue'
import AppSwitcher from '~/components/Forms/AppSwitcher.vue'
import DesignForm from '~/entities/DesignForm/DesignForm.vue'
import { isValidUrl } from '~/utils'

const { $firebaseApp } = useNuxtApp()
const db = getFirestore($firebaseApp)

const isPublished = ref(false)
const payload = reactive({
    design_id: 0,
    img: '',
    is_published: false,
    name: '',
    url: '',
})

const areFieldsFilled = (data) => Object.values(data).every(Boolean)

const handleSaveAndQuitClick = () => {
    const { is_published, url, ...requiredPayload } = payload

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
        await addDoc(collection(db, 'designs'), payload)
        alert('Успіх!')
        navigateTo('/')
    } catch (error) {
        console.log('Трапилась помилка', error)
        alert('Трапилась помилка! ', error)
    }
}
</script>

<style lang="scss" scoped>
.add-design {
    min-height: 100%;
    background-color: $light;
    color: $black;

    &__heading {
        display: flex;
        align-items: center;
    }

    &__back {
        margin-right: 64px;
    }

    &__label {
        margin-left: 10px;
        font-size: 14px;
        line-height: 18px;
    }
}
</style>