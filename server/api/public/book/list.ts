import { Op, type FindOptions } from 'sequelize'
import { Book } from '~~/server/models'

export default defineEventHandler(async event => {
    const { category, keyword, page = 1, pageSize = 0, sort } = await getQuery(event)

    const options: FindOptions = {
        raw: true
    }

    if (category) {
        if (category === 'recommended') {
            options.where = {
                ...options.where,
                is_recommended: true
            }
        } else {
            options.where = {
                ...options.where,
                category_type: category
            }
        }
    }

    if (keyword) {
        options.where = {
            ...options.where,
            book_name: {
                [Op.like]: `%${keyword}%`
            }
        }
    }

    if (sort === 'asc' || sort === 'desc') {
        options.order = [['book_price', sort]]
    }

    if (category === 'new') {
        options.limit = 9
    } else if (pageSize && page && category !== 'all') {
        options.limit = +pageSize
        options.offset = (+page - 1) * +pageSize
    }

    return Book.findAndCountAll(options)
})
