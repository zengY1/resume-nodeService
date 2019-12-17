const {
    Sequelize,
    Model
} = require('sequelize')
const {
    sequelize
} = require('../../core/db')
class ResumeArtWork extends Model {}
ResumeArtWork.init({
    uid: Sequelize.STRING(16),
    workName: Sequelize.STRING(32),
    workUrl: Sequelize.STRING(1024),
    imgType:Sequelize.STRING(6),
    status: Sequelize.STRING(4)
}, {
    sequelize: sequelize
})
module.exports = {
    ResumeArtWork
}