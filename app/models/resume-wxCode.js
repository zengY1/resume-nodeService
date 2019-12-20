const {
    Sequelize,
    Model
} = require('sequelize')
const {
    sequelize
} = require('../../core/db')
class ResumeWxCode extends Model {}
ResumeWxCode.init({
    uid: Sequelize.STRING(16),
    codeUrl: Sequelize.STRING(1024),
    status: Sequelize.STRING(4)
}, {
    sequelize: sequelize
})
module.exports = {
    ResumeWxCode
}