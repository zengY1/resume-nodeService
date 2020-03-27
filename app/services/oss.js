const OSS = require('ali-oss')
const {
    oss
} = require('../../config')
const {
    NotAuth
} = require('./../../core/http-expception')

class oSSManager {
    constructor() {

    }
    // 上传本地文件
    static async putFromLocal(options) {
        const client = new OSS({
            region: oss.region,
            accessKeyId: oss.accessKeyId,
            accessKeySecret: oss.accessKeySecret,
            bucket: 'wx-resume'
        })
        client.useBucket('wx-resume')
        try {
            const result = await client.put(options.fileName, options.fileUrl)
            return result
        } catch (err) {
            throw new NotAuth('小程序码上传oss异常'+err)
        }
    }
    // 判断文件是否存在 存在返回线上的url 不存在返回false
    static async codeImgInOss(imgName) {
        const client = new OSS({
            region: oss.region,
            accessKeyId: oss.accessKeyId,
            accessKeySecret: oss.accessKeySecret,
            bucket: 'wx-resume'
        })
        client.useBucket('wx-resume')
        const inOss = await client.get(imgName).then((result) => {
            if (result.res.status == 200) {
                return result.res.requestUrls[0]
            }
        }).catch((e) => {
            if (e.code == 'NoSuchKey') {
                return false
            }
        })
        // console.log('in',inOss)
        return inOss
    }
}
module.exports = {
    oSSManager
}