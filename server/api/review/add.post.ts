import { Review } from '~~/server/models'

export default eventHandler(async event => {
    const { user_id } = event.context.user
    const { book_id, review_content, review_rate } = await readBody(event)

    const review = {
        user_id,
        book_id,
        review_content,
        review_rate
    }

    await Review.create(review)

    return
})
