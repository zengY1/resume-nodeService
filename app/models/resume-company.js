const {
    Sequelize,
    Model
} = require('sequelize')
const {
    sequelize
} = require('../../core/db')
class Companys extends Model {}
Companys.init({
    uid: Sequelize.STRING(16),
    companyName: Sequelize.STRING(32),
    postName: Sequelize.STRING(32),
    address: Sequelize.STRING(256),
    longitude: Sequelize.STRING(64),
    latitude: Sequelize.STRING(64),
    salary: Sequelize.STRING(16),
    beginDate: Sequelize.STRING(64),
    overDate: Sequelize.STRING(64),
    workDsc:Sequelize.STRING(1024),
    companyDsc:Sequelize.STRING(1024),
    status:Sequelize.STRING(4)
}, {
    sequelize: sequelize
})
module.exports = {
    Companys
}