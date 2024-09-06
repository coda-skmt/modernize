import type { Sequelize, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'
import { DataTypes, Model } from 'sequelize'

class AppMessage extends Model<InferAttributes<AppMessage>, InferCreationAttributes<AppMessage>> {
    declare app_message_id: CreationOptional<number> // CreationOptional 为了在 AppMessage.create不用传主键（应该自动生成）
    declare receiver_ids_str: string
    declare message_content: string
    declare created_at: CreationOptional<Date>
    declare updated_at: CreationOptional<Date>
}

export default (sequelize: Sequelize) => {
    AppMessage.init(
        {
            app_message_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
                comment: '应用消息ID'
            },
            receiver_ids_str: {
                type: DataTypes.STRING,
                allowNull: false,
                comment: '接收人ID string'
            },
            message_content: {
                type: DataTypes.TEXT,
                allowNull: false,
                comment: '消息内容'
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
            tableName: 'app_messages',
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    )

    return AppMessage
}
