import type { User } from './user'

export interface Review {
    review_id: string
    user_id?: string
    book_id?: number
    review_content?: string
    review_rate?: 'A' | 'B' | 'C'
    created_at?: Date
    User: User
}

export interface ReviewData {
    rows: Review[]
    count: number
}
