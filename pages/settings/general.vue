<template>
    <NuxtLayout name="settings">
        <UDashboardPanelContent class="px-1">
            <UDashboardSection title="主题" description="设置网站的主题颜色">
                <template #links>
                    <ClientOnly>
                        <UColorModeSelect />
                    </ClientOnly>
                </template>
            </UDashboardSection>
            <UDivider class="mb-4" />
            <UForm :state="state" :schema="schema" :validate-on="['blur', 'input', 'change', 'submit']" @submit="onSubmit">
                <UDashboardSection title="个人资料" description="这些信息将会公开展示，请谨慎填写个人资料">
                    <template #links>
                        <UButton type="submit" label="保存更改" />
                    </template>

                    <UFormGroup name="user_name" label="用户名称" required class="grid grid-cols-2">
                        <UInput v-model="state.user_name" placeholder="输入用户名称" icon="i-heroicons-user" size="md" />
                    </UFormGroup>

                    <UFormGroup name="phone" label="手机号码" required class="grid grid-cols-2">
                        <UInput v-model="state.phone" type="text" placeholder="输入手机号码" icon="i-heroicons-phone" size="md" />
                    </UFormGroup>

                    <UFormGroup name="email" label="电子邮箱" required class="grid grid-cols-2">
                        <UInput v-model="state.email" type="email" placeholder="输入电子邮箱" icon="i-heroicons-envelope" size="md" />
                    </UFormGroup>

                    <UFormGroup
                        name="avatar"
                        label="头像"
                        required
                        class="grid grid-cols-2"
                        help="JPG, GIF 或 PNG， 限制文件大小在1MB内"
                        :ui="{ container: 'flex flex-wrap items-center gap-3', help: 'mt-0' }"
                    >
                        <UAvatar :src="state.avatar" :alt="state.user_name" size="lg" />

                        <UButton label="选择" color="white" size="md" @click="onFileClick" />

                        <input ref="fileRef" type="file" class="hidden" accept=".jpg, .jpeg, .png, .gif" @input="handleFileInput" @change="onFileChange" />
                    </UFormGroup>

                    <UFormGroup name="bio" label="个人简介" class="grid grid-cols-2">
                        <UTextarea v-model="state.bio" placeholder="输入个人简介" :rows="5" autoresize size="md" />
                    </UFormGroup>
                </UDashboardSection>
                <UDivider class="mb-4" />
            </UForm>
        </UDashboardPanelContent>
    </NuxtLayout>
</template>

<script setup lang="ts">
import { z } from 'zod'
import type { User } from '~/types/user'

definePageMeta({
    middleware: 'auth'
})

const fileRef = ref<HTMLInputElement>()

const user = useState<User | null>('user')

const state = reactive({
    user_name: user.value?.user_name ?? '',
    phone: user.value?.phone ?? '',
    email: user.value?.email ?? '',
    avatar: user.value?.avatar ?? '',
    bio: user.value?.bio ?? ''
})

const { handleFileInput, files } = useFileStorage()

const schema = z.object({
    user_name: z.string().min(1, {
        message: '请输入你的用户名称'
    }),

    phone: z
        .string()
        .min(1, {
            message: '请输入你的手机号码'
        })
        .refine(val => isPhone(val), {
            message: '请输入正确的手机号码'
        }),

    email: z
        .string()
        .min(1, {
            message: '请输入你的电子邮箱'
        })
        .email({
            message: '请输入正确的电子邮箱'
        }),

    avatar: z.string().startsWith('/avatar/', {
        message: '请选择图片作为头像'
    }),

    bio: z.string().max(100, {
        message: '个人简介不能超过100个字符'
    })
})

function onFileChange(e: Event) {
    const input = e.target as HTMLInputElement

    if (!input.files?.[0]) {
        return
    }

    state.avatar = URL.createObjectURL(input.files[0])
}

function onFileClick() {
    fileRef.value?.click()
}

async function onSubmit() {
    if (state.avatar !== user.value?.avatar) {
        state.avatar = await $fetch('/api/asset/upload', {
            method: 'POST',
            body: {
                files: files.value,
                folder: 'avatar'
            }
        }).then(res => res[0] || '')
    }

    $fetch('/api/user/update', {
        method: 'POST',
        body: {
            ...state
        }
    })
}
</script>
