const { remote } = require('webdriverio')

let browser;

(async () => {
    browser = await remote({
      automationProtocol: 'devtools',
      capabilities: {
        browserName: 'chrome',
        acceptInsecureCerts: true,
        "goog:chromeOptions": {
            "args": ["disable-gpu", "--disable-web-security"]
          }
      }
    })
    
    // Chapter 2 - Extra 3
    const mock = await browser.mock('https://todo-backend-express-knex.herokuapp.com/', {
            method: 'get'
        })
    
    mock.respond([{
        title: 'Injected (non) completed Todo',
        order: null,
        completed: false
    }, {
        title: 'Injected completed Todo',
        order: null,
        completed: true
    }], {
        statusCode: 200,
        fetchResponse: true // default
    })
                  
    await browser.navigateTo('https://todobackend.com/client/index.html?https://todo-backend-express-knex.herokuapp.com/')

    await browser.pause(3000)
    const todoList = await browser.findElements('css selector', '#todo-list li')
    console.log('todo list === ', await Promise.all(await todoList.map(async el => await browser.getElementText(el['element-6066-11e4-a52e-4f735466cecf']))))

    const todoCount = await browser.findElement('css selector', '#todo-count')
    const todoItemsLeft = await browser.getElementText(todoCount['element-6066-11e4-a52e-4f735466cecf']);

    console.log(`todo items left === ${todoItemsLeft}`)

    await browser.deleteSession()

})().catch(async (e) => {
  console.error(e)

  // close browser if something in our code went wrong
  await browser.deleteSession()
});