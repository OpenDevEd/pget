const puppeteer = require('puppeteer');
const { Command } = require('commander');

const program = new Command();
program.version('0.0.1');

program
  .option('-d, --debug', 'debug')
  .option('--quiet', 'do not print output to command line')
  .option('--headless', 'default is false')
  .option('-O, --output [file]', 'save full output to file; default: output.json', 'output.json')
  .option('-s, --screenshot [file]', '...')
  .option('-w, --waituntil [file]', '...')
  // .action(async () => {
  //  ...
  // });

  const myArgs = process.argv.slice(2);

(async () => {

  const browser = await puppeteer.launch({
    devtools: false,
    defaultViewport: {
      width: 2000,
      height: 2000,
    },
    headless: true,
  });

  // foreach myArgs
  const page = await browser.newPage();

  console.time("goto");
  await page
    .goto(myArgs[0], {
      waitUntil: "networkidle0",
      //      waitUntil: "domcontentloaded",
    })
    .catch((err) => console.log("error loading url", err));
  console.timeEnd("goto");

  if (screenshot) {
    // await page.screenshot({ path: `twitter-domcontentloaded.png` });
  }
  
  if (save) {
    const html = await page.content();
    console.log(html);
  };
  await browser.close();

})()


