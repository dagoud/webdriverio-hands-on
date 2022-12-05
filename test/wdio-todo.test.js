

describe('My Vue.js Example Application', () => {
    it('should be able to add and complete ToDos', async () => {
      
        await browser.url('http://todomvc.com/examples/vue/')
    
        const todoInput = await $('.new-todo')  

        await browser.elementSendKeys(todoInput['element-6066-11e4-a52e-4f735466cecf'], 'Bring in bins\uE007Hang out washing\uE007Feed Chia\uE007')
        const todoCheckbox = await $$('li.todo input[type="checkbox"]')
    
        await browser.elementClick(todoCheckbox[1]['element-6066-11e4-a52e-4f735466cecf'])
    
        await expect(todoCheckbox[1]).toBeSelected();

        const todoItemsLeft = todoCheckbox.length - 1;    
        await expect(todoItemsLeft).toEqual(2);

    })  
})