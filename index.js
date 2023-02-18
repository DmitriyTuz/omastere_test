const puppeteer = require('puppeteer-extra');
const { executablePath } = require('puppeteer');
const stealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(stealthPlugin());

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        executablePath: executablePath()
    });
    const page = await browser.newPage();
    await page.goto('https://dev.amidstyle.com');

    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'testresult.png', fullPage: true })

    const dataBlock = await page.evaluate(() => {
        return document.getElementById('data').innerHTML;
    });

    const res = JSON.parse(dataBlock);
    console.log('sign: ', res.sign);

    await browser.close()
})();