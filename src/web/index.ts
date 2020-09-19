import express, { Request, Response } from 'express'
import { join } from 'path'

const start = (port: number | string = 5000): void => {
    const app = express()

    app.use(express.static(join(__dirname, 'client/build')))

    app.get('/api', (req: Request, res: Response) => res.send({ hello: 'world' }))
    app.get('*', (req: Request, res: Response) => res.sendFile(join(__dirname, 'client/build/index.html')))

    app.listen(port, () => console.log(`Server Started at ${port}`))
}

export { start }
export default { start }