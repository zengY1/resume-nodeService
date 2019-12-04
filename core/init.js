const requireDirectory=require('require-directory')
const Router=require('koa-router')
class InitManager{
    static Init(data){
        InitManager.useRouterModule(data)
    }
    static useRouterModule(app) {
        requireDirectory(module,'./../app/api',{visit:whenLoadModule})
        function whenLoadModule(obj) {
            if(obj instanceof Router){
                app.use(obj.routes())
            }
        }
    }
}
module.exports=InitManager