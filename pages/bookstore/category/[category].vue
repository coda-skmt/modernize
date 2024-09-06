<template>
    <NuxtLayout name="book">
        <UPageGrid>
            <ULandingCard
                v-for="book in books"
                :key="book.book_id"
                :to="`/bookstore/bookInfo?book_id=${book.book_id}`"
                orientation="horizontal"
                :title="book.book_name"
                :external="false"
                :description="book.book_author"
                :ui="{ title: 'text-wrap', body: { base: 'gap-x-3', background: '', padding: '1' } }"
            >
                <NuxtPicture :src="book.cover_url" class="w-full rounded-md" />
            </ULandingCard>
        </UPageGrid>
    </NuxtLayout>
</template>

<script setup lang="ts">
import type { Book } from '~/types/book'

useSeoMeta({
    title: '图书分类'
})

const route = useRoute()

const category = computed(() => route.params.category)

const { data } = await useFetch('/api/public/book/list', {
    query: {
        category: category.value
    }
})

const books = data.value?.rows as Book[]
</script>
