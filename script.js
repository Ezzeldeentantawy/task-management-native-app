const form = document.querySelector("form");
let task = document.querySelector("#task-input");
let all_tasks = [];
const taskContainer = document.querySelector(".tasks-container");
form.addEventListener("submit", function(e) {
    if(task.value === "") return;
    e.preventDefault();
    let id = crypto.randomUUID(); 
    let newTask = task.value;
    let status = false;

    all_tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    all_tasks.push({ id, newTask, status });
    localStorage.setItem("tasks", JSON.stringify(all_tasks));

    taskContainer.innerHTML = "";
    task.value = "";
    fetchTasks();
});
function fetchTasks(){
    all_tasks = JSON.parse(localStorage.getItem("tasks"));

    all_tasks.forEach(single_task => {
        // ============= make container for the task =========== //
        let newTask = document.createElement("div");
        newTask.classList.add("task");
        // ============= add check box to the container =========== //
        let checkBox = document.createElement("input");
        checkBox.setAttribute("type", "checkbox");
        checkBox.id = single_task.id;
        newTask.append(checkBox);
        // ============= add label linked with the check box =========== //
        let task_p = document.createElement("label");
        task_p.setAttribute("for", single_task.id)
        task_p.textContent = single_task.newTask;
        newTask.appendChild(task_p);
        // ============= add delete button =========== //
        let deleteBtn = document.createElement("button");
        deleteBtn.setAttribute("data-id", single_task.id);
        deleteBtn.classList.add("deleteBtn");
        deleteBtn.textContent = "delete";
        newTask.appendChild(deleteBtn);
        // ============= add the task to the container =========== //
        taskContainer.appendChild(newTask);
        // ============= delete logic =========== //
        checkBox.checked = single_task.status
        if(checkBox.checked === true){
            task_p.classList.add("checked")
        }
    })
}
taskContainer.addEventListener("click", function(e) {
    if(e.target.classList.contains("deleteBtn")){
        const id = e.target.dataset.id;
        all_tasks = all_tasks.filter(task => task.id !== id);
        localStorage.setItem("tasks", JSON.stringify(all_tasks));
        e.target.parentElement.remove();
    }
});
taskContainer.addEventListener("change", function(e) {
    if(e.target.type === "checkbox") {
        const id = e.target.id;
        const task = all_tasks.find(t => t.id === id);
        if(task){
            task.status = e.target.checked;
            localStorage.setItem("tasks", JSON.stringify(all_tasks));
            const label = e.target.nextElementSibling;
            if(task.status) label.classList.add("checked");
            else label.classList.remove("checked");
        }
    }
});
fetchTasks();
