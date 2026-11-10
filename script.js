let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
let input = document.getElementById("taskInput");
let taskName = input.value.trim();

if (taskName === "") {
    alert("Please enter a task!");
    return;
}

tasks.push({
    id: Date.now(),
    name: taskName,
    completed: false
});

input.value = "";

saveTasks();
displayTasks();

}

function toggleTask(id) {
tasks = tasks.map(task => {
if (task.id === id) {
task.completed = !task.completed;
}
return task;
});

saveTasks();
displayTasks();

}

function deleteTask(id) {
tasks = tasks.filter(task => task.id !== id);

saveTasks();
displayTasks();

}

function displayTasks() {
let taskList = document.getElementById("taskList");

taskList.innerHTML = "";

tasks.forEach(task => {
    let li = document.createElement("li");

    if (task.completed) {
        li.classList.add("completed");
    }

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.style.flex = "none";

    checkbox.addEventListener("change", () => {
        toggleTask(task.id);
    });

    let span = document.createElement("span");
    span.textContent = task.name;

    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-btn";

    deleteButton.addEventListener("click", () => {
        deleteTask(task.id);
    });

    li.append(checkbox, span, deleteButton);
    taskList.appendChild(li);
});

updateDashboard();

}

function updateDashboard() {
let total = tasks.length;

let completed = tasks.filter(
    task => task.completed
).length;

let pending = total - completed;

let percentage = total === 0
    ? 0
    : Math.round((completed / total) * 100);

document.getElementById("totalTasks").textContent = total;

document.getElementById("completedTasks").textContent = completed;

document.getElementById("pendingTasks").textContent = pending;

document.getElementById("progress").style.width =
    percentage + "%";

document.getElementById("progressText").textContent =
    percentage + "% Completed";

}

document.getElementById("taskInput").addEventListener("keypress", function(event) {
if (event.key === "Enter") {
addTask();
}
});

displayTasks();