const Router = require('koa-router')
const {
    ResumeWxCode
} = require('../../models/resume-wxCode')
const {
    Auth
} = require('../../../middlewares/auth')
const {
    Success
} = require('../../../core/http-expception')
const {
    wxManager
} = require('../../services/wx')
const {
    oSSManager
} = require('../../services/oss')
const router = new Router({
    prefix: '/wx'
})

// 保存微信小程序的程序码
router.get('/code', new Auth().m, async (ctx) => {
    const uid = ctx.auth.uid
    const t1 = await wxManager.getWxCodeImage(uid)
    console.log('t1', t1)
    ctx.body = t1
})
// oss
router.get('/oss', async (ctx) => {
    const test = await oSSManager.putFromLocal()
    ctx.body = test
})
// 保存微信小程序码下面的的爬虫字段
router.get('/desc', new Auth().m, async (ctx) => {
    const d = await wxManager.getOneImgData()
    console.log('rip',d)
    ctx.body=d
})

module.exports = router