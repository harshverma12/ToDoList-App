class UI {
  // DisplayTask
  displayTask(task) {
    const displayTask = document.querySelector("#output");
    let mydiv = document.createElement("div");
    mydiv.className = "display";
    mydiv.innerHTML = `<div class="display-items">
    <h4>${task}</h4>
    <i class="fa fa-trash"></i>`;
    displayTask.appendChild(mydiv);
  }
  // Ui Validation
  validation(msg, cls) {
    let validate = document.querySelector("#validate");

    let mydiv = document.createElement("div");
    mydiv.innerHTML = `<section class="validation ${cls}">
     <h4>${msg}</h4>
      </section>`;
    validate.appendChild(mydiv);
    setTimeout(function (e) {
      mydiv.remove();
    }, 1000);
  }
}
// LocalStorage
// ========================================

class Storage {
  static getTask() {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    return tasks;
  }
  static addTask(task) {
    const tasks = Storage.getTask();
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  static displayTask() {
    const tasks = Storage.getTask();
    const ui = new UI();
    tasks.forEach(function (e) {
      ui.displayTask(e);
    });
  }

  static removeTask(task) {
    const tasks = Storage.getTask();
    tasks.forEach(function (e, index) {
      if (task === e) {
        tasks.splice(index, 1);
      }
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
}
Storage.displayTask();
document.querySelector("form").addEventListener("submit", function (e) {
  let task = document.querySelector("#task").value;

  // Create object of UI Class
  const ui = new UI();

  if (task === "") {
    ui.validation("Please, Enter Your Task Below.....", "validation-reject");
  } else {
    // Display task to screen
    ui.displayTask(task);

    // Add local Storage
    Storage.addTask(task);

    // Validation
    ui.validation("Your Task is Added Successfully.....", "validation-success");

    //clear the input field
    document.querySelector("#task").value = "";
  }
  e.preventDefault();
});

//Remove from storage

document.querySelector("#output").addEventListener("click", function (e) {
  if (e.target.className === "fa fa-trash") {
    e.target.parentElement.remove();
    Storage.removeTask(e.target.previousElementSibling.textContent);
    const ui = new UI();
    ui.validation("Delete Task Successfully", "validation-success");
  }

  e.preventDefault();
});

document.querySelector(".clear-task").addEventListener("click", function (e) {
  document.querySelector(".display").parentElement.remove();
  const ui = new UI();
  ui.validation("Delete All Task Successfully", "validation-success");
  localStorage.clear();
  setTimeout(function () {
    location.reload();
  }, 1000);
});
