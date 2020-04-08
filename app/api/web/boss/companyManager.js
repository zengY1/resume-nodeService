const Router = require('koa-router')
const {
    Companys
} = require('../../../models/resume-company')
const {
    Auth
} = require('../../../../middlewares/auth')
const {
    Success
} = require('../../../../core/http-expception')
const router = new Router({
    prefix: '/boss/company'
})
const Op = require('sequelize').Op
// 分页查询
router.get('/list', new Auth().m, async (ctx) => {
    const body = ctx.request.query
    const {
        companyName,
        postName,
        status
    } = body
    let select = {}
    if (companyName) {
        select['companyName'] = {
            [Op.like]: `%${companyName}%`
        }
    }
    if (postName) {
        select['postName'] = {
            [Op.like]: `%${postName}%`
        }
    }
    if (status) {
        select['status'] = {
            [Op.like]: `%${status}%`
        }
    }
    const size = parseInt(body.size || 10)
    const page = parseInt(body.page || 1)
    const user = await Companys.findAndCountAll({
        where: select,
        limit: size,
        offset: (page - 1) * size
    })
    ctx.body = new Success()
    // ctx.body.total=user.length
    ctx.body.data = user
})
router.get('/get', new Auth().m, async (ctx) => {
    const user = await Companys.findAll({
        attributes: ['id', 'companyName']
    })
    ctx.body = new Success()
    ctx.body.data = user
})
module.exports = router