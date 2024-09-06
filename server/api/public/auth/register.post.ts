import { isEmail, isPhone } from '~/utils/isX'
import { User } from '~~/server/models'

export default defineEventHandler(async event => {
    const { user_name, account, password } = await readBody(event)

    if (!user_name || !account || !password) {
        throw createError({
            statusCode: 400,
            message: '参数错误'
        })
    }

    let where = {}

    if (isPhone(account)) {
        where = { phone: account }
    } else if (isEmail(account)) {
        where = { email: account }
    }

    const existingUser = await User.findOne({ where })

    if (existingUser) {
        throw createError({
            statusCode: 409,
            message: isPhone(account) ? '该手机号已被注册' : '该邮箱已被注册'
        })
    }

    const user = {
        ...where,
        user_name,
        password,
        role: 'user'
    }

    await User.create(user)

    return 'ok'
})
