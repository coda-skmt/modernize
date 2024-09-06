import type { Sequelize, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'
import { DataTypes, Model } from 'sequelize'

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare user_id: CreationOptional<string>
    declare user_name: string
    declare phone?: string
    declare email?: string
    declare password: string
    declare address?: string
    declare avatar?: string
    declare gender?: number
    declare bio?: string
    declare birthday?: Date
    declare role: string
    declare login_at?: Date
    declare created_at: CreationOptional<Date>
    declare updated_at: CreationOptional<Date>
}

export default (sequelize: Sequelize) => {
    User.init(
        {
            user_id: {
                type: DataTypes.UUID, // 生成随机ID
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                comment: '用户ID'
            },
            user_name: {
                type: DataTypes.STRING,
                allowNull: true,
                comment: '用户名'
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: true,
                unique: true, // 创建唯一索引
                comment: '手机号码'
            },
            email: {
                type: DataTypes.STRING,
                allowNull: true,
                unique: true,
                comment: '邮箱'
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                comment: '密码'
            },
            address: {
                type: DataTypes.STRING,
                allowNull: true,
                comment: '地址'
            },
            avatar: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue: '',
                comment: '头像'
            },
            bio: {
                type: DataTypes.TEXT,
                allowNull: true,
                comment: '个人简介'
            },
            gender: {
                type: DataTypes.INTEGER,
                validate: {
                    isIn: {
                        args: [[0, 1]],
                        msg: '性别必须是0（女）或1（男）'
                    }
                },
                allowNull: true,
                comment: '性别'
            },
            birthday: {
                type: DataTypes.DATEONLY, // 不带时间的 DATE
                allowNull: true,
                comment: '生日'
            },
            role: {
                type: DataTypes.ENUM,
                values: ['admin', 'user'],
                allowNull: false,
                defaultValue: 'user',
                comment: '角色'
            },
            login_at: {
                type: DataTypes.DATE, // 带时间的时间戳
                allowNull: true,
                comment: '上次登陆时间'
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
            sequelize, // 传入sequelize实例
            tableName: 'users', // 表名
            timestamps: true, // 自动管理 createdAt 和 updatedAt 字段
            createdAt: 'created_at', // 创建时间，设置别名
            updatedAt: 'updated_at' // 更新时间，设置别名
            // validate: {
            //     // 自定义验证器
            //     phoneOrEmailNotNull() {
            //         if (!this.phone && !this.email) {
            //             throw new Error('手机号和邮箱至少有一个不能为空')
            //         }
            //     }
            // }
        }
    )

    return User
}
