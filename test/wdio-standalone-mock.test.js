const { remote } = require('webdriverio')

let browser;

(async () => {
    browser = await remote({
      automationProtocol: 'devtools',
      capabilities: {
        browserName: 'chrome',
        "goog:chromeOptions": {
            acceptInsecureCerts: true
          }
      }
    })
    
    // await browser.navigateTo('https://www.todobackend.com/client/index.html?https://todo-backend-node-koa.herokuapp.com/todos')
    
    // Chapter 2 - Extra 2
    /**
     * run Puppeteer code
     */
    // await browser.call(async () => {
    //   const puppeteer = await browser.getPuppeteer()
    //   const page = (await puppeteer.pages())[0]
            
    //   await page.evaluate(() => {
    //     localStorage.setItem('todos-vuejs', `[{
    //             "id": 1,
    //             "title": "Foo",
    //             "completed": false
    //           }, {
    //             "id": 2,
    //             "title": "Bar",
    //             "completed": false
    //           }, {
    //             "id": 3,
    //             "title": "Loo",
    //             "completed": false
    //           }]`);
    //     });
    // })

    // const mock = await browser.mock('https://todo-backend-express-knex.herokuapp.com/')

    const todoMock = await browser.mock('https://todo-backend-express-knex.herokuapp.com' + '/todos', {
        method: 'get'
    })

    await todoMock.respond([{
                    "id": 1,
                    "title": "Foo",
                    "completed": false
                  }, {
                    "id": 2,
                    "title": "Bar",
                    "completed": true
                  }, {
                    "id": 3,
                    "title": "Loo",
                    "completed": false
                  }])
    
                  
    await browser.navigateTo('https://todobackend.com/client/index.html?https://todo-backend-express-knex.herokuapp.com/')
    
    // const todoInput = await browser.findElement('css selector', '#new-todo')
    // await browser.elementSendKeys(todoInput['element-6066-11e4-a52e-4f735466cecf'], 'Bring in bins\uE007Hang out washing\uE007Feed Chia\uE007')
    
    const todoList = await browser.findElements('css selector', '#todo-list li label')
    await browser.debug()
    console.log(await todoList.map(async el => await browser.getElementText(el['element-6066-11e4-a52e-4f735466cecf'])))

    await browser.debug()
    const todoCheckbox = await browser.findElements('css selector', '#todo-list li input[type="checkbox"]')
    
    await browser.elementClick(todoCheckbox[1]['element-6066-11e4-a52e-4f735466cecf'])
    

    const todoCount = await browser.findElement('css selector', '#todo-count')
    const todoItemsLeft = await browser.getElementText(todoCount['element-6066-11e4-a52e-4f735466cecf']);

    console.log(`todo items left === ${todoItemsLeft}`)

    await browser.deleteSession()

})().catch(async (e) => {
  console.error(e)

  // close browser if something in our code went wrong
  await browser.deleteSession()
});