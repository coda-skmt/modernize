import { Book } from '~~/server/models'

export default eventHandler(async event => {
    const { book_id } = await readBody(event)
    return Book.update({ is_recommended: true }, { where: { book_id } })
})
