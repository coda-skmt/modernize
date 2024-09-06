<template>
    <div class="p-2">
        <div class="grid grid-cols-5 gap-2">
            <UTooltip v-for="color in primaryColors" :key="color" :text="color">
                <UButton size="xl" square color="gray" :variant="primary === color ? 'solid' : 'ghost'" @click="onPrimary(color)">
                    <UChip size="lg" :color="color" />
                </UButton>
            </UTooltip>
        </div>

        <UDivider class="my-2" />

        <div class="grid grid-cols-5 gap-2">
            <UTooltip v-for="color in grayColors" :key="color" :text="color">
                <UButton size="lg" square color="gray" :variant="gray === color ? 'solid' : 'ghost'" @click="onGray(color)">
                    <UChip size="lg" color="gray" />
                </UButton>
            </UTooltip>
        </div>
    </div>
</template>

<script setup lang="ts">
const { ui } = useAppConfig()

const primary = useCookie('primary')
const gray = useCookie('gray')

const primaryColors = [
    'red',
    'orange',
    'amber',
    'yellow',
    'lime',
    'green',
    'emerald',
    'teal',
    'cyan',
    'sky',
    'blue',
    'indigo',
    'violet',
    'purple',
    'fuchsia',
    'pink',
    'rose'
]

const grayColors = ['slate', 'cool', 'zinc', 'neutral', 'stone']

function onPrimary(color: string) {
    ui.primary = color
    primary.value = color
}

function onGray(color: string) {
    ui.gray = color
    gray.value = color
}
</script>
