const {
    Sequelize,
    Model
} = require('sequelize')
const {
    sequelize
} = require('../../core/db')
class ResumeItems extends Model {}
ResumeItems.init({
    uid: Sequelize.STRING(16),
    cid: Sequelize.STRING(16),
    itemName: Sequelize.STRING(32),
    postName: Sequelize.STRING(32),
    itemBeginDate: Sequelize.STRING(64),
    itemOverDate: Sequelize.STRING(64),
    itemDsc:Sequelize.STRING(1024),
    myDivision:Sequelize.STRING(1024),
    status:Sequelize.STRING(4)
}, {
    sequelize: sequelize
})
module.exports = {
    ResumeItems
}