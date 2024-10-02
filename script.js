const inputBox = document.getElementById('inputBox');
const addBtn = document.getElementById('addBtn');
const toDoList = document.getElementById('toDoList');
const inputDate = document.getElementById('setDate');

const addToDo = () => {
  const inputText = inputBox.value.trim();
  const setDate = inputDate.value;

  if (inputText.length <= 0) {
    alert('Please enter a task');
    return false;
  }

  if (addBtn.value === "Save") {
    editTask.querySelector('p').innerHTML = inputText;
    editTask.querySelector('da').innerHTML = setDate;

    const tasks = JSON.parse(localStorage.getItem("task"));
    const taskIndex = Array.from(toDoList.children).indexOf(editTask);
    tasks[taskIndex] = { date: setDate, text: inputText };
    localStorage.setItem("task", JSON.stringify(tasks));

    addBtn.value = "Add";
    inputBox.value = "";
    inputDate.value = ""; 
  } else {

    const li = document.createElement("li");
    const da = document.createElement("da");
    const p = document.createElement("p");

    da.innerHTML = `${setDate}`;
    p.innerHTML = `${inputText}`;
    li.appendChild(da);
    li.appendChild(p);

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.classList.add("btn", "deleteBtn");
    li.appendChild(deleteBtn);

    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.classList.add("btn", "editBtn");
    li.appendChild(editBtn);

    toDoList.appendChild(li);
    saveList(inputText, setDate);
    inputBox.value = "";
    inputDate.value = "";
  }
};
const modifyList = (event) => {
  if (event.target.innerHTML === "Delete") {
    toDoList.removeChild(event.target.parentElement);
    deleteList(event.target.parentElement);
  }

  if (event.target.innerHTML === "Edit") {
    const taskItem = event.target.parentElement;
    const existingText = taskItem.querySelector('p').innerHTML;
    const existingDate = taskItem.querySelector('da').innerHTML;
    // console.log(existingDate);
    // console.log(existingText);
    inputBox.value = existingText;
    inputDate.value = existingDate; 
    
    inputBox.focus();
    addBtn.value = "Save";
    editTask = taskItem; 
  }
};
const saveList = (task, setDate) => {
  let tasks = [];
  // console.log(localStorage.getItem("task"));
  // console.log(JSON.parse(localStorage.getItem("task")));

  if(localStorage.getItem("task") === null){
    tasks = [];
  }
  else{
    tasks = JSON.parse(localStorage.getItem("task"));
  }
  const taskObject = { date: setDate, text: task }; 
  tasks.push(taskObject);
  // console.log(tasks);
  localStorage.setItem("task", JSON.stringify(tasks));
} 
const getSavedList = () =>{
  let tasks;
  if(localStorage.getItem("task") === null){
    tasks = [];
  }
  else{
    tasks = JSON.parse(localStorage.getItem("task"));

    toDoList.innerHTML = '';
    tasks.forEach(task => {
      const li = document.createElement("li");
      const p = document.createElement("p");
     const da = document.createElement("da");
      
      da.innerHTML = `${task.date}`;
      p.innerHTML = `${task.text}`; 
      li.appendChild(da);
      li.appendChild(p);

      const deleteBtn = document.createElement("button");
      deleteBtn.innerText = "Delete";
      deleteBtn.classList.add("btn", "deleteBtn");
      li.appendChild(deleteBtn);

      const editBtn = document.createElement("button");
      editBtn.innerText = "Edit";
      editBtn.classList.add("btn", "editBtn");
      li.appendChild(editBtn);

      toDoList.appendChild(li);
    });
  }
}
const deleteList = (task) => {
  let tasks;
  if(localStorage.getItem("task") === null){
    tasks = [];
  }
  else {
    tasks = JSON.parse(localStorage.getItem("task"));
  }

  let taskText = task.children[0].innerHTML;
  // console.log(taskText);
  let taskIndex = tasks.indexOf(taskText);
  // console.log(taskIndex);
  tasks.splice(taskIndex, 1);
  localStorage.setItem("task", JSON.stringify(tasks));
}
const editSavedList = (task) => {
  let tasks = JSON.parse(localStorage.getItem("task"));
  let taskIndex = tasks.findIndex(t => t.key === task.key && t.value === task.value);
  tasks[taskIndex] = task;
  localStorage.setItem('task', JSON.stringify(tasks));
  // console.log(task);
  // console.log(taskIndex);
}
document.addEventListener('DOMContentLoaded', getSavedList);
addBtn.addEventListener('click', addToDo);
toDoList.addEventListener('click', modifyList);
//hakdokkkkkk
