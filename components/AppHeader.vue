<template>
    <UHeader :links="headerLinks">
        <template #logo>
            <span ref="mainIcon">
                <IconModernize />
            </span>
        </template>

        <template #right>
            <UPopover mode="hover">
                <UButton variant="ghost" icon="i-heroicons-swatch" />
                <template #panel>
                    <ColorPicker />
                </template>
            </UPopover>

            <UColorModeButton />

            <UButton variant="ghost" color="gray" to="/msg/list" icon="i-heroicons-envelope" />

            <UserMemu />
        </template>
    </UHeader>
</template>

<script setup lang="ts">
const route = useRoute()

const mainIcon = ref()

const { animate } = useAnimate()

onMounted(() => {
    animate(mainIcon.value, 'animate__rubberBand')
})

type SubLinkMapKey = 'category' | 'manage' | 'self'

const activeLink = computed(() => route.path.split('/')[2] as unknown as SubLinkMapKey)

const headerLinks = computed(() => [
    {
        label: '首页',
        to: '/',
        active: route.path === '/'
    },
    {
        label: '书店',
        to: '/bookstore/category/recommended',
        active: route.path.startsWith('/bookstore'),
        children: [
            {
                label: '图书分类',
                to: '/bookstore/category/recommended',
                icon: 'i-heroicons-square-3-stack-3d',
                description: '分门别类，寻找你喜欢的书籍',
                active: activeLink.value === 'category'
            },
            {
                label: '书店管理',
                to: '/bookstore/manage/book',
                icon: 'i-heroicons-rocket-launch',
                description: '管理你的书店，查看经营状况',
                active: activeLink.value === 'manage'
            },
            {
                label: '我的书架',
                to: '/bookstore/bookself',
                icon: 'i-heroicons-book-open',
                description: '查看你购买过的图书',
                active: activeLink.value === 'self'
            }
        ]
    },
    {
        label: '博客',
        to: '/bog',
        active: route.path.startsWith('/bog')
    }
])
</script>
