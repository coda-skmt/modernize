import { Book, Orders } from '~~/server/models'

export default defineEventHandler(async event => {
    const { book_id } = (await getQuery(event)) as { book_id: string }

    const book = await Book.findByPk(book_id, { raw: true })

    const order = await Orders.findOne({
        where: {
            buyer_id: 1,
            book_id
        }
    })

    const bought = Boolean(order)

    return {
        ...book,
        bought
    }
})
