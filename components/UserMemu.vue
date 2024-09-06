<template>
    <UDropdown
        v-if="user?.isLoggedIn"
        :items="items"
        :ui="{ item: { base: 'mt-1', disabled: 'cursor-text select-text' } }"
        :popper="{ arrow: true, placement: 'bottom-start' }"
    >
        <UButton variant="ghost" icon="i-heroicons-user-circle" color="gray">
            <template #leading>
                <UAvatar v-if="user?.avatar" :src="user.avatar" :alt="user.user_name" size="2xs" />
            </template>
        </UButton>

        <template #account>
            <div class="text-left">
                <p>{{ user?.user_name }}</p>
                <p class="truncate font-medium">
                    {{ user?.email || user?.phone }}
                </p>
            </div>
        </template>

        <template #item="{ item }">
            <span class="truncate">{{ item.label }}</span>

            <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto" />
        </template>
    </UDropdown>

    <template v-else>
        <UButton label="登录" size="xs" variant="ghost" to="/auth/login" color="gray" />
        <UButton label="注册" size="xs" variant="outline" to="/auth/register">
            <template #trailing>
                <UIcon name="i-heroicons-arrow-right" />
            </template>
        </UButton>
    </template>
</template>

<script setup lang="ts">
import type { User } from '~/types/user'

const user = useState<User>('user')

const items = [
    [
        {
            label: '',
            slot: 'account',
            disabled: true
        }
    ],
    [
        {
            label: '会员中心',
            icon: 'i-heroicons-book-open',
            to: '/vip/info'
        },
        {
            label: '设置中心',
            icon: 'i-heroicons-cog-8-tooth',
            to: '/settings/general'
        }
    ],
    [
        {
            label: '退出登录',
            icon: 'i-heroicons-arrow-left-on-rectangle',
            click: signOut
        }
    ]
]

function signOut() {
    $fetch('/api/auth/logout', {
        method: 'POST',
        onResponse({ response }) {
            if (response.status === 200) {
                user.value = {
                    isLoggedIn: false
                }
                const router = useRouter()
                router.replace('/auth/login')
            }
        }
    })
}
</script>
