const {
    Sequelize,
    Model
} = require('sequelize')
const {
    sequelize
} = require('./../../core/db')
const {
    LoginExecption
} = require('../../core/http-expception')
const bcrypt = require('bcrypt-nodejs')
class User extends Model {
    static async verifyUserLogin(mobile, plainPsd) {
        // 查询用户的信息
        const user = await User.findOne({
            where: {
                mobile: mobile
            }
        })
        if (!user) {
            throw new LoginExecption('手机号不正确！')
        }
        // 验证密码
        const isCorrect = bcrypt.compareSync(plainPsd, user.passWord)
        if (!isCorrect) {
            throw new LoginExecption('密码不正确！')
        }
        return user
    }
}
User.init({
    userName: Sequelize.STRING(64),
    sex: Sequelize.STRING(32),
    mobile: {
        type: Sequelize.STRING(11),
        unique: true
    },
    openid: {
        type: Sequelize.STRING(64),
        unique: true
    },
    avatarUrl: Sequelize.STRING(256),
    passWord: {
        type: Sequelize.STRING(64),
        set(val) {
            const salt = bcrypt.genSaltSync(10)
            const psd = bcrypt.hashSync(val, salt)
            this.setDataValue('passWord', psd)
        }
    }

}, {
    sequelize: sequelize
})
module.exports = {
    User
}