/**
 * api下的user的文件
 * 1.微信小程序的注册
 * 2.微信小程序的登陆
 */
const Router = require('koa-router')
const {
    User
} = require('../models/user')
const {
    ParamException,
    Success
} = require('../../core/http-expception')
const {
    Auth
} = require('../../middlewares/auth')
const router = new Router({
    prefix: '/user'
})
router.post('/register', async (ctx) => {
    const body = ctx.request.body

    if (body.userName == '') {
        throw new ParamException('用户名不能为空！')
    }
    if (body.sex == '') {
        throw new ParamException('性别不能为空！')
    }
    if (body.mobile == '') {
        throw new ParamException('手机号不能为空！')
    }

    const user = await User.findOrCreate({
        where: {
            mobile: body.mobile,
            openid: body.openid
        },
        defaults: body
    })
    if (!user[1]) {
        throw new Success('用户已存在！')
    }
    ctx.body = new Success()
})
// 非分页查询
router.get('/list', new Auth().m, async (ctx) => {
    const user = await User.findAll({
        where: {

        },
        attributes: ['id', 'userName', 'mobile', 'sex']
    })
    ctx.body = new Success()
    ctx.body.total = user.length
    ctx.body.data = user

})
// 分页查询
router.get('/count/list', new Auth().m, async (ctx) => {
    const body = ctx.request.query
    const size = parseInt(body.size)
    const page = parseInt(body.page)
    const user = await User.findAndCountAll({
        where: {

        },
        attributes: ['id', 'userName', 'mobile', 'sex'],
        limit: size,
        offset: (page - 1) * size
    })
    ctx.body = new Success()
    // ctx.body.total=user.length
    ctx.body.data = user
})
// 首次进入新增手机号码
router.post('/mobile/add', new Auth().m, async (ctx) => {
    const body = ctx.request.body
    const mobile = body.mobile
    const uid = parseInt(ctx.auth.uid)
    const isExist = await User.findOne({
        where: {
            mobile: mobile
        }
    })
    if (isExist) {
        throw new ParamException('该手机号已存在！','20001')
    } else {
        const user = await User.update({
            mobile: mobile,
            passWord: body.passWord
        }, {
            where: {
                id: uid
            },
            // fields:[mobile,passWord]
        })
    }
    ctx.body = new Success()
})
module.exports = router