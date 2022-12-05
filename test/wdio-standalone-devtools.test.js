const { remote } = require('webdriverio')

let browser;

(async () => {
    browser = await remote({
      automationProtocol: 'devtools',
      capabilities: {
        browserName: 'chrome',
      }
    })
    
    await browser.navigateTo('http://todomvc.com/examples/vue/')
    
    // Chapter 2 - Extra 2
    /**
     * run Puppeteer code
     */
    await browser.call(async () => {
      const puppeteer = await browser.getPuppeteer()
      const page = (await puppeteer.pages())[0]
            
      await page.evaluate(() => {
        localStorage.setItem('todos-vuejs', `[{
                "id": 1,
                "title": "Foo",
                "completed": false
              }, {
                "id": 2,
                "title": "Bar",
                "completed": false
              }, {
                "id": 3,
                "title": "Loo",
                "completed": false
              }]`);
        });
    })
    
    await browser.navigateTo('http://todomvc.com/examples/vue/')
    
    const todoCheckbox = await browser.findElements('css selector', 'li.todo input[type="checkbox"]')
    const todoCheckboxLabel = await browser.findElements('css selector', 'li.todo label')

    await browser.elementClick(todoCheckbox[1]['element-6066-11e4-a52e-4f735466cecf'])

    const label = await browser.getElementText(todoCheckboxLabel[1]['element-6066-11e4-a52e-4f735466cecf'])
    const isClicked = await browser.isElementSelected(todoCheckbox[1]['element-6066-11e4-a52e-4f735466cecf'])
    const todoItemsLeft = todoCheckbox.length - 1;

    console.log(`todo item ${label} is clicked === ${isClicked}`)
    console.log(`todo items left === ${todoItemsLeft}`)

    await browser.deleteSession()

})().catch(async (e) => {
  console.error(e)

  // close browser if something in our code went wrong
  await browser.deleteSession()
});