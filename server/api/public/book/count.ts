import { col, fn } from 'sequelize'
import { Book } from '~~/server/models'

export default defineEventHandler(async () => {
    const categorys = await Book.findAll({
        attributes: ['category_type', [fn('COUNT', col('book_id')), 'count']],
        group: 'category_type'
    })

    const categoryObj: { [key: string]: unknown } = {}

    categorys.forEach(item => {
        categoryObj[item.category_type] = item.get('count')
    })

    return categoryObj
})
