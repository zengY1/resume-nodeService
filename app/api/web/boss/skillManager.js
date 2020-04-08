const Router = require('koa-router')
const {
    ResumeSkills
} = require('../../../models/resume-skill')
const {
    Auth
} = require('../../../../middlewares/auth')
const {
    Success
} = require('../../../../core/http-expception')
const router = new Router({
    prefix: '/boss/skill'
})
const Op = require('sequelize').Op
// 分页查询
router.get('/list', new Auth().m, async (ctx) => {
    const body = ctx.request.query
    const {
        skillName,
        skillGrade,
        status
    } = body
    let select = {}
    if (skillName) {
        select['skillName'] = {
            [Op.like]: `%${skillName}%`
        }
    }
    if (skillGrade) {
        select['skillGrade'] = {
            [Op.like]: `%${skillGrade}%`
        }
    }
    if (status) {
        select['status'] = {
            [Op.like]: `%${status}%`
        }
    }
    const size = parseInt(body.size || 10)
    const page = parseInt(body.page || 1)
    const user = await ResumeSkills.findAndCountAll({
        where: select,
        limit: size,
        offset: (page - 1) * size,
    })
    ctx.body = new Success()
    ctx.body.data = user
})

module.exports = router