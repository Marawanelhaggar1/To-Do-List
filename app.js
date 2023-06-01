const add = document.getElementById("add");
const ok = document.getElementById("ok");
const cancel = document.getElementById("cancel");
const overlay = document.getElementById("overlay");
const popUp = document.getElementById("pop-up");
const form = document.getElementById("form");

const tasks = [];

const addTask = () => {
  let taskName = document.getElementById("task-name").value;
  let priority = document.getElementById("priority").value;

  const obj = {
    taskName,
    priority: parseInt(priority),
  };

  if (taskName && priority >= 1) {
    tasks.push(obj);
    sortTasks();
    renderTask();
    form.reset();
  } else {
    alert("invalid priority or name");
  }
};

const renderTask = () => {
  let tbody = "";
  tasks.forEach((task, idx) => {
    tbody += getTasks(task, idx);
  });
  document.getElementById("tasks").innerHTML = tbody;
};

const getTasks = (task, idx) => {
  let row = `
  <tr>
  <th scope="row">${idx + 1}</th>
                      <th>${task.taskName}</th>
                      <th>${task.priority}</th>
                      <th>
                           <button
                              type="button" class="btn btn-primary"
                              onclick = "popMenu(${idx})";
                            >
                                Edit
                            </button>
                      </th>
                      <th>
                           <button
                              type="button" class="btn btn-danger"
                              onclick = "removeTask(${idx})";
                            >
                                Remove
                            </button>
                      </th>
                      </tr>
        `;
  return row;
};

const sortTasks = () => {
  tasks.sort((a, b) => a.priority - b.priority);
  renderTask();
};

const removeTask = (i) => {
  tasks.splice(i, 1);
  renderTask();
};

const popMenu = (i) => {
  tasks.splice(i, 1);
  overlay.style.display = "block";
  popUp.style.display = "block";
};

const editTask = (i) => {
  const name = document.getElementById("name").value;
  const pr = document.getElementById("prio").value;

  if (!name.trim() && priority < 1) {
    alert("invalid name and priority");
  } else {
    const obj2 = {
      taskName: name,
      priority: pr,
    };
    tasks.push(obj2);
    sortTasks();
    renderTask();
    form.reset();
    overlay.style.display = "none";
    popUp.style.display = "none";
  }
};

const cancelEdit = () => {
  overlay.style.display = "none";
  popUp.style.display = "none";
  form.reset();
};

add.addEventListener("click", addTask);
cancel.addEventListener("click", cancelEdit);
ok.addEventListener("click", editTask);
