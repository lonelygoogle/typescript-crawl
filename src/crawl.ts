import fs from 'fs'
import path from 'path'
import superagent from 'superagent'

import Analyzer from './Analyzer'

export interface hsqAnalyzer {
    analyze: (html: string, filePath: string) => string
}

class Crowller {

    private filePath = path.resolve(__dirname, '../data/course.json')
    private async getHtml () {
       const result = await superagent.get(this.url)
       return result.text
    }

    private writeFile (content: string) {
        fs.writeFileSync(this.filePath, content)
    }
    private async initSpiderProcess () {
        const html = await this.getHtml()
        // const courseInfo = this.getCourseInfo(html)
        const fileContent = this.analyzer.analyze(html, this.filePath)
        this.writeFile(fileContent)
    }
    constructor (private analyzer: hsqAnalyzer, private url: string) {
        this.initSpiderProcess()
    }
}

const secret = 'x3b174jsx'
const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`
const analyzer = Analyzer.getInstance()
new Crowller(analyzer, url)
console.log(6666666666666)
