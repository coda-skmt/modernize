import { Sequelize } from 'sequelize'
import initUser from '../models/user'
import initBook from '../models/book'
import initOrder from '../models/order'
import initReview from '../models/review'
import initChatMsg from '../models/chatMsg'
import initAppMsg from '../models/appMsg'
import initToken from '../models/token'

const { DB_USERNAME, DB_DATABASE, DB_PASSWORD, DB_HOST, DB_PORT } = process.env

const sequelize = new Sequelize({
    database: DB_DATABASE,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    host: DB_HOST,
    port: Number(DB_PORT),
    dialect: 'mysql', // 数据库DBMS
    define: {
        freezeTableName: true // 禁用自动复数化表名
    },
    pool: {
        max: 10, // 连接池中可以维护的最大连接数
        min: 0, // 连接池中可以维护的最小连接数
        acquire: 30000, // 连接池在抛出错误之前尝试获取连接的最长时间
        idle: 10000 // 连接在被释放之前可以空闲的最长时间
    }
})

// 2. 创建各个数据表的模型
export const User = initUser(sequelize)
export const Book = initBook(sequelize)
export const Orders = initOrder(sequelize)
export const Review = initReview(sequelize)
export const ChatMessage = initChatMsg(sequelize)
export const AppMessage = initAppMsg(sequelize)
export const Token = initToken(sequelize)

// 3. 创建关联模型

// 注意：1. 外键foreignKey在B定义：B表 => (B.foreignKey = A.primaryKey) => A表；
//      2. 不指定外键：A（船长） 和 B（船） 的联结可能不是完备的，也就是B（船）不一定属于A（船长），B（船）可以独立存在，反之亦然。
//      3. 外键可以有多个：A（用户）和 B（消息），B（消息）有 【外键1】 sender_id（发送人） 和 【外键2】receiver_id（接收人）

//（1）A.hasOne(B); A 有一个 B
//（2）A.belongsTo(B); A 属于 B
//（3）A.hasMany(B); A 有多个 B
//（4）A.belongsToMany(B, { through: 'C' }); A 属于多个 B , 通过联结表 C

// 注意：Book不一定有Order，但Order肯定属于某个Book
Book.hasMany(Orders, { foreignKey: 'book_id' }) // 一个Book有0个或多个Order (相当于：一本书可以下多个订单)，外键是 Order 的 book_id
Orders.belongsTo(Book, { foreignKey: 'book_id' }) // 反过来：Order 属于 Book（相当于：这（几）个订单是属于某本书的）

Book.hasMany(Review, { foreignKey: 'book_id' }) // 一本书有多个书评
Review.belongsTo(Book, { foreignKey: 'book_id' }) // 这（几）个书评是属于某本书的

User.hasMany(Book, { foreignKey: 'created_by' }) // 一个人可以添加0本或多本书
Book.belongsTo(User, { foreignKey: 'created_by' }) // 这（几）本书属于某个人的

User.hasMany(Review, { foreignKey: 'user_id' })
Review.belongsTo(User, { foreignKey: 'user_id' })

User.hasMany(Orders, { foreignKey: 'buyer_id' }) // 一个人可以下0个或多个订单
Orders.belongsTo(User, { foreignKey: 'buyer_id' }) // 这（几）个订单属于某个人的

// 注意：User不一定有Token，但Toekn一定属于某个User
User.hasOne(Token, { foreignKey: 'user_id' }) // 一个人只能有0个或1个Token
Token.belongsTo(User, { foreignKey: 'user_id' }) // 这个Token属于某个人的

User.hasMany(ChatMessage, { foreignKey: 'sender_id', as: 'Sender' })
User.hasMany(ChatMessage, { foreignKey: 'receiver_id', as: 'Receiver' })
ChatMessage.belongsTo(User, { foreignKey: 'sender_id', as: 'SentMails' })
ChatMessage.belongsTo(User, { foreignKey: 'receiver_id', as: 'ReceiveMails' })

// 4. 同步到数据库
// sequelize.sync({ alter: true })
