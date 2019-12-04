/**
 * http的异常类
 */
class HttpException extends Error{
    constructor(msg='服务端异常',errorCode=10001,status=200){
        super()
        this.msg=msg
        this.errorCode=errorCode
        this.status=status
    }
}
// 参数异常
class ParamException extends HttpException{
    constructor(msg,errorCode){
        super()
        this.msg=msg||'参数错误！',
        this.errorCode=errorCode||'10001'
    }
}
// 登陆信息
class LoginExecption extends HttpException{
    constructor(msg,errorCode){
        super()
        this.msg=msg||'用户不存在',
        this.errorCode=errorCode||'10001'
    }
}
// 正确的返回值
class Success extends HttpException{
    constructor(msg){
        super()
        this.msg=msg||'success',
        this.errorCode='00000'
        this.status=200
    }
}
// 没有权限
class NotAuth extends HttpException{
    constructor(msg,errorCode){
        super()
        this.msg=msg||'token异常'
        this.errorCode=errorCode||'10001'
        this.status=403
    }
}
module.exports={
    HttpException,
    ParamException,
    LoginExecption,
    Success,
    NotAuth
}