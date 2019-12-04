const Router = require('koa-router')
const {
    ResumeInfo
} = require('../models/resume-info')
const {
    Auth
} = require('../../middlewares/auth')
const {
    Success
} = require('../../core/http-expception')
const router = new Router({
    prefix: '/info'
})
// 简历信息的新增和编辑
router.post('/edit', new Auth().m, async (ctx) => {
    const body = ctx.request.body
    const uid = ctx.auth.uid
    const options = {
        uid: uid,
        realName: body.realName,
        sex: body.sex,
        birthday: body.birthday,
        mobile: body.mobile,
        province: body.province,
        city: body.city,
        salary: body.salary,
        address:body.address,
        status: 1
    }
    const resumeInfo = await ResumeInfo.findOne({
        where: {
            uid: uid,
            status: 1
        },
        attributes: ['id']
    })
    if (resumeInfo) {
        ResumeInfo.update(options, {
            where: {
                uid: uid,
                status: 1
            }
        })
        throw new Success('用户信息更新！')
    } else {
        ResumeInfo.create(options, {
            fields: ['realName', 'sex', 'birthday', 'mobile', 'province', 'city', 'salary', 'uid', 'status','address']
        })
        throw new Success('用户信息新建！')
    }

})
// 当前用户简历信息的获取
router.get('/get', new Auth().m, async (ctx) => {
    const uid = ctx.auth.uid
    const resumeInfo = await ResumeInfo.findOne({
        where: {
            uid: uid,
            status: 1
        },
        attributes: ['id', 'realName', 'sex', 'birthday', 'mobile', 'province', 'city', 'salary','address']
    })
    ctx.body = new Success()
    ctx.body.data = resumeInfo
})
//根据id获取简历的信息
router.get('/get/byId', async (ctx) => {
    const body = ctx.request.query
    const resumeInfo = await ResumeInfo.findOne({
        where: {
            id: body.id,
            status: 1
        },
        attributes: ['id', 'realName', 'sex', 'birthday', 'mobile', 'province', 'city', 'salary','address']
    })
    ctx.body = new Success()
    ctx.body.data = resumeInfo
})
// 当前用户的软删除
router.post('/delete', new Auth().m, async (ctx) => {
    const uid = ctx.auth.uid
    const body = ctx.request.body
    const options = {
        status: 0
    }
    const deleted = await ResumeInfo.update(options, {
        where: {
            id: body.id,
            uid: uid,
            status: 1
        },
        fields: ['status']
    })
    if (deleted) {
        throw new Success('删除成功')
    }
})
module.exports = router