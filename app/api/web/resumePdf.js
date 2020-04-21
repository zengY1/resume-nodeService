const Router = require('koa-router')
const {
    ResumeInfo
} = require('../../models/resume-info')
const {
    ResumeSchools
} = require('../../models/resume-school')
const {
    Companys
} = require('../../models/resume-company')
const {
    ResumeItems
} = require('../../models/resume-item')
const {
    ResumeSkills
} = require('../../models/resume-skill')
const {
    ResumeArtWork
} = require('../../models/resume-artWork')
const {
    Auth
} = require('../../../middlewares/auth')
const {
    Success
} = require('../../../core/http-expception')
const {
    PDF
} = require('../../services/pdf/pdf')
const {
    records,
    skillGradeOptions
} = require('../../../utils/static')
const {
    wxManager
} = require('../../services/wx')
const send = require('koa-send')
const router = new Router({
    prefix: '/web'
})
router.get('/pdf', new Auth().m, async (ctx) => {
    const uid = ctx.auth.uid
    //    获取当前用户的简历信息
    const info = await ResumeInfo.findOne({
        where: {
            uid: uid,
            status: 1
        },
        attributes: ['id', 'realName', 'sex', 'birthday', 'mobile', 'province', 'city', 'salary', 'address', 'email']
    })
    // 获取教育经历
    const schools = await ResumeSchools.findAll({
        where: {
            uid: uid,
            status: 1
        },
        attributes: ['id', 'schoolName', 'projectName', 'schoolOverDate', 'schoolBeginDate', 'record', 'schoolDsc', 'latitude', 'longitude', 'address'],
        order: [
            ['record', 'ASC']
        ]

    })
    // 获取工作经历
    const companys = await Companys.findAll({
        where: {
            uid: uid,
            status: 1
        },
        attributes: ['id', 'companyName', 'postName', 'beginDate', 'overDate', 'salary', 'workDsc', 'companyDsc', 'address'],
        order: [
            ['beginDate', 'DESC']
        ]
    })
    // 获取项目经历
    const items = await ResumeItems.findAll({
        where: {
            uid: uid,
            status: 1
        },
        attributes: ['id', 'cid', 'itemName', 'postName', 'itemBeginDate', 'itemOverDate', 'itemDsc', 'myDivision']
    })
    // 获取技能列表
    const skills = await ResumeSkills.findAll({
        where: {
            uid: uid,
            status: 1
        },
        attributes: ['id', 'skillName', 'skillGrade', 'skillDsc']
    })
    // 获取个人作品
    const arts = await ResumeArtWork.findAll({
        where: {
            uid: uid,
            status: 1
        },
        attributes: ['id', 'workName', 'workUrl', 'imgType']
    })
    // 小程序码
    const t1 = await wxManager.getWxCodeImage(uid)
    const html_template = 'index.ejs'
    const data_template = {
        info: info.dataValues,
        school: schools,
        companys: companys,
        skills: skills,
        items: items,
        arts: arts,
        codeSrc: t1
    }
    if (data_template.info.birthday) {
        data_template.info.age = PDF.dateUtil(data_template.info.birthday)
    }
    if (data_template.school.length > 0) {
        data_template.info.record = records[schools[0].record].label
        schools.forEach((item) => {
            const a = records[item.record].label
            item.record = a
            return item
        })
    }
    if (data_template.skills.length > 0) {
        skills.forEach((item) => {
            item.skillGrade = skillGradeOptions[item.skillGrade].label
            return item
        })
    }
    if (data_template.companys.length > 0) {
        const nowDate = new Date().getTime();
        const firstDate = companys[companys.length - 1].beginDate;
        const da = new Date(firstDate).getTime();
        const hou = Math.floor((nowDate - da) / (3600 * 24 * 1000));
        data_template.info.workOld = Math.ceil(hou / 365);
    }
    await ctx.render(html_template, data_template)

    await PDF.create(ctx.body)

    ctx.body = new Success()
})
router.get('/download', async (ctx) => {
    let src = `views/myResume.pdf`;
    ctx.attachment(src)
    await send(ctx, src)
})
module.exports = router