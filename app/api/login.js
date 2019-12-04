const Router = require('koa-router')
const {
    Success,
    ParamException
} = require('../../core/http-expception')
const {
    getTokenUtil
} = require('../../utils/token')
const {
    User
} = require('../models/user')
const {
    wxManager
} = require('../services/wx')
const router = new Router({
    prefix: '/auth'
})
router.post('/login', async (ctx, next) => {
    const body = ctx.request.body
    let token
    let userInfo
    switch (body.type) {
        case 'MOBILE':
            token = await mobileLogin(body.mobile, body.passWord)
            break;
        case 'wxMin':
            token = await wxMinLogin(body.code, body)
            break;
        default:
            throw new ParamException('type类型异常')
    }
    async function mobileLogin(mobile, psd) {
        const user = await User.verifyUserLogin(mobile, psd)
        userInfo = user
        const token = await getTokenUtil(user.id, 2)
        return token
    }
    async function wxMinLogin(openid, body) {
        const user = await wxManager.codeToToken(openid, body)
        userInfo = user
        const token = await getTokenUtil(user[0].id, 2)
        return token
    }

    ctx.body = new Success()
    ctx.body.token = token
    ctx.body.info = userInfo
})

module.exports = router