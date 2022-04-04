const puppeteer = require('puppeteer')
const scrapeTarget = require('../config/Targets')

module.exports = async (cardName) => {
    
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
      await page.goto('https://www.mtggoldfish.com/prices/paper/standard');
  
      const element = await page.$x(cardName);
      const textObject = await element[0].getProperty('textContent');
      text = textObject._remoteObject.value;
      
      await browser.close();
    return text.slice(1,7)
      
 };

