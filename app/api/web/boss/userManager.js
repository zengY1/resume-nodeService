const Router = require('koa-router')
const {
    User
} = require('../../../models/user')
const {
    Auth
} = require('../../../../middlewares/auth')
const {
    Success
} = require('../../../../core/http-expception')
const router = new Router({
    prefix: '/boss/user'
})
const Op = require('sequelize').Op
// 获取用户列表
// 分页查询
router.get('/list', new Auth().m, async (ctx) => {
    const body = ctx.request.query
    const {
        userName,
        mobile,
        sex
    } = body
    let select = {}
    if (userName) {
        select['userName'] = {
            [Op.like]: `%${userName}%`
        }
    }
    if (mobile) {
        select['mobile'] = {
            [Op.like]: `%${mobile}%`
        }
    }
    if (sex) {
        select['sex'] = {
            [Op.like]: `%${sex}%`
        }
    }
    const size = parseInt(body.size | 10)
    const page = parseInt(body.page | 1)
    const user = await User.findAndCountAll({
        where: select,
        attributes: ['id', 'userName', 'mobile', 'sex', 'openid', 'avatarUrl'],
        limit: size,
        offset: (page - 1) * size
    })
    ctx.body = new Success()
    // ctx.body.total=user.length
    ctx.body.data = user
})

module.exports = router