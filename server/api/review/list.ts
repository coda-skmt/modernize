import type { FindOptions } from 'sequelize'
import { col, Op, where } from 'sequelize'
import { Book, Review, User } from '~~/server/models'

export default defineEventHandler(async event => {
    const user = event.context.user
    const { book_id, page = 1, pageSize, keyword, review_rate } = await getQuery(event)

    const options: FindOptions = {
        include: [
            {
                model: Book,
                attributes: ['book_name']
            },
            {
                model: User,
                attributes: ['user_name', 'avatar', 'role']
            }
        ],
        where: {
            ...(keyword && {
                [Op.or]: [
                    where(col('Book.book_name'), {
                        [Op.like]: `%${keyword}%`
                    }),
                    where(col('User.user_name'), {
                        [Op.like]: `%${keyword}%`
                    })
                ]
            })
        }
    }

    if (pageSize && page) {
        options.limit = +pageSize
        options.offset = (+page - 1) * +pageSize
    }

    if (user?.role === 'user') {
        options.where = {
            ...options.where,
            user_id: user.user_id
        }
    }

    if (book_id) {
        options.where = {
            ...options.where,
            book_id
        }
    }

    if (review_rate) {
        options.where = {
            ...options.where,
            review_rate
        }
    }

    return Review.findAndCountAll(options)
})
