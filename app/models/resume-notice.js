const {
    Sequelize,
    Model
} = require('sequelize')
const {
    sequelize
} = require('../../core/db')
class ResumeNotice extends Model {}
ResumeNotice.init({
    noticeTitle: Sequelize.STRING(256),
    noticeContent: Sequelize.STRING(1024),
    noticeType: Sequelize.STRING(6),
    status: Sequelize.STRING(4)   
}, {
    sequelize: sequelize
})
module.exports = {
    ResumeNotice
}