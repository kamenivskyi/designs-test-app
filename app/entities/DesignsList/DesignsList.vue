<template>
    <div class="designs">
        <div v-if="items?.length > 0" class="designs__list">
            <DesignCard
                v-for="item in items"
                :to="`/edit-design/${item.id}`"
                :data="item"
                :key="item.id"
            />
        </div>
        <div v-else>
            Поки немає даних
        </div>
    </div>
</template>

<script setup>
import { useCollection } from 'vuefire'
import { collection, getFirestore } from 'firebase/firestore'
import DesignCard from './ui/DesignCard.vue'

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

        @media (min-width: $sm-breakpoint) {
            grid-template-columns: 1fr 1fr;
        }
        
        @media (min-width: $md-breakpoint) {
            grid-template-columns: 1fr 1fr 1fr;
        }

        @media (min-width: $lg-breakpoint) {
            grid-template-columns: 1fr 1fr 1fr 1fr;
        }
    }
}
</style>