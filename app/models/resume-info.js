const {
    Sequelize,
    Model
} = require('sequelize')
const {
    sequelize
} = require('../../core/db')
class ResumeInfo extends Model {}
ResumeInfo.init({
    uid:Sequelize.STRING(32),
    realName: Sequelize.STRING(32),
    sex: Sequelize.STRING(8),
    birthday: Sequelize.STRING(64),
    mobile: Sequelize.STRING(32),
    email: Sequelize.STRING(32),
    province: Sequelize.STRING(16),
    city: Sequelize.STRING(8),
    salary:Sequelize.STRING(32),
    evaluation:Sequelize.STRING(2048),
    address:Sequelize.STRING(128),
    status:Sequelize.STRING(4)
}, {
    sequelize: sequelize
})
module.exports = {
    ResumeInfo
}