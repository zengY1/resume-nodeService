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
    // 查有多少个buckets
    static async getListBuckets() {
        const client = new OSS({
            region: oss.region,
            accessKeyId: oss.accessKeyId,
            accessKeySecret: oss.accessKeySecret
        })
        try {
            const result = await client.listBuckets()
            return result
        } catch (err) {
            console.log('err', err)
        }
    }
    // 上传本地文件
    static async putFromLocal(options) {
        const client = new OSS({
            region: oss.region,
            accessKeyId: oss.accessKeyId,
            accessKeySecret: oss.accessKeySecret,
            bucket: options.bucket|'wx-resume'
        })
        try {
            const result = await client.put(options.fileName,options.fileUrl)
            return result
        } catch (err) {
            console.log('err', err)
        }
    }
    // 上传本地内存文件
    static async putFromBuffer(options) {
        const client = new OSS({
            region: oss.region,
            accessKeyId: oss.accessKeyId,
            accessKeySecret: oss.accessKeySecret,
            bucket:'wx-resume'
        })
        try {
            const result = await client.put(options.fileName,options.buffer)
            return result
        } catch (err) {
            console.log('err', err)
        }
    }
    // 下载到本地内存
    static async getToBuffer(options) {
        const client = new OSS({
            region: oss.region,
            accessKeyId: oss.accessKeyId,
            accessKeySecret: oss.accessKeySecret,
            bucket:'wx-resume'
        })
        try {
            const result = await client.get(options.fileName)
            console.log('resulted', result)
            console.log('content', result.res.requestUrls)
            return result.content
        } catch (err) {
            console.log('err', err)
        }
    }
     // 下载到本地
     static async getToLocal(options) {
        const client = new OSS({
            region: oss.region,
            accessKeyId: oss.accessKeyId,
            accessKeySecret: oss.accessKeySecret,
            bucket: options.bucket|'wx-resume'
        })
        try {
            const result = await client.get(options.fileName,options.fileUrl)
            return result
        } catch (err) {
            console.log('err', err)
        }
    }
}
module.exports = {
    oSSManager
}