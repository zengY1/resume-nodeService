const {
    NotAuth
} = require('../core/http-expception')
const jwt = require('jsonwebtoken')
const {
    tokenConfig
} = require('../config')
class Auth {
    constructor(leavl) {
        this.leavl = leavl || 1
        Auth.ADMIN = 8
    }
    get m() {
        return async (ctx, next) => {
            const token = ctx.request.header.authorization
            
            if (!token) {
                throw new NotAuth('请登录！','40001')
            }
            try {
                var authCode = await jwt.verify(token, tokenConfig.secretKey)
            } catch (error) {
                if (error.name == 'TokenExpiredError') {
                    throw new NotAuth('token已过期！','40003')
                }
                throw new NotAuth('token异常！','40003')
            }
            if (authCode.scope < this.level) {
                throw new NotAuth('没有访问权限')
            }
            ctx.auth = authCode
            await next()
        }
    }
}
module.exports = {
    Auth
}