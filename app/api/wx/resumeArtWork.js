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
    prefix: '/work'
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
// 通过分享的uid下的个人作品
router.get('/list/share',  async (ctx) => {
    const body = ctx.request.query
    const skills = await ResumeArtWork.findAll({
        where: {
            uid: body.uid,
            status: 1
        },
        attributes: ['id', 'workName', 'workUrl','imgType']
    })
    ctx.body = new Success()
    ctx.body.data = skills
})
// 根据id查个人作品
router.get('/getById', async (ctx) => {
    const body = ctx.request.query
    const skills = await ResumeArtWork.findOne({
        where: {
            status: 1,
            id: body.wid
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
    const options={status:0}

    const deleted = await ResumeArtWork.destroy(options, {
        where: {
            id: wid,
            uid: uid,
            status:1
        }
    })

    if (deleted) {
        ctx.body = new Success('删除成功！')
    }
})
module.exports = router