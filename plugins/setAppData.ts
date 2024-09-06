export default defineNuxtPlugin(async () => {
    const { data } = await useFetch('/api/user/info')
    const user = useState('user')
    user.value = data.value
})
