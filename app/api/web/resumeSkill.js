const Router = require('koa-router')
const {
    ResumeSkills
} = require('../../models/resume-skill')
const {
    Auth
} = require('../../../middlewares/auth')
const {
    Success
} = require('../../../core/http-expception')
const router = new Router({
    prefix: '/web/skill'
})
// 个人技能的新增
router.post('/add', new Auth().m, async (ctx) => {
    const uid = ctx.auth.uid
    const body = ctx.request.body
    const options = {
        uid: uid,
        skillName: body.skillName,
        skillDsc: body.skillDsc,
        skillGrade: body.skillGrade,
        status: 1
    }
    const item = await ResumeSkills.create(options)
    if (item) {
        ctx.body = new Success('新增成功！')
    }

})
// 个人技能的编辑
router.post('/edit', new Auth().m, async (ctx) => {
    const uid = ctx.auth.uid
    const body = ctx.request.body
    const options = {
        uid: uid,
        skillName: body.skillName,
        skillDsc: body.skillDsc,
        skillGrade: body.skillGrade,
        status: 1
    }
    const edited = await ResumeSkills.update(options, {
        where: {
            id: body.sid,
            status: 1,
            uid: uid
        }
    })
    if (edited) {
        ctx.body = new Success('编辑成功！')
    }
})
// 查uid下的个人技能
router.get('/list', new Auth().m, async (ctx) => {
    const uid = ctx.auth.uid
    const skills = await ResumeSkills.findAll({
        where: {
            uid: uid,
            status: 1
        },
        attributes: ['id', 'skillName', 'skillGrade', 'skillDsc']
    })
    ctx.body = new Success()
    ctx.body.data = skills
})
// 通过uid下的个人技能
router.get('/listById', new Auth().m, async (ctx) => {
    const uid = ctx.auth.uid
    const body = ctx.request.query
    const skills = await ResumeSkills.findAll({
        where: {
            uid: body.id,
            status: 1
        },
        attributes: ['id', 'skillName', 'skillGrade', 'skillDsc']
    })
    ctx.body = new Success()
    ctx.body.data = skills
})
// 个人技能的删除
router.post('/delete', new Auth().m, async (ctx) => {
    const body = ctx.request.body
    const uid = ctx.auth.uid
    const sid = parseInt(body.sid)

    const deleted = await ResumeSkills.destroy( {
        where: {
            id: sid,
            uid: uid
        }
    })

    if (deleted) {
        ctx.body = new Success('删除成功！')
    }
})
module.exports = router