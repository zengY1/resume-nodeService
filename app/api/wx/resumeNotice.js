const Router = require('koa-router')
const {
    ResumeNotice
} = require('../../models/resume-notice')
const {
    Success
} = require('../../../core/http-expception')
const {Auth}=require('../../../middlewares/auth')
const router = new Router({
    prefix: '/notice'
})
// 公告列表
router.get('/list',new Auth().m, async (ctx) => {
    const items = await ResumeNotice.findAll({
        where: {
            status: 1
        },
        attributes: ['id', 'noticeTitle', 'noticeContent', 'noticeType']
    })
    ctx.body = new Success()
    ctx.body.data = items
})
module.exports=router