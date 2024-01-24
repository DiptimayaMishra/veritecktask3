const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const task = taskInput.value.trim();
  if (task) {
    tasks.push({ name: task, completed: false });
    taskInput.value = '';
    saveTasks();
    renderTasks();
  }
});

taskList.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    const index = e.target.dataset.index;
    if (e.target.classList.contains('edit-btn')) {
      const newName = prompt('Enter a new name for the task');
      if (newName) {
        tasks[index].name = newName;
        saveTasks();
        renderTasks();
      }
    } else if (e.target.classList.contains('delete-btn')) {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    }
  }
});

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.dataset.index = index;
    li.innerHTML = `
      <span>${task.name}</span>
      <button class="edit-btn" data-index="${index}">Edit</button>
      <button class="delete-btn" data-index="${index}">Delete</button>
    `;
    taskList.appendChild(li);
  });
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

renderTasks();