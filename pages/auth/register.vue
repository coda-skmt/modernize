<template>
    <div ref="cardRef">
        <UCard class="max-w-lg bg-white/75 dark:bg-white/5 backdrop-blur">
            <UAuthForm
                :fields="fields"
                :providers="providers"
                :schema="schema"
                :validate-on="['blur', 'input', 'change', 'submit']"
                align="top"
                title="创建新帐号"
                icon="i-simple-icons-appsignal"
                divider="或"
                :ui="{ base: 'text-center', footer: 'text-center' }"
                :submit-button="{ label: '立即注册' }"
                :loading="loading"
                @submit="onSubmit"
            >
                <template #description> 已有帐号? <NuxtLink to="/auth/login" class="text-primary font-medium">立即登录</NuxtLink></template>

                <template v-if="errorMsg" #validation>
                    <UAlert color="red" icon="i-heroicons-information-circle-20-solid" :title="errorMsg" />
                </template>

                <template #footer>登录即表示您接受<NuxtLink to="/" class="text-primary font-medium">使用条款并接受隐私政策和 Cookie 政策</NuxtLink></template>
            </UAuthForm>
        </UCard>
    </div>
</template>

<script setup lang="ts">
import SHA256 from 'crypto-js/sha256'
import { z } from 'zod'

const router = useRouter()

definePageMeta({
    layout: 'auth'
})

useSeoMeta({
    title: '注册'
})

const loading = ref(false)

const errorMsg = ref('')

const cardRef = ref()

const { animate } = useAnimate()

const fields = [
    {
        name: 'user_name',
        type: 'text',
        icon: 'i-heroicons-at-symbol',
        label: '用户名',
        placeholder: '输入你的用户名'
    },
    {
        name: 'account',
        type: 'text',
        icon: 'i-heroicons-user',
        label: '帐号',
        placeholder: '输入你的手机号或邮箱'
    },
    {
        name: 'password',
        type: 'password',
        icon: 'i-heroicons-key',
        label: '密码',
        placeholder: '输入你的密码'
    }
]

const schema = z.object({
    user_name: z.string({
        required_error: '请输入你的用户名'
    }),

    account: z
        .string({
            required_error: '请输入你的帐号'
        })
        .refine(val => isPhone(val) || z.string().email().safeParse(val).success, {
            message: '请输入正确的手机号或邮箱'
        }),

    password: z.string({
        required_error: '请输入你的密码'
    })
})

const providers = [
    {
        label: '使用微信登录',
        icon: 'i-simple-icons-wechat',
        color: 'gray' as const,
        click: () => {
            console.log('Redirect to wechat')
        }
    }
]

async function onSubmit(data: { user_name: string; account: string; password: string }) {
    loading.value = true

    const password = SHA256(data.password).toString()

    try {
        await $fetch('/api/public/auth/register', {
            method: 'POST',
            body: {
                user_name: data.user_name,
                account: data.account,
                password
            },
            onResponseError({ response }) {
                errorMsg.value = response._data.message
                animate(cardRef.value, 'animate__shakeX')
            }
        })

        await $fetch('/api/public/auth/login', {
            method: 'POST',
            body: {
                account: data.account,
                password
            },
            onResponse({ response }) {
                if (response.status === 200) {
                    const user = useState('user')
                    user.value = response._data
                    router.replace('/')
                }
            },
            onResponseError({ response }) {
                errorMsg.value = response._data.message
                animate(cardRef.value, 'animate__shakeX')
            }
        })
    } catch (error) {
        console.log(error)
    } finally {
        loading.value = false
    }
}
</script>
