const Router = require('koa-router')
const {
    ResumeSchools
} = require('./../models/resume-school')
const {
    Auth
} = require('../../middlewares/auth')
const {
    Success
} = require('../../core/http-expception')
const router = new Router({
    prefix: '/school'
})
// 学校的新增
router.post('/add', new Auth().m, async (ctx) => {
    const uid = ctx.auth.uid
    const body = ctx.request.body
    const options = {
        uid: uid,
        schoolName: body.schoolName,
        projectName: body.projectName,
        schoolOverDate: body.schoolOverDate,
        schoolBeginDate: body.schoolBeginDate,
        schoolDsc: body.schoolDsc,
        record: body.record,
        longitude:body.longitude,
        latitude:body.latitude,
        address:body.address,
        status: 1
    }
    const item = await ResumeSchools.create(options)
    if (item) {
        ctx.body = new Success('新增成功！')
    }

})
// school的编辑
router.post('/edit', new Auth().m, async (ctx) => {
    const uid = ctx.auth.uid
    const body = ctx.request.body
    const options = {
        uid: uid,
        schoolName: body.schoolName,
        projectName: body.projectName,
        schoolOverDate: body.schoolOverDate,
        schoolBeginDate: body.schoolBeginDate,
        schoolDsc: body.schoolDsc,
        record: body.record,
        longitude:body.longitude,
        latitude:body.latitude,
        address:body.address,
        status: 1
    }
    const edited = await ResumeSchools.update(options, {
        where: {
            id: body.id,
            status: 1,
            uid: uid
        }
    })
    if (edited) {
        ctx.body = new Success('编辑成功！')
    }
})
// 查uid下的学历信息
router.get('/list', async (ctx) => {
    const body = ctx.request.query
    const schools = await ResumeSchools.findAll({
        where: {
            uid: body.uid,
            status: 1
        },
        attributes: ['id', 'schoolName', 'projectName', 'schoolOverDate', 'schoolBeginDate', 'record', 'schoolDsc']
    })
    ctx.body = new Success()
    ctx.body.data = schools
})
// 根据uid查询学历信息
router.get('/schoolByUid', async (ctx) => {
    const body = ctx.request.query
    const school = await ResumeSchools.findOne({
        where: {
            id: body.id,
            status: 1
        },
        attributes: ['id', 'schoolName', 'projectName', 'schoolOverDate', 'schoolBeginDate', 'record', 'schoolDsc','longitude','latitude','address']
    })
    if (school) {
        ctx.body = new Success()
        ctx.body.data = school
    }
})
// 学校的软删除
router.post('/delete', new Auth().m, async (ctx) => {
    const body = ctx.request.body
    const uid = ctx.auth.uid
    const sid = parseInt(body.sid)
    const options = {
        status: 0
    }
    const deleted = await ResumeSchools.update(options, {
        where: {
            id: sid,
            status: 1,
            uid: uid
        },
        fields: ['status']
    })

    if (deleted) {
        ctx.body = new Success('删除成功！')
    }
})
module.exports = router