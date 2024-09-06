export default eventHandler(event => {
    deleteCookie(event, 'token')
    return 'Successfully signed out'
})
