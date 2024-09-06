<template>
    <NuxtLayout name="settings">
        <UDashboardPanelContent class="px-1" />
    </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
    middleware: 'auth'
})
</script>
