<template>
    <div class="mt-4">
        <div class="flex py-4">
            <NuxtImg :src="book?.cover_url" class="h-full" />
            <div class="ml-6">
                <div class="flex justify-between">
                    <span class="font-bold text-xl">{{ book?.book_name }}</span>
                    <UButton variant="outline" icon="i-heroicons-shopping-cart" :label="`${rmb(book?.book_price || 0)}`" class="mr-4" />
                </div>
                <div class="mt-4 line-clamp-6 dark:text-gray-100/60">{{ book?.book_info }}</div>
            </div>
        </div>

        <UCard :ui="{ body: { base: 'flex items-end select-none' } }">
            <div class="w-30 text-center">
                <NuxtImg src="https://weread-1258476243.file.myqcloud.com/miniprogram/assets/reader/newRatings_870.png" />
                <div class="leading-8 text-xs">{{ reviews?.length }} 条评论</div>
                <UButton icon="i-heroicons-plus" :ui="{ rounded: 'rounded-full' }" @click="isOpen = true" />
            </div>
            <div class="flex-1 ml-6">
                <div class="text-xs leading-6">推荐 · 70%</div>
                <UProgress :value="70" />
                <div class="text-xs leading-6 mt-3">一般 · 30%</div>
                <UProgress :value="30" />
                <div class="text-xs leading-6 mt-3">不行 · 50%</div>
                <UProgress :value="50" />
            </div>
        </UCard>

        <UPageCard v-for="review in reviews" :key="review.review_id" class="my-4">
            <q class="italic text-gray-500 dark:text-gray-400">{{ review.review_content }}</q>
            <div class="flex gap-x-3 items-center mt-3">
                <UAvatar :src="review.User.avatar" :alt="review.User.user_name" size="md" />
                <div class="min-w-0 text-sm">
                    <p class="text-xs dark:text-gray-400">{{ reviewRateMap[review.review_rate || ''] }}</p>
                    <p class="font-semibold">@ {{ review.User.user_name }}</p>
                </div>
            </div>
        </UPageCard>

        <UModal v-model="isOpen">
            <UCard :ui="CardUI">
                <template #header>
                    <UButton
                        v-for="item in rateLevels"
                        :key="item.key"
                        class="w-36 justify-center"
                        variant="solid"
                        :color="review_rate === item.key ? 'primary' : 'gray'"
                        size="lg"
                        :label="item.label"
                        icon="i-twemoji-slightly-smiling-face"
                        @click="review_rate = item.key"
                    />
                </template>

                <UTextarea v-model="review_content" autoresize placeholder="说说你对这本书的看法吧..." />

                <template #footer>
                    <UButton class="w-20 justify-center ml-4" variant="ghost" label="取消" @click="isOpen = false" />
                    <UButton class="w-20 justify-center ml-4" label="提交" @click="submitReview" />
                </template>
            </UCard>
        </UModal>
    </div>
</template>

<script setup lang="ts">
import type { Book } from '~/types/book'
import type { ReviewData } from '~/types/review'

const route = useRoute()

const isOpen = ref(false)

const review_content = ref('')

const book_id = route.query.book_id

const review_rate = ref('A')

const rateLevels = [
    {
        key: 'A',
        label: '非常推荐'
    },
    {
        key: 'B',
        label: '觉得一般'
    },
    {
        key: 'C',
        label: '认为不行'
    }
]

const { data: book } = await useFetch<Book>('/api/public/book/info', {
    query: {
        book_id
    }
})

const { data: reviewData, refresh: refreshReview } = await useFetch<ReviewData>('/api/review/list', {
    query: {
        book_id
    }
})

const CardUI = {
    footer: { base: 'flex justify-end' },
    header: { base: 'flex justify-between' },
    divide: 'divide-y divide-gray-100 dark:divide-gray-800'
}

const reviews = reviewData?.value?.rows

const reviewRateMap = {
    A: '非常推荐',
    B: '觉得一般',
    C: '认为不行',
    '': ''
}

function submitReview() {
    $fetch('/api/review/add', {
        method: 'POST',
        body: {
            book_id,
            review_rate: review_rate.value,
            review_content: review_content.value
        },
        onResponse() {
            refreshReview()
            isOpen.value = false
        }
    })
}
</script>
