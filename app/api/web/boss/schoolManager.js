const Router = require('koa-router')
const {
    ResumeSchools
} = require('../../../models/resume-school')
const {
    Auth
} = require('../../../../middlewares/auth')
const {
    Success
} = require('../../../../core/http-expception')
const router = new Router({
    prefix: '/boss/school'
})
const Op = require('sequelize').Op
// 分页查询
router.get('/list', new Auth().m, async (ctx) => {
    const body = ctx.request.query
    const {
        schoolName,
        record,
        schoolBeginDate,
        schoolOverDate,
        status
    } = body
    let select = {}
    if (schoolName) {
        select['schoolName'] = {
            [Op.like]: `%${schoolName}%`
        }
    }
    if (record) {
        select['record'] = {
            [Op.like]: `%${record}%`
        }
    }
    if (schoolBeginDate) {
        select['schoolBeginDate'] = {
            [Op.like]: `%${schoolBeginDate}%`
        }
    }
    if (schoolOverDate) {
        select['schoolOverDate'] = {
            [Op.like]: `%${schoolOverDate}%`
        }
    }
    if (status) {
        select['status'] = {
            [Op.like]: `%${status}%`
        }
    }
    const size = parseInt(body.size || 10)
    const page = parseInt(body.page || 1)
    const user = await ResumeSchools.findAndCountAll({
        where: select,
        limit: size,
        offset: (page - 1) * size,
        attributes: ['id','uid', 'schoolName', 'projectName', 'schoolOverDate', 'schoolBeginDate', 'record', 'schoolDsc','address','status']
    })
    ctx.body = new Success()
    // ctx.body.total=user.length
    ctx.body.data = user
})

module.exports = router