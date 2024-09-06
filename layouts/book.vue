<template>
    <UPage>
        <template #left>
            <UAside :links="asideLinks">
                <template #top>
                    <UContentSearchButton />
                </template>

                <UDivider v-show="subLinks?.length" type="dashed" class="my-6" />

                <UNavigationLinks :links="subLinks" :ui="{ badge: { base: 'rounded' } }" />
            </UAside>
        </template>

        <UPageBody>
            <slot />
        </UPageBody>
    </UPage>
</template>

<script setup lang="ts">
import type { NavigationLink } from '@nuxt/ui-pro/types'

const route = useRoute()

const activeLink = computed(() => route.path.split('/')[2] as 'category' | 'manage' | 'bookself')

const asideLinks = [
    {
        label: '图书分类',
        to: '/bookstore/category/new',
        active: activeLink.value === 'category',
        icon: 'i-heroicons-square-3-stack-3d'
    },
    {
        label: '书店管理',
        to: '/bookstore/manage/book',
        active: activeLink.value === 'manage',
        icon: 'i-heroicons-rocket-launch'
    },
    {
        label: '我的书架',
        to: '/bookstore/bookself',
        active: activeLink.value === 'bookself',
        icon: 'i-heroicons-book-open'
    }
]

const subLinks = ref<NavigationLink[]>([])

const categorys = useCategory()

if (activeLink.value === 'category') {
    const { data: categoryData } = await useFetch('/api/public/book/count')

    subLinks.value = categorys.map(item => ({
        label: item.label,
        to: `/bookstore/category/${item.key}`,
        icon: item.icon,
        badge: item.key === 'new' ? '9' : String(categoryData.value?.[item.key] || 0)
    }))
} else if (activeLink.value === 'manage') {
    subLinks.value = [
        { label: '图书管理', to: '/bookstore/manage/book', icon: 'i-heroicons-book-open' },
        { label: '订单管理', to: '/bookstore/manage/order', icon: 'i-heroicons-shopping-cart' },
        { label: '书评管理', to: '/bookstore/manage/review', icon: 'i-heroicons-chat-bubble-bottom-center-text' }
    ]
}
</script>
