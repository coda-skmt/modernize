export default defineEventHandler(async event => {
    console.log(getCookie(event, 'token'))
    const user = event.context.user
    if (user?.user_id) {
        return {
            isLoggedIn: true,
            ...user
        }
    } else {
        return {
            isLoggedIn: false
        }
    }
})
