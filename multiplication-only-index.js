/*index.js
This is the main program that opens a browser, navigates to the Math Facts Pro login screen, enters the login details,
waits for the countdown, grabs the question, strips whitespace and the equal sign, splits the left and right digits,
converts it to a number, calculates it, and types the answer.
 */
const useRandom = false;
const answerDelay = 1950;
const puppeteer = require("puppeteer");

function delay(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}
var i;
for (i = 0; i < 2; i++) {
  (async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto("https://mathfactspro.com/games/login", {
      waitUntil: "networkidle2"
    });

    console.log("New Page URL:", page.url());
    await page.type("input[name=teacher]", "teacher code");
    await page.type("input[name=name]", "usename");
    await page.type("input[name=password]", "password");
    await page.click("button[type=submit]");
    await page.waitForNavigation();
    await delay(4000);
    const random = Math.floor(Math.random() * (50 - 1 + 1)) + 1;
    console.log(random);
    for (var i = 0; (j = 50), i < j; i++) {
      const question = await page.evaluate(
        () => document.querySelector(".question").textContent
      );

        var result = question
          .replace(/\s+/g, "")
          .replace("=", "")
          .split("×");
        let x = result[0];
        let y = result[1];

        let answer = Number(x) * Number(y);
        console.log(`${question} ; ${x} ; ${y} ; ${answer}`);
        await page.keyboard.type(answer.toString());
        await delay(answerDelay);
      } 
    
    await delay(60000);
    browser.close();
  })();
}
