import type { JwtPayload } from 'jsonwebtoken'
import jwt from 'jsonwebtoken'
import { User } from '../models'

const secret = process.env.AUTH_SECRET as string

export default defineEventHandler(async event => {
    const url = getRequestURL(event)
    // 开放接口
    const isPublicApi = url.pathname.startsWith('/api/public')

    // 开放页面
    const isPublicPage = !url.pathname.startsWith('/api')

    // 跳过验证
    if (isPublicApi || isPublicPage) return

    const token = getCookie(event, 'token')

    if (!token) {
        throw createError({
            status: 401,
            statusCode: 4001,
            message: 'Token 缺失'
        })
    }

    const { user_id } = jwt.decode(token) as JwtPayload

    try {
        jwt.verify(token, secret)
        event.context.user = await User.findByPk(user_id, { raw: true })
    } catch {
        throw createError({
            status: 401,
            statusCode: 4002,
            message: 'Token 已过期'
        })
    }
})
