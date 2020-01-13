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
}=require('../../services/oss')
const router = new Router({
    prefix: '/wx'
})

// 个人技能的编辑
router.get('/code', new Auth().m, async (ctx) => {
    const uid = ctx.auth.uid
    const t1=await wxManager.getWxCodeImage(uid)
    // const test= await oSSManager.getToBuffer({fileName:'/codeImg/location.png'})
    ctx.body = t1
})

module.exports = router