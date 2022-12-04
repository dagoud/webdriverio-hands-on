const { remote } = require('webdriverio')

let client;

(async () => {
    client = await remote({
    capabilities: {
      browserName: 'chrome'
    }
  })

  await client.navigateTo('http://todomvc.com/examples/vue/')

  const todoInput = await client.findElement('css selector', '.new-todo')  
  
  await client.elementSendKeys(todoInput['element-6066-11e4-a52e-4f735466cecf'], 'WebDriver')
  await client.keys('Enter')
  await client.elementSendKeys(todoInput['element-6066-11e4-a52e-4f735466cecf'], 'WebDriverIO')
  await client.keys('Enter')
  await client.elementSendKeys(todoInput['element-6066-11e4-a52e-4f735466cecf'], 'feed chia')
  await client.keys('Enter')
  
  const todoCheckbox = await client.findElements('css selector', 'li.todo input[type="checkbox"]')
  await client.elementClick(todoCheckbox[1]['element-6066-11e4-a52e-4f735466cecf'])

  console.log(await client.getTitle()) // outputs "Vue.js • TodoMVC"

  await client.deleteSession()

})().catch(async (e) => {
  console.error(e)

  // close browser if something in our code went wrong
  await client.deleteSession()
});