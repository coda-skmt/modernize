import type { Sequelize, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'
import { DataTypes, Model } from 'sequelize'

class Review extends Model<InferAttributes<Review>, InferCreationAttributes<Review>> {
    declare review_id: CreationOptional<number>
    declare user_id: string
    declare book_id: number
    declare review_content: string
    declare review_rate: string
    declare created_at: CreationOptional<Date>
    declare updated_at: CreationOptional<Date>
}

export default (sequelize: Sequelize) => {
    Review.init(
        {
            review_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
                comment: '书评ID'
            },
            user_id: {
                type: DataTypes.UUID,
                allowNull: false,
                comment: '用户user_id'
            },
            book_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                comment: '图书book_id'
            },
            review_content: {
                type: DataTypes.TEXT,
                allowNull: false,
                comment: '书评内容'
            },
            review_rate: {
                type: DataTypes.ENUM('A', 'B', 'C'),
                allowNull: false,
                comment: '评分等级'
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: false,
                comment: '创建时间'
            },
            updated_at: {
                type: DataTypes.DATE,
                allowNull: false,
                comment: '更新时间'
            }
        },
        {
            sequelize,
            tableName: 'reviews',
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    )

    return Review
}
