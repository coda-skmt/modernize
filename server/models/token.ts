import type { Sequelize, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'
import { DataTypes, Model } from 'sequelize'

class Token extends Model<InferAttributes<Token>, InferCreationAttributes<Token>> {
    declare user_id: string
    declare token: string
    declare created_at: CreationOptional<Date>
    declare updated_at: CreationOptional<Date>
}

export default (sequelize: Sequelize) => {
    Token.init(
        {
            user_id: {
                type: DataTypes.UUID,
                primaryKey: true,
                comment: '用户user_id'
            },
            token: {
                type: DataTypes.STRING(500),
                unique: true,
                allowNull: false,
                comment: '令牌'
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
            tableName: 'tokens',
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    )

    return Token
}
