// Render repeat image if the task is repetitive
const repeatitiveImage = (taskId) => {
    let repeatImg = document.createElement("img");
    repeatImg.setAttribute('id', `repetitiveImage-${taskId}`)
    repeatImg.setAttribute("src", "images/repeat.png");
    repeatImg.setAttribute("width", "30");
    repeatImg.setAttribute("height", "30");
    repeatImg.setAttribute("style", "margin-left:15px");
    return repeatImg
}

// Clear Input Boxes
const clearInput = () => {
  document.getElementById("title").value = "";
  document.getElementById("details").value = "";
  document.getElementById("date").value = "";
  document.getElementById("time").value = "";
  document.getElementById("repeat").checked = false;
};

// Render edit button for update task
const renderEditButton = () => {
  let editButton = document.createElement("button");
  let editImage = document.createElement("img");
  editImage.setAttribute("src", "images/edit.png");
  editImage.setAttribute("width", "20");
  editImage.setAttribute("height", "20");
  editImage.setAttribute("style", "margin-left:0px");
  editButton.setAttribute("style", "margin-left:10px");
  editButton.appendChild(editImage);
  return editButton;
};

// Delete Task
const deleteTask = (taskId, todoItem) => {
  fetch(`https://todo-nq8q.onrender.com/api/v1/tasks/${taskId}`, {
    method: "DELETE",
  }).then((response) => {
    if (response.ok) {
      todoItem.remove();
    }
  });
};

// Update Task
const updateTask = (taskId) => {
  let title = document.getElementById("title").value;
  let details = document.getElementById("details").value;
  let date = document.getElementById("date").value;
  let time = document.getElementById("time").value;
  let checkBox = document.getElementById("repeat");
  let repeat = false;

  // Check if the task is a repeated task
  if (checkBox.checked) {
    repeat = true;
  } else {
    repeat = false;
  }

  fetch(`https://todo-nq8q.onrender.com/api/v1/tasks/${taskId}`, {
    method: "PUT",
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
  })
  .then(() => {
    console.log(taskId)
    document.getElementById(`taskTitle-${taskId}`).textContent = title;
    document.getElementById(`taskDetails-${taskId}`).textContent = details;
    document.getElementById(
      `taskDateTime-${taskId}`
    ).textContent = `${date} at ${time}`;
    let updateTodoButton = document.getElementById('createTodo')
    updateTodoButton.textContent = "Add Task"
    
    
  })
  .then(clearInput())
};

// Get all todos when app loads
const getTodo = () => {
  fetch("https://todo-nq8q.onrender.com/api/v1/tasks", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      for (i = 0; i < data.length; i++) {
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
        let taskId = data[i].id;
        checkBoxInput.addEventListener("click", () =>
          deleteTask(taskId, todoItem)
        );

        // append checkbox before title
        checkBoxSpan.appendChild(checkBoxInput);
        todoLi.appendChild(checkBoxSpan);

        // Title for each task
        let titleSpan = document.createElement("span");
        titleSpan.setAttribute("id", "taskTitle");
        titleSpan.setAttribute("id", `taskTitle-${taskId}`);
        titleSpan.textContent = data[i].title;

        // Detail for each task
        let detailsPtag = document.createElement("p");
        detailsPtag.setAttribute("class", "taskDetails");
        detailsPtag.setAttribute("id", `taskDetails-${taskId}`);
        detailsPtag.textContent = data[i].details;

        // Date and time Span element
        let dateTimeSpan = document.createElement("span");
        dateTimeSpan.setAttribute("class", "taskDateTime");
        // Unique id for each date time
        dateTimeSpan.setAttribute("id", `taskDateTime-${taskId}`);
        dateTimeSpan.textContent = `${data[i].date} at ${data[i].time}`;

        // Render edit Button
        editButton = renderEditButton();

        //   Edit Button Event Listener
        let title = data[i].title;
        let details = data[i].details;
        let date = data[i].date;
        let time = data[i].time;
        let repeat = data[i].repeat;
        editButton.addEventListener("click", () => {
          document.getElementById("title").value = title;
          document.getElementById("details").value = details;
          document.getElementById("date").value = date;
          document.getElementById("time").value = time;
          document.getElementById("repeat").value = repeat;
          let updateTodoButton = document.getElementById("createTodo");

          updateTodoButton.setAttribute("onclick", `updateTask('${taskId}')`);
          updateTodoButton.innerHTML = "Update Todo";
         
        });

        // Render repeat image if the task is repetitive
        let repeatImg = repeatitiveImage(taskId);

        todoLi.appendChild(titleSpan);

        //   append edit button
        todoLi.appendChild(editButton);
        todoLi.appendChild(detailsPtag);
        todoLi.appendChild(dateTimeSpan);

        // If task is repetitive render image
        if (data[i].repeat) {
          todoLi.appendChild(repeatImg);
        }

        // appnended items on respective elements
        todoUl.appendChild(todoLi);
        todoItem.appendChild(todoUl);
        parentEl.appendChild(todoItem);
      }
    });
};
// Calling getTodo function to load all todos
getTodo();

const createTodo = () => {
  let title = document.getElementById("title").value;
  let details = document.getElementById("details").value;
  let date = document.getElementById("date").value;
  let time = document.getElementById("time").value;
  let checkBox = document.getElementById("repeat");
  let repeat = false;

  // Check if the task is a repeated task
  if (checkBox.checked) {
    repeat = true;
  } else {
    repeat = false;
  }

//   Create New Task
  fetch("https://todo-nq8q.onrender.com/api/v1/tasks", {
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
  })
    .then((response) => response.json())
    .then((data) => {
      let parentEl = document.getElementById("tasks");

      // Created todo Item to hold list of items
      let todoItem = document.createElement("div");
      todoItem.setAttribute("class", "todoItem");
      let todoUl = document.createElement("ul");
      let todoLi = document.createElement("li");
      let taskId = data.id;

      // attribute for todoLi
      todoLi.setAttribute("class", "singleTask");
      // Checkbox for each task
      let checkBoxSpan = document.createElement("span");
      let checkBoxInput = document.createElement("input");
      checkBoxInput.setAttribute("type", "checkbox");
      checkBoxInput.setAttribute('id', `taskRepeat-${taskId}`)

      // Delete Task
      checkBoxInput.addEventListener("click", () =>
        deleteTask(taskId, todoItem)
      );

      checkBoxSpan.appendChild(checkBoxInput);
      todoLi.appendChild(checkBoxSpan);

      // Title for each task
      let titleSpan = document.createElement("span");
      titleSpan.textContent = data.title;
      titleSpan.setAttribute("class", "title");
      let detailsPtag = document.createElement("p");
      detailsPtag.setAttribute("class", "details");
      detailsPtag.innerHTML = data.details;

      // Date and time Span element
      let dateTimeSpan = document.createElement("span");
      dateTimeSpan.setAttribute("class", "dateTime");
      dateTimeSpan.textContent = `${data.date} at ${data.time}`;

      // Render edit Button
      editButton = renderEditButton();

      //   Edit Button Event Listener
      editButton.addEventListener("onclick", () => {
        let title = data.title;
        let details = data.details;
        let date = data.date;
        let time = data.time;
        let repeat = data.repeat;
        document.getElementById("title").value = title;
        document.getElementById("details").value = details;
        document.getElementById("date").value = date;
        document.getElementById("time").value = time;
        document.getElementById("repeat").value = repeat;
        let updateTodoButton = document.getElementById("createTodo");

        updateTodoButton.setAttribute("onclick", `updateTask('${taskId}')`);
        updateTodoButton.innerHTML = "Update Todo";
        
      });

      // Render repeat image if the task is repetitive
      let repeatImg = repeatitiveImage();

      todoLi.appendChild(titleSpan);
      todoLi.appendChild(editButton)
      todoLi.appendChild(detailsPtag);
      todoLi.appendChild(dateTimeSpan);

      // If task is repetitive render image
      if (data.repeat) {
        todoLi.appendChild(repeatImg);
      }

      // appnended items on respective elements
      todoUl.appendChild(todoLi);
      todoItem.appendChild(todoUl);
      parentEl.appendChild(todoItem);
    })
    // clear all input field after submitting and updating the UI
    .then(clearInput());
};
