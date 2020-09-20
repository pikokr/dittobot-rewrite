import express, { Request, Response } from 'express'
import path from 'path'
import { Bot } from '../utils'

const start = (client: Bot, port: number | string = 5000): void => {
    const app = express()

    app.use(express.static(path.join(__dirname, 'client/build')))

    app.get('/api', (req: Request, res: Response) => res.send({ hello: 'world' }))
    app.get('*', (req: Request, res: Response) => res.sendFile(path.join(__dirname, 'client/build/index.html')))

    app.listen(port, () => console.log(`Server Started at ${port}`))
}

export { start }
export default { start }