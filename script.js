document.addEventListener("DOMContentLoaded", () => {
  console.log("Hello Grandma");
  let closeBtns = document.querySelectorAll(".close__btn");
  closeBtns.forEach((closeBtn) => {
    closeBtn.addEventListener("click", () => {
      let todoTask = closeBtn.closest(".todo__task");
      if (todoTask) {
        todoTask.remove();
      }
      updateTaskCounter();
    });
  });

  const newTodoInput = document.querySelector(".todo__new input[type='text']");
  const taskList = document.querySelector(".todo__tasks");
  newTodoInput.addEventListener("keypress", (event) => {
    if (event.key == "Enter") {
      const todoText = newTodoInput.value.trim();
      if (todoText != "") {
        const isDarkModeEnabled = document.body.classList.contains("darkmode");
        const newTask = createTaskElement(todoText, isDarkModeEnabled);
        taskList.appendChild(newTask);
        newTodoInput.value = "";
        updateTaskCounter();
      }
    }
  });

  //  Create a New Task
  function createTaskElement(taskText, isDarkModeEnabled) {
    const task = document.createElement("div");
    task.classList.add("todo__task");

    const label = document.createElement("label");
    label.classList.add("container");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = false;

    const checkmark = document.createElement("span");
    checkmark.classList.add("checkmark");

    const detail = document.createElement("p");
    detail.classList.add("todo__detail");
    detail.textContent = taskText;

    const closeButton = document.createElement("div");
    closeButton.classList.add("close__btn");
    closeButton.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M17.6777 0.707107L16.9706 0L8.83883 8.13173L0.707107 0L0 0.707107L8.13173 8.83883L0 16.9706L0.707106 17.6777L8.83883 9.54594L16.9706 17.6777L17.6777 16.9706L9.54594 8.83883L17.6777 0.707107Z" fill="#494C6B"/>
      </svg>
      `;

    checkbox.addEventListener("click", function () {
      if (this.checked) {
        detail.classList.add("todo__checked");
      } else {
        detail.classList.remove("todo__checked");
      }
    });
    // applies darkmode styles to new todos if user is in darkmode
    if (isDarkModeEnabled) {
      task.style.backgroundColor = "#25273D";
      task.style.color = "#C8CBE7";
      task.style.borderBottom = "1px solid #393a4b";

      let checkMarks = document.querySelectorAll(".checkmark");
      checkMarks.forEach((checkmark) => {
        checkmark.style.border = "1px solid #393a4b";
      });

      checkbox.addEventListener("click", function () {
        if (this.checked) {
          detail.classList.add("todo__checked--darkmode");
        } else {
          detail.classList.remove("todo__checked--darkmode");
        }
      });
      console;

      // let checkboxes = document.querySelectorAll("input[type=checkbox]");
      // checkboxes.forEach((checkbox) => {
      //   if (checkbox.classList.contains("todo__defaultchecked")) {
      //     checkbox.checked = "true";
      //     let secondTodoDetail = document.querySelectorAll(".todo__detail")[1];
      //     secondTodoDetail.classList.add("todo__checked--darkmode");
      //   }
      //   checkbox.addEventListener("click", function () {
      //     alert("hello");
      //   });
      // });
    }

    label.appendChild(checkbox);
    label.appendChild(checkmark);
    task.appendChild(label);
    task.appendChild(detail);
    task.appendChild(closeButton);
    closeButton.addEventListener("click", () => {
      task.remove();
      updateTaskCounter();
    });

    checkbox.addEventListener("change", updateTaskCounter);
    return task;
  }

  const inputs = document.querySelectorAll('input[type = "checkbox"]');
  const detail = document.querySelectorAll(".todo__detail");

  inputs.forEach(function (input, index) {
    input.addEventListener("click", function () {
      if (this.checked) {
        detail[index].classList.add("todo__checked");
      } else {
        detail[index].classList.remove("todo__checked");
      }
    });
  });

  function updateTaskCounter() {
    const allTasks = document.querySelectorAll(".todo__task:not(.todo__new )");
    let visibleTasks = [];

    allTasks.forEach((task) => {
      let checkbox = task.querySelector("input[type='checkbox']");
      if (!checkbox.checked) {
        visibleTasks.push(task);
      }
    });

    const taskCounter = document.querySelector(".task__counter");
    const tasksLeft = document.querySelector(".task__counterparent");

    if (taskCounter) {
      taskCounter.textContent = visibleTasks.length;
    }

    if (tasksLeft) {
      if (visibleTasks.length === 1) {
        tasksLeft.textContent = "1 item left";
      } else {
        tasksLeft.textContent = visibleTasks.length + " " + "items left";
      }
    }
  }

  function showCompletedTasks() {
    const todoCounter = document.querySelector(".task__counterparent");
    const allTasks = document.querySelectorAll(".todo__task:not(.todo__new)");
    allTasks.forEach((task) => {
      const checkboxInputs = document.querySelectorAll(
        'input[type = "checkbox"]'
      );
      checkboxInputs.forEach((checkbox) => {
        if (checkbox && !checkbox.checked) {
          todoCounter.textContent = "0 items Left";
        }
      });
    });
  }

  function showAllTasks() {
    const allTasks = document.querySelectorAll(".todo__task:not(.todo__new)");

    console.log(allTasks);
    allTasks.forEach((task) => {
      task.style.display = "";
      console.log(task);
    });
    updateTaskCounter();
  }

  let showAllTasksBtn = document.querySelector(".todo__all");
  showAllTasksBtn.addEventListener("click", function () {
    showAllTasks();
  });

  // Show Completed Tasks
  const completedTodosBtn = document.querySelector(".completed");
  let todoTasks = document.querySelectorAll(".todo__task:not(.todo__new)");
  todoTasks.forEach((todoTask) => {
    const checkbox = todoTask.querySelector('input[type="checkbox"]');
    completedTodosBtn.addEventListener("click", function () {
      showCompletedTasks();
      if (checkbox) {
        if (!checkbox.checked) {
          todoTask.style.display = "none";
        }
      }
      updateTaskCounter();
    });
  });

  const clearTasks = document.querySelector(".todo__clear");
  clearTasks.onclick = function () {
    const todoTasks = document.querySelectorAll(".todo__task");

    todoTasks.forEach((todoTask) => {
      const checkbox = todoTask.querySelector("input[type=checkbox]");
      if (checkbox.checked) {
        todoTask.remove();
      }
    });
  };

  // To make the first todo checked by default
  let checkboxes = document.querySelectorAll("input[type=checkbox]");
  checkboxes.forEach((checkbox) => {
    if (checkbox.classList.contains("todo__defaultchecked")) {
      checkbox.checked = "true";
      let secondTodoDetail = document.querySelectorAll(".todo__detail")[1];
      secondTodoDetail.classList.add("todo__checked");
    }
    checkbox.addEventListener("change", updateTaskCounter);
  });

  // Dark and Light Mode
  let lightIcon = document.getElementById("lightModeIcon");
  let darkIcon = document.getElementById("darkModeIcon");
  var body = document.body;
  let todoContainer = document.querySelector(".todo__container");
  let todoItems = document.querySelector(".todo__items");
  let checkMarks = document.querySelectorAll(".checkmark");
  let todoDetail = document.querySelector(".todo__detail");

  function toogleMode() {
    if (lightIcon.style.display == "none") {
      lightIcon.style.display = "block";
      darkIcon.style.display = "none";
      body.classList.remove("darkmode");
      todoContainer.classList.add("light__mode--bg");
      todoContainer.classList.remove("dark__mode--bg");

      checkMarks.forEach((checkmark) => {
        checkmark.style.border = "1px solid #e3e4f1";
      });
      let todoActionsMobile = document.querySelector(".todo__actions.mobile");
      todoActionsMobile.style.color = "#9495a5";
      todoActionsMobile.style.backgroundColor = "#FFFFFF";
      todoActionsMobile.style.boxShadow =
        " 0px 35px 50px -15px rgba(194, 195, 214, 0.5)";

      let todoTasks = document.querySelectorAll(".todo__task");
      todoTasks.forEach(function (Task) {
        Task.style.backgroundColor = "#FFFFFF";
        todoDetail.style.backgroundColor = "#FFFFFF";
        Task.style.borderBottom = " 2px solid #e3e4f1";
        todoItems.style.backgroundColor = "#FFFFFF";
        Task.style.color = "#494C6B";
        inputs.forEach(function (input, index) {
          if (input.checked) {
            detail[index].classList.remove("todo__checked--darkmode");
            detail[index].classList.add("todo__checked");
          }
        });
      });
    } else {
      lightIcon.style.display = "none";
      darkIcon.style.display = "block";
      body.classList.add("darkmode");
      todoContainer.classList.add("dark__mode--bg");
      todoContainer.classList.remove("light__mode--bg");
      todoDetail.style.color = "#C8CBE7";
      let todoTasksContainer = document.querySelector(".todo__tasks");
      let todoTasks = document.querySelectorAll(".todo__task");
      let todoActionsMobile = document.querySelector(".todo__actions.mobile");
      todoActionsMobile.style.color = "#C8CBE7";
      todoActionsMobile.style.backgroundColor = "#25273d";
      todoActionsMobile.style.boxShadow = "none";
      todoTasksContainer.style.boxShadow = "none";

      todoTasks.forEach(function (Task) {
        Task.style.backgroundColor = "#25273D";
        Task.style.color = "#C8CBE7";
        Task.style.borderBottom = " 2px solid #393A4B";
        todoDetail.style.backgroundColor = "#25273d";
        todoItems.style.backgroundColor = "#25273d";
        todoActionsMobile.style.boxShadow = "none";
      });

      inputs.forEach(function (input, index) {
        input.addEventListener("click", function () {
          if (this.checked) {
            detail[index].classList.add("todo__checked--darkmode");
          } else {
            detail[index].classList.remove("todo__checked--darkmode");
          }
        });
      });
    }
  }

  lightIcon.addEventListener("click", toogleMode);
  darkIcon.addEventListener("click", toogleMode);
});
