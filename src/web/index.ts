import express, { Request, Response } from 'express'

const start = (port: number | string = 5000): void => {
    const app = express()

    app.get('/api', (req: Request, res: Response) => res.send({ hello: 'world' }))

    app.listen(port, () => console.log(`Server Started at ${port}`))
}

export { start }
export default { start }