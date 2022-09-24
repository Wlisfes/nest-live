import Koa, { HttpError } from 'koa'
import Router from 'koa-router'
import Static from 'koa-static'
import Views from 'koa-views'
import path from 'path'
import nodeMediaServer from 'node-media-server'

const app = new Koa()
const router = new Router()
app.use(Static(__dirname + '/public'))
app.use(
    Views(path.join(__dirname + '/public'), {
        map: {
            html: 'nunjucks'
        }
    })
)

const config: any = {
    rtmp: {
        port: 3010,
        chunk_size: 6000,
        gop_cache: true,
        ping: 30,
        ping_timeout: 60
    },
    http: {
        port: 3020,
        allow_origin: '*',
        mediaroot: './media/'
    }
}

const nms = new nodeMediaServer(config)

nms.run()

router.get('/', async ctx => {
    await ctx.render('index.html')
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})
