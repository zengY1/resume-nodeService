const {
    dbName,
    host,
    port,
    user,
    password
} = require('../config').database
const Sequelize = require('sequelize')
const sequelize = new Sequelize(dbName, user, password, {
    dialect: 'mysql',
    host,
    port,
    logging: true,
    timezone: '+08:00',
    define: {
        timestamps: true
    }
})
sequelize.sync({
    force: false
})
module.exports = {
    sequelize: sequelize
}