<template>
    <NuxtLayout name="app">
        <UDashboardToolbar class="py-0 pt-1 px-0 overflow-x-auto">
            <UHorizontalNavigation :links="links" />
        </UDashboardToolbar>
        <slot />
    </NuxtLayout>
</template>

<script setup lang="ts">
const links = [
    { label: '通用设置', to: '/settings/general' },
    { label: '安全设置', to: '/settings/security' },
    { label: '消息设置', to: '/settings/notification' },
    { label: '收货地址', to: '/settings/address' }
]
</script>
