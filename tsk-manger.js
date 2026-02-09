const taskForm = document.getElementById("taskForm");
const taskInput= document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const searchInput = document.getElementById("searchInput");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
// save to local storage 

function saveTasks()  {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
// render tasks 

function renderTasks(filteredTasks = tasks) {
    taskList.innerHTML = "";

    filteredTasks.forEach((task,index) => {
        const li = document.createElement("li");

        li.innerHTML = `
        <span>${task}</span>
        <div>
        <button onclick = "editTask(${index})">Edit</button>
        <button onclick = "deleteTask(${index})">Delete</button>
        </div>
        `;
        taskList.appendChild(li);
    });
}
// Add task + validation 
taskForm.addEventListener("submit", function (e) {
    e.preventDefault();

    if(taskInput.value.trim() === "") {
        alert("Task cannot be empty");
        return;
    }
    tasks.push(taskInput.value.trim());
    saveTasks();
    renderTasks();
    taskInput.value = "";
});
// Delete
function deleteTask(index) {
    tasks.splice(index, 1) ;
    saveTasks();
    renderTasks();
}

// edit task 
function editTask(index) {
    const updatedTask = prompt("Edit task" , tasks[index]);
    if (updatedTask && updatedTask.trim() !== "") {
        tasks[index] = updatedTask.trim();
        saveTasks();
        renderTasks();
    }
}
//search / filter

searchInput.addEventListener("input",function () {
    const keyword = searchInput.value.toLowerCase();
    
    const filtered = tasks.filter(task =>
        task.toLowerCase().includes(keyword)
    );
    renderTasks(filtered);
});

// load task on refresh
renderTasks();