const Router = require('koa-router')
const {
    ResumeArtWork
} = require('../../../models/resume-artWork')
const {
    Auth
} = require('../../../../middlewares/auth')
const {
    Success
} = require('../../../../core/http-expception')
const router = new Router({
    prefix: '/boss/art'
})
const Op = require('sequelize').Op
// 分页查询
router.get('/list', new Auth().m, async (ctx) => {
    const body = ctx.request.query
    const {
        workName,
        imgType,
        status
    } = body
    let select = {}
    if (workName) {
        select['workName'] = {
            [Op.like]: `%${workName}%`
        }
    }
    if (imgType) {
        select['imgType'] = {
            [Op.like]: `%${imgType}%`
        }
    }
    if (status) {
        select['status'] = {
            [Op.like]: `%${status}%`
        }
    }
    const size = parseInt(body.size || 10)
    const page = parseInt(body.page || 1)
    const user = await ResumeArtWork.findAndCountAll({
        where: select,
        limit: size,
        offset: (page - 1) * size,
    })
    ctx.body = new Success()
    ctx.body.data = user
})

module.exports = router