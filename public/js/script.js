// Get all todos when app loads
const getTodo = () => {
    fetch('http://localhost:3000/api/v1/tasks', {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        for(i=0; i<data.length; i++) {
            let parentEl = document.getElementById("tasks");

            // Created todo Item to hold list of items
            let todoItem = document.createElement("div");
            
            let todoUl = document.createElement("ul");
            let todoLi = document.createElement("li");
            todoLi.setAttribute("class", "singleTask");
            
            // Checkbox for each task
            let checkBoxSpan = document.createElement("span");
            let checkBoxInput = document.createElement("input");
            checkBoxInput.setAttribute("type", "checkbox");
            
            // Delete event listener
            let taskId = data[i].id
            checkBoxInput.addEventListener("click", () => {
                
                fetch(`http://localhost:3000/api/v1/tasks/${taskId}`, {
                    method: 'DELETE'
                })
                .then(response => {
                    if(response.ok) {
                        todoItem.remove()
                    }
                })
            })
            

            checkBoxSpan.appendChild(checkBoxInput);
            todoLi.appendChild(checkBoxSpan);

            // Title for each task
            let titleSpan = document.createElement("span");
            titleSpan.setAttribute('class', "title")
            let detailsPtag = document.createElement('p')
            detailsPtag.setAttribute('class', "details")
            detailsPtag.innerHTML = data[i].details
            
            titleSpan.textContent = data[i].title;
            todoLi.appendChild(titleSpan);
            todoLi.appendChild(detailsPtag)

            // appnended items on respective elements
            todoUl.appendChild(todoLi);
            todoItem.appendChild(todoUl);
            parentEl.appendChild(todoItem);

        }
    })

}
// Calling getTodo function to load all todos
getTodo()

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
      let parentEl = document.getElementById("tasks");

      // Created todo Item to hold list of items
      let todoItem = document.createElement("div");
      todoItem.setAttribute("class", "todoItem");
      let todoUl = document.createElement("ul");
      let todoLi = document.createElement("li");

      // attribute for todoLi
      todoLi.setAttribute("class", "singleTask");
      // Checkbox for each task
      let checkBoxSpan = document.createElement("span");
      let checkBoxInput = document.createElement("input");
      checkBoxInput.setAttribute("type", "checkbox");

      // Delete event listener
      let taskId = data.id;
      checkBoxInput.addEventListener("click", () => {
        fetch(`http://localhost:3000/api/v1/tasks/${taskId}`, {
          method: "DELETE",
        }).then((response) => {
          if (response.ok) {
            todoItem.remove();
          }
        });
      });

      checkBoxSpan.appendChild(checkBoxInput);
      todoLi.appendChild(checkBoxSpan);

      // Title for each task
      let titleSpan = document.createElement("span");
      titleSpan.textContent = data.title;
      titleSpan.setAttribute("class", "title");
      let detailsPtag = document.createElement("p");
      detailsPtag.setAttribute("class", "details");
      detailsPtag.innerHTML = data.details;

      todoLi.appendChild(titleSpan);
      todoLi.appendChild(detailsPtag);

      // appnended items on respective elements
      todoUl.appendChild(todoLi);
      todoItem.appendChild(todoUl);
      parentEl.appendChild(todoItem);
    })
}