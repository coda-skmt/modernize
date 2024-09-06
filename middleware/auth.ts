import type { User } from '~/types/user'

export default defineNuxtRouteMiddleware(() => {
    const user = useState<User>('user')
    if (!user?.value?.isLoggedIn) {
        return navigateTo('/auth/login')
    }
})
