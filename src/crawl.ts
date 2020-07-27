import fs from 'fs'
import path from 'path'
import superagent from 'superagent'
import cheerio from 'cheerio'

interface Course {
    title: string,
    count: number
}

interface CourseResult {
    time: number,
    data: Course[]
}

interface Content {
    [propName: number]: Course[]
}

class Crowller {
    private secret = 'x3b174jsx'
    private url = `http://www.dell-lee.com/typescript/demo.html?secret=${this.secret}`
    async getHtml () {
       const result = await superagent.get(this.url)
       return result.text
    }
    
    getCourseInfo (html: string) {
        const $ = cheerio.load(html)
        const courseItem = $('.course-item')
        const courseInfos:Course[]  = []
        courseItem.map((index, element) => {
            const descs = $(element).find('.course-desc')
            const title = descs.eq(1).text()
            const count = parseInt(title.split('：')[1])
            courseInfos.push({title, count})
        })
        const result = {
            time: new Date().getTime(),
            data: courseInfos
        }
        return result
    }

    generateJsonContent (courseInfo: CourseResult) {
        const filePath = path.resolve(__dirname, '../data/course.json')
        let fileContent: Content = {}
        if (fs.existsSync(filePath)) {
            fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
        }
        fileContent[courseInfo.time] = courseInfo.data
        return fileContent
    }
    async initSpiderProcess () {
        const html = await this.getHtml()
        const courseInfo = this.getCourseInfo(html)
        const fileContent = this.generateJsonContent(courseInfo)
        const filePath = path.resolve(__dirname, '../data/course.json')
        fs.writeFileSync(filePath, JSON.stringify(fileContent))
    }
    constructor () {
        this.initSpiderProcess()
    }
}

const crowller = new Crowller()
