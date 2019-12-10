const {
    Sequelize,
    Model
} = require('sequelize')
const {
    sequelize
} = require('../../core/db')
class ResumeSkills extends Model {}
ResumeSkills.init({
    uid: Sequelize.STRING(16),
    skillName: Sequelize.STRING(32),
    skillDsc: Sequelize.STRING(1024),
    skillGrade: Sequelize.STRING(4),
    status: Sequelize.STRING(4)
}, {
    sequelize: sequelize
})
module.exports = {
    ResumeSkills
}