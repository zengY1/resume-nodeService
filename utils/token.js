const jwt = require('jsonwebtoken')
const {
    tokenConfig
} = require('../config')
const getTokenUtil = function (uid, scope) {
    const secretKey = tokenConfig.secretKey
    const expiresIn = tokenConfig.expiresIn
    const token = jwt.sign({
        uid,
        scope
    }, secretKey, {
        expiresIn
    })
    return token
}
module.exports={
    getTokenUtil
}