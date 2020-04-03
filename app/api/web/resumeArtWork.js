const Router = require('koa-router')
const {
    ResumeArtWork
} = require('../../models/resume-artWork')
const {
    Auth
} = require('../../../middlewares/auth')
const {
    Success
} = require('../../../core/http-expception')
const router = new Router({
    prefix: '/web/art'
})
// 个人作品的新增
router.post('/add', new Auth().m, async (ctx) => {
    const uid = ctx.auth.uid
    const body = ctx.request.body
    const options = {
        uid: uid,
        workName: body.workName,
        workUrl: body.workUrl,
        status: 1,
        imgType:body.imgType
    }
    const item = await ResumeArtWork.create(options)
    if (item) {
        ctx.body = new Success('新增成功！')
    }

})
// 个人作品的编辑
router.post('/edit', new Auth().m, async (ctx) => {
    const uid = ctx.auth.uid
    const body = ctx.request.body
    const options = {
        uid: uid,
        workName: body.workName,
        workUrl: body.workUrl,
        status: 1,
        imgType:body.imgType
    }
    const edited = await ResumeArtWork.update(options, {
        where: {
            id: body.wid,
            status: 1,
            uid: uid
        }
    })
    if (edited) {
        ctx.body = new Success('编辑成功！')
    }
})
// 查uid下的个人作品
router.get('/list', new Auth().m, async (ctx) => {
    const uid = ctx.auth.uid
    const skills = await ResumeArtWork.findAll({
        where: {
            uid: uid,
            status: 1
        },
        attributes: ['id', 'workName', 'workUrl','imgType']
    })
    ctx.body = new Success()
    ctx.body.data = skills
})
// 查uid下的个人作品
router.get('/listById', new Auth().m, async (ctx) => {
    const uid = ctx.auth.uid
    const body = ctx.request.query
    const skills = await ResumeArtWork.findAll({
        where: {
            uid: body.id,
            status: 1
        },
        attributes: ['id', 'workName', 'workUrl','imgType']
    })
    ctx.body = new Success()
    ctx.body.data = skills
})
// 个人作品的删除
router.post('/delete', new Auth().m, async (ctx) => {
    const body = ctx.request.body
    const uid = ctx.auth.uid
    const wid = parseInt(body.wid)

    const deleted = await ResumeArtWork.destroy( {
        where: {
            id: wid,
            uid: uid
        }
    })

    if (deleted) {
        ctx.body = new Success('删除成功！')
    }
})
module.exports = router