<template>
    <div class="home-page">
        <AppContainer>
            <AppHeading>
                <template #left-content>
                    <NuxtLink to="/">Всі дизайни</NuxtLink>
                </template>
                <template #right-content>
                    <AppButton to="/add-design">Додати дизайн</AppButton>
                </template>
            </AppHeading>
            <DesignsList />
        </AppContainer>
    </div>
</template>

<script setup>
import AppButton from '~/components/Buttons/AppButton.vue'
import AppContainer from '~/components/Container/AppContainer.vue'
import AppHeading from '~/components/Heading/AppHeading.vue'
import DesignsList from '~/entities/DesignsList/DesignsList.vue'
</script>

<style lang="scss" scoped>

</style>