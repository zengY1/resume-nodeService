const Koa = require('koa')
const InitManager = require('./core/init')
const parser = require('koa-bodyparser')
const catchError=require('./middlewares/catchError')

const app = new Koa()

app.use(catchError)
app.use(parser())
InitManager.Init(app)
app.listen(9090)