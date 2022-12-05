const { remote } = require('webdriverio')

let client;

(async () => {
    client = await remote({
    capabilities: {
      browserName: 'chrome',
      'goog:chromeOptions': {
        args: ['headless', 'disable-gpu']
      }
    },
    // uncomment if want to connect using chromedriver - default uses puppeteer
    // port: 9515
  })

  await client.navigateTo('http://todomvc.com/examples/vue/')

  const todoInput = await client.findElement('css selector', '.new-todo')  
  await client.elementSendKeys(todoInput['element-6066-11e4-a52e-4f735466cecf'], 'Bring in bins\uE007Hang out washing\uE007Feed Chia\uE007')

  const todoCheckbox = await client.findElements('css selector', 'li.todo input[type="checkbox"]')
  const todoCheckboxLabel = await client.findElements('css selector', 'li.todo label')
  await client.elementClick(todoCheckbox[1]['element-6066-11e4-a52e-4f735466cecf'])

  const label = await client.getElementText(todoCheckboxLabel[1]['element-6066-11e4-a52e-4f735466cecf'])
  const isClicked = await client.isElementSelected(todoCheckbox[1]['element-6066-11e4-a52e-4f735466cecf'])

  const todoItemsLeft = todoCheckbox.length - 1;

  console.log(`todo item ${label} is clicked === ${isClicked}`)
  console.log(`todo items left === ${todoItemsLeft}`)

  await client.deleteSession()

})().catch(async (e) => {
  console.error(e)

  // close browser if something in our code went wrong
  await client.deleteSession()
});