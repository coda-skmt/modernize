<template>
    <NuxtLayout name="settings">
        <UDashboardPanelContent class="px-1">
            <UForm :state="state" :schema="schema" :validate-on="['blur', 'input', 'change', 'submit']" @submit="onSubmit">
                <UDashboardSection title="设置密码">
                    <template #links>
                        <UButton type="submit" label="重置密码" />
                    </template>
                    <UFormGroup name="password" label="密码" description="在设置新密码前，请先输入当前密码" class="grid grid-cols-2">
                        <UInput id="password_current" v-model="state.password_current" autocomplete type="password" placeholder="输入当前密码" size="md" />
                        <UInput id="password_new" v-model="state.password_new" autocomplete type="password" placeholder="输入新密码" size="md" class="mt-4" />
                    </UFormGroup>
                </UDashboardSection>
                <UDivider class="mb-4" />
            </UForm>
        </UDashboardPanelContent>
    </NuxtLayout>
</template>

<script setup lang="ts">
import { z } from 'zod'

definePageMeta({
    middleware: 'auth'
})

const state = reactive({
    password_current: '',
    password_new: ''
})

const schema = z.object({
    password_current: z.string().min(6, {
        message: '密码至少为 6 位'
    }),
    password_new: z.string().min(6, {
        message: '密码至少为 6 位'
    })
})

async function onSubmit() {
    $fetch('/api/user/update', {
        method: 'POST',
        body: {
            password: state.password_new
        }
    })
}
</script>
