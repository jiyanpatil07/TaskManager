

const newTaskInput = document.getElementById("new-task-input");
const addTaskButton = document.getElementById("add-task-button");
const activeTasksList = document.getElementById("active-tasks");
const completedTasksList = document.getElementById("completed-tasks");


class Task {
    constructor(name) {
        this.name = name;
        this.completed = false;
    }
}


let tasks = [];

if (localStorage.getItem("tasks")) {
    tasks = JSON.parse(localStorage.getItem("tasks"));
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderActiveTasks() {
    activeTasksList.innerHTML = "";
    tasks.forEach((task, index) => {
        if (!task.completed) {
            const taskElement = document.createElement("li");
            taskElement.classList.add("task");
            const taskNameElement = document.createElement("span");
            taskNameElement.classList.add("task-name");
            taskNameElement.innerText = task.name;
            const deleteTaskButton = document.createElement("button");
            deleteTaskButton.classList.add("delete-task-button");
            deleteTaskButton.innerText = "Delete";
            deleteTaskButton.addEventListener("click", () => {
                deleteTask(index);
            });
            taskElement.appendChild(taskNameElement);
            taskElement.appendChild(deleteTaskButton);
            activeTasksList.appendChild(taskElement);
        }
    });
}

function renderCompletedTasks() {
    completedTasksList.innerHTML = "";
    tasks.forEach((task) => {
        if (task.completed) {
            const taskElement = document.createElement("li");
            taskElement.classList.add("completed-task");
            const taskNameElement = document.createElement("span");
            taskNameElement.classList.add("completed-task-name");
            taskNameElement.innerText = task.name;
            taskElement.appendChild(taskNameElement);
            completedTasksList.appendChild(taskElement);
        }
    });
}

function addTask() {
    const taskName = newTaskInput.value;
    if (taskName) {
        const task = new Task(taskName);
        tasks.push(task);
        saveTasks();
        newTaskInput.value = "";
        renderActiveTasks();
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderActiveTasks();
    renderCompletedTasks();
}

function completeTask(index) {
    tasks[index].completed = true;
    saveTasks();
    renderActiveTasks();
    renderCompletedTasks();
}

addTaskButton.addEventListener("click", addTask);
newTaskInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTask();
    }
});

renderActiveTasks();
renderCompletedTasks();

