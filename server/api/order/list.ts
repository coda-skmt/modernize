import type { FindOptions } from 'sequelize'
import { Op } from 'sequelize'
import { Book, Orders, User } from '~~/server/models'

export default defineEventHandler(async event => {
    const { user_id, role } = event.context.user

    const { page, pageSize, keyword } = await getQuery(event)

    const options: FindOptions = {
        where: {},
        include: [
            {
                model: Book,
                attributes: ['book_name']
            },
            {
                model: User,
                attributes: ['user_name']
            }
        ],
        raw: true,
        nest: true
    }

    if (role !== 'admin') {
        options.where = {
            ...options.where,
            buyer_id: user_id
        }
    }

    if (page && +page > 0 && pageSize && +pageSize > 0) {
        options.limit = +pageSize
        options.offset = (+page - 1) * +pageSize
    }

    if (keyword) {
        options.where = {
            ...options.where,
            order_id: {
                [Op.like]: `%${keyword}%`
            }
        }
    }

    return Orders.findAndCountAll(options)
})
