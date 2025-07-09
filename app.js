const taskInput = document.getElementById("taskInput");
const taskList = document.querySelector(".task-list");
const newTaskButton = document.getElementById("newTask");
const numbersDisplay = document.getElementById("numbers");
const progressBar = document.getElementById("progress");

let tasks = [];

function updateProgress() {
  const total = tasks.length;
  const completed = tasks.filter(task => task.completed).length;
  const progressPercent = total === 0 ? 0 : (completed / total) * 100;

  numbersDisplay.textContent = `${completed}/${total}`;
  progressBar.style.width = `${progressPercent}%`;
}

// Add Task
newTaskButton.addEventListener("click", function (e) {
  e.preventDefault();
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const taskObj = {
    id: Date.now(),
    text: taskText,
    completed: false
  };

  tasks.push(taskObj);
  taskInput.value = "";
  renderTasks();
  updateProgress();
});

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.classList.add("taskItem");

    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");
    if (task.completed) taskDiv.classList.add("completed");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => {
      task.completed = !task.completed;
      renderTasks();
      updateProgress();
    });

    const taskText = document.createElement("span");
    taskText.textContent = task.text;
    taskText.setAttribute("contenteditable", "false");
    taskText.style.outline = "none";

    const editIcon = document.createElement("span");
    editIcon.textContent = "✏️";
    editIcon.style.cursor = "pointer";
    editIcon.addEventListener("click", () => {
      taskText.setAttribute("contenteditable", "true");
      taskText.textContent = ""; // Clear old text
      taskText.focus();

      // Cursor at end
      const range = document.createRange();
      const sel = window.getSelection();
      range.selectNodeContents(taskText);
      range.collapse(false);
      sel.removeAllRanges();
      sel.addRange(range);

      const save = () => {
        const updated = taskText.textContent.trim();
        if (updated !== "") {
          task.text = updated;
        }
        taskText.setAttribute("contenteditable", "false");
        renderTasks();
      };

      taskText.addEventListener("blur", save, { once: true });

      taskText.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          save();
        }
      });
    });

    const deleteIcon = document.createElement("span");
    deleteIcon.textContent = "🗑️";
    deleteIcon.style.cursor = "pointer";
    deleteIcon.addEventListener("click", () => {
      tasks = tasks.filter(t => t.id !== task.id);
      renderTasks();
      updateProgress();
    });

    const actionsDiv = document.createElement("div");
    actionsDiv.classList.add("icons");
    actionsDiv.appendChild(editIcon);
    actionsDiv.appendChild(deleteIcon);

    taskDiv.appendChild(checkbox);
    taskDiv.appendChild(taskText);
    li.appendChild(taskDiv);
    li.appendChild(actionsDiv);
    taskList.appendChild(li);
  });

  updateProgress();
}
