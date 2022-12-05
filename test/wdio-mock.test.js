

describe('TODO Heroku Example Application with mocks', () => {
    it('should demonstrate response overwrite with static data', async () => {
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
    
        await browser.url('https://todobackend.com/client/index.html?https://todo-backend-express-knex.herokuapp.com/')
    

        await $('#todo-list li').waitForExist()
        const todoList = await $$('#todo-list li');
        console.log('todo list === ', await Promise.all(await todoList.map(async el => await el.getText())))
        // outputs: "[ 'Injected (non) completed Todo', 'Injected completed Todo' ]"
        await expect(todoList[0]).toHaveText('Injected (non) completed Todo')
        await expect(todoList[1]).toHaveText('Injected completed Todo')
        
        const todoCount = await $('#todo-count')
        await expect(todoCount).toHaveText('1 item left');
    })
  })