const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const taskCount = document.getElementById("count");
const completedButton = document.getElementById("completed");
const uncompletedButton = document.getElementById("uncompleted");

function addTask() {
  if (inputBox.value === "") {
    alert("You must write something!");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
  }
  inputBox.value = "";
  updateTaskCount();
  saveData();
}

listContainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName == "LI") {
      e.target.classList.toggle("checked");
      updateTaskCount();
      saveData();
    } else if (e.target.tagName == "SPAN") {
      e.target.parentElement.remove();
      updateTaskCount();
      saveData();
    }
  },
  false
);

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
  listContainer.innerHTML = localStorage.getItem("data");
  updateTaskCount();
}

function updateTaskCount() {
  const tasks = listContainer.getElementsByTagName("li").length;
  taskCount.textContent = tasks;
}

function clearAllTasks() {
  listContainer.innerHTML = "";
  updateTaskCount();
  saveData();
}

function clearCompleted() {
  const completedTasks = listContainer.getElementsByClassName("checked");
  while (completedTasks.length > 0) {
    completedTasks[0].remove();
  }
  updateTaskCount();
  saveData();
}

completedButton.addEventListener("click", function() {
    const taskItems = listContainer.getElementsByTagName("li");
    for (let i = 0; i < taskItems.length; i++) {
      taskItems[i].classList.add("checked");
    }
    updateTaskCount();
    saveData();
});

uncompletedButton.addEventListener("click", function() {
    const taskItems = listContainer.getElementsByTagName("li");
    for (let i = 0; i < taskItems.length; i++) {
      taskItems[i].classList.remove("checked");
    }
    updateTaskCount();
    saveData();
});


showTask();
