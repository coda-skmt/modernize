<template>
    <div ref="cardRef">
        <UCard class="max-w-lg bg-white/75 dark:bg-white/5 backdrop-blur">
            <UAuthForm
                :schema="schema"
                :fields="fields"
                :validate-on="['blur', 'input', 'change', 'submit']"
                :providers="providers"
                title="👋 欢迎回来"
                divider="或"
                align="top"
                icon="i-heroicons-lock-closed"
                :ui="{ base: 'text-center', footer: 'text-center' }"
                :submit-button="{ label: '立即登录' }"
                :loading="loading"
                @submit="onSubmit"
            >
                <template #description>还没有帐号？<NuxtLink to="/auth/register" class="text-primary font-medium">立即注册</NuxtLink></template>

                <template #password-hint>
                    <NuxtLink to="/" class="text-primary font-medium">忘记密码？</NuxtLink>
                </template>

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

definePageMeta({
    layout: 'auth'
})

useSeoMeta({
    title: '登录'
})

const { animate } = useAnimate()

const cardRef = ref()

const errorMsg = ref('')

const loading = ref(false)

const fields = [
    {
        name: 'account',
        type: 'text',
        value: '17603074800',
        icon: 'i-heroicons-user',
        label: '帐号',
        placeholder: '输入你的手机号或邮箱'
    },
    {
        name: 'password',
        label: '密码',
        type: 'password',
        icon: 'i-heroicons-key',
        placeholder: '输入你的密码'
    }
]

const schema = z.object({
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
        label: '使用GitHub登录',
        icon: 'i-simple-icons-github',
        color: 'white' as const,
        click: signInWithOAuth
    }
]

const supabase = useSupabaseClient()

async function signInWithOAuth() {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github'
    })
    if (data) console.log(data)
    if (error) console.log(error)
}

async function onSubmit({ account, password }: { account: string; password: string }) {
    loading.value = true

    $fetch('/api/public/auth/login', {
        method: 'POST',
        body: {
            account,
            password: SHA256(password).toString()
        },
        onResponse({ response }) {
            if (response.status === 200) {
                const user = useState('user')
                user.value = response._data
                const router = useRouter()
                router.replace('/')
            }
        },
        onResponseError({ response }) {
            loading.value = false
            errorMsg.value = response._data.message
            animate(cardRef.value, 'animate__shakeX')
        }
    })
}
</script>
