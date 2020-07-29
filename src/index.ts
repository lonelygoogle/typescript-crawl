import express, { Request, Response} from 'express'
import router from './router'

const app = express()
const port = 7001

app.use(router)

app.listen(port, () => {
    console.log(`server is running on port ${port} `)
})
