const { remote } = require('webdriverio')

let browser;

(async () => {
    browser = await remote({
      capabilities: {
        browserName: 'chrome',
      // 'goog:chromeOptions': {
        // args: ['headless', 'disable-gpu']
        // }
        // browserName: "Safari"
      },
      // uncomment if want to connect using chromedriver - default uses puppeteer
      // port: 9515
    })
    

    await browser.navigateTo('http://todomvc.com/examples/vue/')
    
    const todoInput = await browser.findElement('css selector', '.new-todo')  
    await browser.elementSendKeys(todoInput['element-6066-11e4-a52e-4f735466cecf'], 'Bring in bins\uE007Hang out washing\uE007Feed Chia\uE007')
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