const Router = require('koa-router')
const {
    ResumeItems
} = require('../../../models/resume-item')
const {
    Auth
} = require('../../../../middlewares/auth')
const {
    Success
} = require('../../../../core/http-expception')
const router = new Router({
    prefix: '/boss/item'
})
const Op = require('sequelize').Op
// 分页查询
router.get('/list', new Auth().m, async (ctx) => {
    const body = ctx.request.query
    const {
        companyName,
        postName,
        itemName,
        status
    } = body
    let select = {}
    if (companyName) {
        select['cid'] = {
            [Op.like]: `%${companyName}%`
        }
    }
    if (postName) {
        select['postName'] = {
            [Op.like]: `%${postName}%`
        }
    }
    if (itemName) {
        select['itemName'] = {
            [Op.like]: `%${itemName}%`
        }
    }
    if (status) {
        select['status'] = {
            [Op.like]: `%${status}%`
        }
    }
    const size = parseInt(body.size || 10)
    const page = parseInt(body.page || 1)
    const user = await ResumeItems.findAndCountAll({
        where: select,
        limit: size,
        offset: (page - 1) * size
    })
    ctx.body = new Success()
    // ctx.body.total=user.length
    ctx.body.data = user
})

module.exports = router