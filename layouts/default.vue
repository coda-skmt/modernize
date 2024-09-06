<template>
    <NuxtLayout name="app">
        <AppHeader />

        <UContainer>
            <slot />
        </UContainer>

        <ClientOnly>
            <LazyUContentSearch />
        </ClientOnly>
    </NuxtLayout>
</template>
