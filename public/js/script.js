const createTodo = () => {
    let title = document.getElementById('title').value
    let details = document.getElementById('details').value
    let date = document.getElementById('date').value
    let time = document.getElementById('time').value
    let checkBox = document.getElementById('repeat')
    let repeat = false

    // Check if the task is a repeated task
    if (checkBox.checked) {
        repeat = true
    }else {
        repeat = false
    }
    console.log(title)
    
    fetch("http://localhost:3000/api/v1/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        details: details,
        date: date,
        time: time,
        repeat: repeat,
      }),
    }).then(response => response.json())
    .then(data => {
        let parentEl = document.getElementById('tasks')

        // Created todo Item to hold list of items
        let todoItem = document.createElement('div')
        let todoUl = document.createElement('ul')
        let todoLi = document.createElement('li')
        
        // Checkbox for each task
        let checkBoxSpan = document.createElement('span')
        let checkBoxInput = document.createElement('input')
        checkBoxInput.setAttribute("type", "checkbox")
        checkBoxSpan.appendChild(checkBoxInput)
        todoLi.appendChild(checkBoxSpan)
        
        // Title for each task
        let titleSpan = document.createElement('span')
        titleSpan.textContent = data.title
        todoLi.appendChild(titleSpan)

        // appnended items on respective elements
        todoUl.appendChild(todoLi)
        todoItem.appendChild(todoUl)
        parentEl.appendChild(todoItem)

    })
}