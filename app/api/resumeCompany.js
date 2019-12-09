const Router = require('koa-router')
const {
    Companys
} = require('./../models/resume-company')
const {
    Auth
} = require('../../middlewares/auth')
const {
    Success
} = require('../../core/http-expception')
const router = new Router({
    prefix: '/company'
})
// 公司的新增
router.post('/add', new Auth().m, async (ctx) => {
    const uid = ctx.auth.uid
    const body = ctx.request.body
    const options = {
        uid: uid,
        companyName: body.companyName,
        postName: body.postName,
        salary: body.salary,
        overDate: body.overDate,
        beginDate: body.beginDate,
        longitude: body.longitude,
        latitude: body.latitude,
        address: body.address,
        workDsc: body.workDsc,
        companyDsc: body.companyDsc,
        status: 1
    }
    await Companys.create(options)

    ctx.body = new Success('新增成功！')
})
// 根据uid查询公司的列表
router.get('/list', new Auth().m, async (ctx) => {
    const uid = ctx.auth.uid
    const companys = await Companys.findAll({
        where: {
            uid: uid,
            status: 1
        },
        attributes: ['id', 'companyName', 'postName', 'beginDate', 'overDate']
    })
    ctx.body = new Success()
    ctx.body.data = companys
})
// 根据公司id 查信息
router.get('/getCompanyById', async (ctx) => {
    const cid = ctx.request.query.cid
    const companyInfo = await Companys.findOne({
        where: {
            id: cid,
            status: 1
        },
        attributes: ['id', 'companyName', 'postName', 'beginDate', 'overDate', 'address', 'longitude', 'latitude', 'salary', 'companyDsc', 'workDsc']
    })
    ctx.body = new Success()
    ctx.body.data = companyInfo
})
// 公司信息的更新
router.post('/edit', new Auth().m, async (ctx) => {
    const uid = ctx.auth.uid
    const body = ctx.request.body
    const options = {
        uid: uid,
        companyName: body.companyName,
        postName: body.postName,
        salary: body.salary,
        overDate: body.overDate,
        beginDate: body.beginDate,
        longitude: body.longitude,
        latitude: body.latitude,
        address: body.address,
        workDsc: body.workDsc,
        companyDsc: body.companyDsc,
        status: 1
    }
    const edited = await Companys.update(options, {
        where: {
            id: body.cid,
            uid: uid
        }
    })
    if (edited) {
        ctx.body = new Success()
    }
})
// 公司信息的软删除
router.post('/delete', new Auth().m, async (ctx) => {
    const uid = ctx.auth.uid
    const body = ctx.request.body
    const options = {
        status: 0
    }
    const deleted = await Companys.update(options, {
        where: {
            id: body.cid,
            uid: uid,
            status: 1
        },
        fields: ['status']
    })
    if (deleted) {
        ctx.body = new Success('删除成功')
    }
})
module.exports = router