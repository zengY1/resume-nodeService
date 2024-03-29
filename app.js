const Koa = require('koa')
const InitManager = require('./core/init')
const parser = require('koa-bodyparser')
const catchError = require('./middlewares/catchError')
const cors = require('koa-cors')
const views = require('koa-views')

const app = new Koa()
app.use(async (ctx, next) => {
    ctx.set("Access-Control-Allow-Origin", "*")
    ctx.set("Access-Control-Allow-Headers", "authorization")
    await next()
})
app.use(views('views', {
    map: {
        html: 'ejs'
    }
}))
app.use(cors())
app.use(catchError)
app.use(parser())
InitManager.Init(app)
app.listen(9090)