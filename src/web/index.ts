import express, { Request, Response } from 'express'
import path from 'path'
import { Bot } from '../utils'

const start = (client: Bot, port: number | string = 5000): void => {
    const app = express()

    app.use(express.static(path.join(__dirname, 'client/build')))

    app.all('/*', (req: Request, res: Response, next) => {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'X-Requested-With')
        next()
    })

    app.get('/api', (req: Request, res: Response) => res.send({ hello: 'world' }))
    app.get('/api/user', (req: Request, res: Response) => res.send({ id: client.user?.id, username: client.user?.username, discriminator: client.user?.discriminator, guilds: client.guilds.cache.size, users: client.users.cache.size, avatar: client.user?.avatar }))
    app.get('*', (req: Request, res: Response) => res.sendFile(path.join(__dirname, 'client/build/index.html')))

    app.listen(port, () => console.log(`Server Started at ${port}`))
}

export { start }
export default { start }