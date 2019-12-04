const {
    Sequelize,
    Model
} = require('sequelize')
const {
    sequelize
} = require('../../core/db')
class ResumeSchools extends Model {}
ResumeSchools.init({
    uid: Sequelize.STRING(16),
    schoolName: Sequelize.STRING(32),
    projectName: Sequelize.STRING(32),
    schoolBeginDate: Sequelize.STRING(64),
    schoolOverDate: Sequelize.STRING(64),
    schoolDsc: Sequelize.STRING(1024),
    record: Sequelize.STRING(8),
    address: Sequelize.STRING(256),
    longitude: Sequelize.STRING(64),
    latitude: Sequelize.STRING(64),
    status: Sequelize.STRING(4)
}, {
    sequelize: sequelize
})
module.exports = {
    ResumeSchools
}