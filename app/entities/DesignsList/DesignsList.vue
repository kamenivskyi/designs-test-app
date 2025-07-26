<template>
    <div class="designs">
        <div class="designs__list">
            <DesignCard v-for="item in items" :data="item" />
        </div>
    </div>
</template>

<script setup>
import { useCollection } from 'vuefire'
import { collection, getFirestore } from 'firebase/firestore'
import DesignCard from './ui/DesignCard.vue';

const COLLECTION_KEY = 'designs'

const { $firebaseApp } = useNuxtApp()
const db = getFirestore($firebaseApp)

const items = useCollection(collection(db, COLLECTION_KEY))
</script>

<style lang="scss" scoped>
.designs {
    background: $dark;

    &__list {
        display: grid;
        grid-template-columns: 1fr;
        grid-gap: 20px;

        @media (min-width: 400px) {
            grid-template-columns: 1fr 1fr;
        }
        
        @media (min-width: 720px) {
            grid-template-columns: 1fr 1fr 1fr;
        }

        @media (min-width: 1280px) {
            grid-template-columns: 1fr 1fr 1fr 1fr;
        }
    }
}
</style>