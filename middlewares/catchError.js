// 全局异常处理的中间件
const {environment}=require('../config')
const {
    HttpException
} = require('../core/http-expception')
const catchError = async (ctx, next) => {
    try {
        await next()
    } catch (error) {
        //返回的数据类型：httpState 
        // message
        //errorCode
        const isHttpException=error instanceof HttpException
        if(environment==='dev'&&!isHttpException){
            throw error
        }
        console.log('拿到错误',isHttpException)
        if (isHttpException) {
            // 已知异常
            ctx.body = {
                code: error.errorCode,
                msg: error.msg
            }
            ctx.status = error.status

        } else {
            // 未知异常
            ctx.body = {
                msg: '服务响应异常',
                code: 00001
            }
            ctx.status = 500
        }
    }
}
module.exports = catchError