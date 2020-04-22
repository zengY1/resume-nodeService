const Router = require('koa-router')
const {
    ResumeNotice
} = require('../../../models/resume-notice')
const {
    Success
} = require('../../../../core/http-expception')
const {
    Auth
} = require('../../../../middlewares/auth')
const router = new Router({
    prefix: '/boss/notice'
})
// 公告列表
router.get('/list', new Auth().m, async (ctx) => {
    const items = await ResumeNotice.findAll({
        where: {
           
        },
        attributes: ['id', 'noticeTitle', 'noticeContent', 'noticeType', 'status']
    })
    ctx.body = new Success()
    ctx.body.data = items
})
// 公告通知的新增
router.post('/add', new Auth().m, async (ctx) => {
    const body = ctx.request.body
    const options = {
        noticeTitle: body.noticeTitle,
        noticeContent: body.noticeContent,
        noticeType: body.noticeType,
        status: 1
    }
    const item = await ResumeNotice.create(options)
    if (item) {
        ctx.body = new Success('新增成功！')
    }

})
// 公告通知的编辑
router.post('/edit', new Auth().m, async (ctx) => {
    const body = ctx.request.body
    console.log('body',body)
    const options = {
        noticeTitle: body.noticeTitle,
        noticeContent: body.noticeContent,
        noticeType: body.noticeType,
    }
    const edited = await ResumeNotice.update(options, {
        where: {
            id: body.id
        }
    })
    if (edited) {
        ctx.body = new Success('编辑成功！')
    }
})
// 通知的状态切换
router.post('/status', new Auth().m, async (ctx) => {
    const body = ctx.request.body
    const options = {
        status: body.status
    }
    const edited = await ResumeNotice.update(options, {
        where: {
            id: body.id,
        }
    })
    if (edited) {
        ctx.body = new Success('成功！')
    }
})
//根据id获取通知
router.get('/getById', async (ctx) => {
    const body = ctx.request.query
    const notice = await ResumeNotice.findOne({
        where: {
            id: body.id,
        },
        attributes: ['id', 'noticeTitle', 'noticeContent', 'noticeType', 'status']
    })
    ctx.body = new Success()
    ctx.body.data = notice
})
module.exports=router