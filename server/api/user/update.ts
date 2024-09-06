import { User } from '~~/server/models'

export default defineEventHandler(async event => {
    const { user_id } = event.context.user

    const { user_name, avatar, phone, email } = await readBody(event)

    const user = {
        user_name,
        avatar,
        phone,
        email
    }

    return User.update(user, {
        where: {
            user_id
        }
    })
})
