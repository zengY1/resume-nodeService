const util = require('util')
const {
    wx
} = require('../../config')
const axios = require('axios')
const {
    NotAuth
} = require('./../../core/http-expception')
const {
    User
} = require('../models/user')
const request = require('superagent') //http请求
const cheerio = require('cheerio') //解析html
const fs = require('fs')
const path = require('path')
const {
    oSSManager
} = require('./oss')
class wxManager {
    static async codeToToken(code, body) {
        const url = util.format(wx.url, wx.appId, wx.appSecret, code)
        const result = await axios.get(url)
        if (result.status != 200) {
            throw new NotAuth('openid获取失败！')
        }
        const errorCode = result.data.errcode
        if (errorCode) {
            throw new NotAuth('获取openid失败' + errorCode)
        }
        let user = await User.findOrCreate({
            where: {
                openid: result.data.openid
            },
            defaults: body,
            attributes: ['id', 'userName', 'avatarUrl', 'sex', 'mobile']
        })
        return user
    }
    static async getAccessTaken() {
        const url = util.format(wx.accessUrl, wx.appId, wx.appSecret)
        const result = await axios.get(url)
        if (result.status != 200) {
            throw new NotAuth('openid获取失败！')
        }
        const accessData = result.data
        const errorCode = accessData.errcode
        if (errorCode) {
            throw new NotAuth('获取openid失败' + errorCode)
        }
        return accessData
    }
    static async getWxCodeImage(uid) {
        const inOss = await oSSManager.codeImgInOss(`/codeImg/${uid}.png`)
        if (inOss == false) {
            // console.log('不存在的时候')
            const accessData = await this.getAccessTaken()
            const url = util.format(wx.codeUrl, accessData.access_token)
            const result = await axios({
                headers: {
                    "Content-type": "application/json"
                },
                method: 'post',
                url: '' + url,
                responseType: 'arraybuffer',
                data: {
                    "scene": uid,
                    page: "pages/shareResume/shareResume"
                }
            })
            let src = path.dirname(__dirname).replace(/\\/g, '/') + `/public/${uid}.png`;
            // 将获取的微信小程序码的arraybuffer存为本地文件
            await fs.writeFile(src, result.data, function (err) {
                if (err) {
                    throw new NotAuth('小程序码文件写入异常' + err)
                }
            })
            // 将本地文件上传到oss中
            const test = await oSSManager.putFromLocal({
                fileName: `/codeImg/${uid}.png`,
                fileUrl: src
            })
            // 删除生成的本地文件
            await fs.unlinkSync(src)
            return test.url
        } else {
            // console.log('存在的时候', inOss)
            return inOss
        }

    }
    static async getOneImgData() {
        return new Promise((resolve, reject) => {
            request.get('http://wufazhuce.com/').end((err, res) => {
                if (err) {
                    return console.log('请求失败！')
                } else {
                    const $ = cheerio.load(res.text)
                    const oneTips = $('.fp-one .fp-one-cita-wrapper .fp-one-cita a').eq(0).text()
                    resolve({
                        oneTips
                    })
                }
            })
        })

    }
}
module.exports = {
    wxManager
}