<template>
    <NuxtLayout name="book">
        <div class="flex pb-4 justify-between border-gray-200 dark:border-gray-700">
            <UInput v-model="keyword" placeholder="搜索订单" />
        </div>

        <UTable :columns="columns" :rows="orderList" class="border border-gray-200 dark:border-gray-700 rounded-lg" />

        <div class="flex justify-end mt-4">
            <UPagination v-model="page" :page-count="pageSize" :total="pageCount" />
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
import type { Order } from '~/types/order'
import { ymd } from '~/utils/format'

definePageMeta({
    middleware: 'auth'
})

useSeoMeta({
    title: '订单管理'
})

const realKeyword = ref('')
const keyword = ref('')

const page = ref(1)
const pageSize = ref(10)

const { data } = await useFetch('/api/order/list', {
    query: computed(() => ({
        page: page.value,
        pageSize: pageSize.value,
        keyword: realKeyword.value
    }))
})

const orderList = computed(
    () =>
        data?.value?.rows.map((order: Order) => ({
            ...order,
            order_amount_str: rmb(order.order_amount ?? 0),
            created_at_str: ymd(order.created_at ?? new Date())
        })) || []
)
const pageCount = computed(() => data?.value?.count || 0)

// 创建一个防抖函数
const debounce = useDebounce(() => {
    page.value = 1
    realKeyword.value = keyword.value
}, 500)

watch(keyword, debounce)

const columns = [
    {
        key: 'order_id',
        label: 'ID'
    },
    {
        key: 'Book.book_name',
        label: '书名'
    },
    {
        key: 'User.user_name',
        label: '购买用户'
    },
    {
        key: 'order_amount_str',
        label: '价格'
    },
    {
        key: 'created_at_str',
        label: '购买日期'
    }
]
</script>
