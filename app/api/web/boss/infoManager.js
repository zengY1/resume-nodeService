const Router = require('koa-router')
const {
    ResumeInfo
} = require('../../../models/resume-info')
const {
    Auth
} = require('../../../../middlewares/auth')
const {
    Success
} = require('../../../../core/http-expception')
const router = new Router({
    prefix: '/boss/info'
})
const Op = require('sequelize').Op
// 分页查询
router.get('/list', new Auth().m, async (ctx) => {
    const body = ctx.request.query
    const {
        realName,
        mobile,
        sex,
        province,
        status
    } = body
    let select = {}
    if (realName) {
        select['realName'] = {
            [Op.like]: `%${realName}%`
        }
    }
    if (mobile) {
        select['mobile'] = {
            [Op.like]: `%${mobile}%`
        }
    }
    if (province) {
        select['province'] = {
            [Op.like]: `%${province}%`
        }
    }
    if (status) {
        select['status'] = {
            [Op.like]: `%${status}%`
        }
    }
    if (sex) {
        select['sex'] = {
            [Op.like]: `%${sex}%`
        }
    }
    const size = parseInt(body.size || 10)
    const page = parseInt(body.page || 1)
    const user = await ResumeInfo.findAndCountAll({
        where: select,
        limit: size,
        offset: (page - 1) * size
    })
    ctx.body = new Success()
    // ctx.body.total=user.length
    ctx.body.data = user
})

module.exports = router