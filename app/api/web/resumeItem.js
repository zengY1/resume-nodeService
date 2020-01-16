const Router = require('koa-router')
const {
    ResumeItems
} = require('../../models/resume-item')
const {
    Auth
} = require('../../../middlewares/auth')
const {
    Success
} = require('../../../core/http-expception')
const router = new Router({
    prefix: '/web/item'
})
// 公司下的项目的新增
router.post('/add', new Auth().m, async (ctx) => {
    const uid = ctx.auth.uid
    const body = ctx.request.body
    const options = {
        uid: uid,
        cid: body.cid,
        itemName: body.itemName,
        postName: body.postName,
        itemOverDate: body.itemOverDate,
        itemBeginDate: body.itemBeginDate,
        itemDsc: body.itemDsc,
        myDivision: body.myDivision,
        status: 1
    }
    const item = await ResumeItems.create(options)
    if (item) {
        ctx.body = new Success('新增成功！')
    }

})
// 根据uid查所有的项目列表
router.get('/list', new Auth().m, async (ctx) => {
    const uid = ctx.auth.uid
    const items = await ResumeItems.findAll({
        where: {
            uid: uid,
            status: 1
        },
        attributes: ['id', 'cid', 'itemName', 'postName', 'itemBeginDate', 'itemOverDate', 'itemDsc', 'myDivision']
    })
    ctx.body = new Success()
    ctx.body.data = items
})
// 公司下的项目的编辑
router.post('/edit', new Auth().m, async (ctx) => {
    const uid = ctx.auth.uid
    const body = ctx.request.body
    const options = {
        itemName: body.itemName,
        postName: body.postName,
        itemOverDate: body.itemOverDate,
        itemBeginDate: body.itemBeginDate,
        itemDsc: body.itemDsc,
        myDivision: body.myDivision,
        cid: body.cid,
        status: 1
    }
    const edited = await ResumeItems.update(options, {
        where: {
            id: body.iid,
            status: 1,
            uid: uid
        }
    })
    if (edited) {
        ctx.body = new Success('编辑成功！')
    }
})

// 项目的软删除
router.post('/delete', new Auth().m, async (ctx) => {
    const body = ctx.request.body
    const uid = ctx.auth.uid
    const iid = parseInt(body.iid)
    const options = {
        status: 0
    }
    const deleted = await ResumeItems.update(options, {
        where: {
            id: iid,
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