import { User } from '~~/server/models'
import jwt from 'jsonwebtoken'
import _ from 'lodash'
import { isEmail, isPhone } from '~/utils/isX'

const secret = process.env.AUTH_SECRET as string

export default defineEventHandler(async event => {
    const { account, password } = await readBody(event)

    // 如果没有传过来手机号或密码
    if (!account || !password) {
        throw createError({
            statusCode: 400,
            message: '请填写帐号或密码'
        })
    }

    let where = {}

    if (isPhone(account)) {
        where = { phone: account }
    } else if (isEmail(account)) {
        where = { email: account }
    }

    // 取出数据库里该用户的信息
    const user = await User.findOne({ where, raw: true })

    // 判断是否有该用户，并且密码正确匹配
    if (user && password === user.password) {
        const payload = {
            user_id: user.user_id // 只放user_id，不要放敏感信息，因为token解码是不需要密钥的，只有验证token需要
        }

        const token = jwt.sign(payload, secret, {
            expiresIn: '7d',
            algorithm: 'HS256'
        })

        await User.update(
            {
                login_at: new Date()
            },
            {
                where: {
                    user_id: user.user_id
                }
            }
        )

        setCookie(event, 'token', token, {
            httpOnly: true,
            sameSite: true,
            secure: true,
            maxAge: 7 * 24 * 60 * 60
        })

        const user_info = {
            isLoggedIn: true,
            ...user
        }

        return _.omit(user_info, ['password'])
    } else {
        throw createError({
            statusCode: 403,
            message: '帐号或密码不正确'
        })
    }
})
