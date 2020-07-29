import { Router,Request,Response } from 'express'
import Crowller from './crawl'
import Analyzer from './Analyzer'

const router = Router()

router.get('/', (req: Request, res:Response) => {
    res.send('hello world')
})

router.get('/getData', (req: Request, res:Response) => {
    const secret = 'x3b174jsx'
    const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`
    const analyzer = Analyzer.getInstance()
    new Crowller(analyzer, url)
    res.send('get Data success!')
})

export default router