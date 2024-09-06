<template>
    <NuxtLayout name="book">
        <div class="flex pb-4 justify-between border-gray-200 dark:border-gray-700">
            <div class="flex justify-between">
                <UInput v-model="keyword" placeholder="搜索图书" />
                <USelectMenu v-model="category" :options="categorys" class="w-32 ml-4" placeholder="图书类型" />
            </div>
            <UButton variant="outline" @click="addBook">添加图书</UButton>
        </div>

        <UTable :columns="columns" :rows="bookList" class="border border-gray-200 dark:border-gray-700 rounded-lg" @update:sort="onUpdateSort">
            <template #actions-data="{ row }">
                <UDropdown :items="items(row)">
                    <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
                </UDropdown>
            </template>
        </UTable>

        <div class="flex justify-end mt-4">
            <UPagination v-model="page" :page-count="pageSize" :total="pageCount" />
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
import type { Book } from '~/types/book'

useSeoMeta({
    title: '图书管理'
})

interface Category {
    key?: string
    label?: string
    icon?: string
}

const realKeyword = ref('')
const keyword = ref('')

const realCategory = ref<Category>({})
const category = ref<Category>({})

const page = ref(1)
const pageSize = ref(10)

const sort = ref('')

const { data } = await useFetch('/api/public/book/list', {
    query: computed(() => ({
        page: page.value,
        pageSize: pageSize.value,
        keyword: realKeyword.value,
        category: realCategory.value.key,
        sort: sort.value
    }))
})

const bookList = computed(
    () =>
        data?.value?.rows.map((book: Book) => ({
            ...book,
            book_price_str: rmb(book.book_price ?? 0)
        })) || []
)
const pageCount = computed(() => data?.value?.count || 0)

// 创建一个防抖函数
const debounce = useDebounce(() => {
    page.value = 1
    realKeyword.value = keyword.value
}, 500)

watch(keyword, debounce)

watch(category, () => {
    page.value = 1
    realCategory.value = category.value
})

const items = (row: Book) => [
    [
        {
            label: '编辑',
            icon: 'i-heroicons-pencil-square',
            click: () => console.log('Edit', row.book_id)
        },
        {
            label: '推荐',
            icon: 'i-heroicons-heart',
            click: () => recommendBook(row.book_id ?? 0)
        }
    ],
    [
        {
            label: '下架',
            icon: 'i-heroicons-archive-box-arrow-down'
        }
    ]
]

function addBook() {
    //
}

function recommendBook(book_id: number) {
    $fetch('/api/book/recommend', {
        method: 'POST',
        body: {
            book_id
        }
    })
}

function onUpdateSort(data: { direction: string }) {
    page.value = 1
    sort.value = data.direction
}

const categorys = [{ label: '全部', key: '', icon: 'i-heroicons-book-open' }, ...useCategory().filter(item => item.key !== 'new')]

const columns = [
    {
        key: 'book_id',
        label: 'ID'
    },
    {
        key: 'book_name',
        label: '书名'
    },
    {
        key: 'book_author',
        label: '作者'
    },
    {
        key: 'book_price_str',
        label: '价格',
        sortable: true
    },
    {
        key: 'actions'
    }
]
</script>
