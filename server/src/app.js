const Koa = require('koa')
const cors = require('@koa/cors')
const Router = require('@koa/router')
const bodyParser = require('koa-bodyparser')
const { getScoreList, getRankList, addGameForSeason, deleteGameForSeason } = require('./server')

const app = new Koa()
app.use(bodyParser())
const router = new Router()
const PORT = 3000
const RESOURCE_URL = `http://localhost:${PORT}`

router.get('/', async (ctx) => {
  ctx.body = '欢迎使用文件服务（by rjm）'
})

router.get('/rank', async (ctx) => {
  const { season } = ctx.query
  const scoreList = getScoreList(season)
  const rankList = getRankList(season)
  ctx.body = {
    code: 200,
    msg: 'success',
    data: {
      scoreList,
      rankList,
    },
  }
})

router.post('/add', async (ctx) => {
  const { season, games } = ctx.request.body
  const res = addGameForSeason(season, games)
  if (res === true) {
    ctx.body = {
      code: 200,
      msg: 'success',
    }
  } else {
    ctx.body = {
      code: 500,
      msg: res.message,
    }
  }
})

router.post('/delete', async (ctx) => {
  const { season, id } = ctx.request.body
  const res = deleteGameForSeason(season, id)
  if (res === true) {
    ctx.body = {
      code: 200,
      msg: 'success',
    }
  } else {
    ctx.body = {
      code: 500,
      msg: res.message,
    }
  }
})

// 注册中间件
app.use(cors())
app.use(router.routes()).use(router.allowedMethods())

app.listen(PORT, () => {
  console.log(`app starting at: ${RESOURCE_URL}`)
})
