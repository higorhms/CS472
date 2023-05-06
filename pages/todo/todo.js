
const taskList = document.getElementById('task-list');
const taskBox = document.getElementById('task-box');

let savedTasks = [];

const loadData = () => {
  savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  taskList.textContent = savedTasks.join("\n");
};

loadData();

const addTask = () => {
  const task = taskBox.value;

  if (task) {
    savedTasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(savedTasks));
  }

  taskBox.value = ''
  loadData();
};

const clearData = () => {
  taskList.textContent = '';
  taskBox.value = '';
  localStorage.removeItem('tasks');
  savedTasks = [];
}