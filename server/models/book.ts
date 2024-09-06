import type { Sequelize, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'
import { DataTypes, Model } from 'sequelize'

// 通过使用 InferAttributes 和 InferCreationAttributes，我们可以确保在任何地方使用 Book 模型时，TypeScript 都能正确推断出属性的类型
class Book extends Model<InferAttributes<Book>, InferCreationAttributes<Book>> {
    declare book_id: CreationOptional<number>
    declare book_name: string
    declare book_author: string
    declare book_price: number
    declare cover_url: string
    declare book_info: string
    declare category_type: string
    declare is_delete: boolean
    declare is_recommended: boolean
    declare created_by: string
    declare created_at: CreationOptional<Date>
    declare updated_at: CreationOptional<Date>
}

export default (sequelize: Sequelize) => {
    Book.init(
        {
            book_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
                comment: '图书ID'
            },
            book_name: {
                type: DataTypes.STRING,
                allowNull: false,
                comment: '图书名称'
            },
            book_author: {
                type: DataTypes.STRING,
                allowNull: false,
                comment: '作者'
            },
            book_price: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: '图书价格'
            },
            cover_url: {
                type: DataTypes.STRING,
                allowNull: false,
                comment: '封面URL'
            },
            book_info: {
                type: DataTypes.TEXT,
                allowNull: false,
                comment: '图书简介'
            },
            category_type: {
                type: DataTypes.STRING,
                allowNull: false,
                comment: '图书分类'
            },
            is_delete: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
                allowNull: false,
                comment: '是否已下架'
            },
            is_recommended: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
                allowNull: false,
                comment: '是否推荐'
            },
            created_by: {
                type: DataTypes.UUID,
                allowNull: false,
                comment: '创建人'
            },
            created_at: {
                type: DataTypes.DATE,
                comment: '创建时间'
            },
            updated_at: {
                type: DataTypes.DATE,
                comment: '更新时间'
            }
        },
        {
            sequelize,
            tableName: 'books',
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    )

    return Book
}
