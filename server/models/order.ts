import type { Sequelize, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'
import { DataTypes, Model } from 'sequelize'

class Orders extends Model<InferAttributes<Orders>, InferCreationAttributes<Orders>> {
    declare order_id: CreationOptional<string>
    declare order_no: CreationOptional<string>
    declare book_id: number
    declare buyer_id: string
    declare order_amount: number
    declare created_at: CreationOptional<Date>
    declare updated_at: CreationOptional<Date>
}

export default (sequelize: Sequelize) => {
    Orders.init(
        {
            order_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                comment: '订单ID'
            },
            order_no: {
                type: DataTypes.STRING,
                defaultValue: 'OD' + new Date().getTime(),
                allowNull: false,
                comment: '订单编号'
            },
            book_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                comment: '图书ID'
            },
            buyer_id: {
                type: DataTypes.UUID,
                allowNull: false,
                comment: '购买人user_id'
            },
            order_amount: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: '订单总价'
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
            tableName: 'orders',
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    )

    return Orders
}
