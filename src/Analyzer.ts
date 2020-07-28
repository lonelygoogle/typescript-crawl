import cheerio from 'cheerio'
import fs from 'fs'
import { hsqAnalyzer } from './crawl'

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

export default class Analyzer implements hsqAnalyzer{
    private static instance: Analyzer

    static getInstance () {
        if (!Analyzer.instance) {
            Analyzer.instance = new Analyzer()
        }
        return Analyzer.instance
    }
    private getCourseInfo (html: string) {
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

    private generateJsonContent (courseInfo: CourseResult, filePath: string) {
        let fileContent: Content = {}
        if (fs.existsSync(filePath)) {
            fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
        }
        fileContent[courseInfo.time] = courseInfo.data
        return fileContent
    }

    public analyze (html: string, filePath: string) {
        const courseInfo = this.getCourseInfo(html)
        const fileContent = this.generateJsonContent(courseInfo, filePath)
        return JSON.stringify(fileContent)
    }

    private constructor () {

    }
}