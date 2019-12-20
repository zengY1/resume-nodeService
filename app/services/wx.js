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
        const accessData=result.data
        const errorCode = accessData.errcode
        if (errorCode) {
            throw new NotAuth('获取openid失败' + errorCode)
        }
        return accessData
    }
    static async getWxCodeImage(uid){
        const accessData=await this.getAccessTaken()
        const url =util.format(wx.codeUrl,accessData.access_token)
        const result=await axios.post(url,{"scene":uid})
        console.log('result',result)
        return result.data
    }
}
module.exports = {
    wxManager
}