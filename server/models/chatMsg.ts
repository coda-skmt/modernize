import type { Sequelize, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'
import { DataTypes, Model } from 'sequelize'

class ChatMessage extends Model<InferAttributes<ChatMessage>, InferCreationAttributes<ChatMessage>> {
    declare chat_message_id: CreationOptional<number>
    declare sender_id: string
    declare receiver_id: string
    declare message_content: string
    declare created_at: CreationOptional<Date>
    declare updated_at: CreationOptional<Date>
}

export default (sequelize: Sequelize) => {
    ChatMessage.init(
        {
            chat_message_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
                comment: '消息ID'
            },
            sender_id: {
                type: DataTypes.UUID,
                allowNull: false,
                comment: '发送人user_id'
            },
            receiver_id: {
                type: DataTypes.UUID,
                allowNull: false,
                comment: '接收人user_id'
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
            tableName: 'chat_messages',
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    )

    return ChatMessage
}
