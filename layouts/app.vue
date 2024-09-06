<template>
    <div>
        <slot />
    </div>
</template>

<script setup lang="ts">
const { ui } = useAppConfig()

const primay = useCookie('primary')

const gray = useCookie('gray')

if (primay.value) {
    ui.primary = primay.value
}

if (gray.value) {
    ui.gray = gray.value
}
</script>
