const puppeteer = require('puppeteer')
class PDF {
    constructor() {

    }
    static async create(pdf_string) {
        const browser = await puppeteer.launch({
            args: ['--disable-dev-shm-usage', '--no-sandbox'],
            headless:true,
            executablePath:'/opt/google/chrome/chrome'
        });
        const page = await browser.newPage();
        await page.setContent(pdf_string)
        await page.addStyleTag({
            path: 'views/index.css'
        })
        await page.pdf({
            format: 'A4',
            path: 'views/myResume.pdf',
            margin:{
                top:80,
                bottom:80,
                left:50,
                right:50
            }
        });
        await browser.close();
    }
    static dateUtil(date) {
        const nowDate = new Date().getTime();
        const da = new Date(date).getTime();
        const hou = Math.floor((nowDate - da) / (3600 * 24 * 1000));
        return Math.ceil(hou / 365);
      }
}
module.exports = {
    PDF
}