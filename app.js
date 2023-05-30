const add = document.getElementById("add");

const tasks = [];

const addTask = () => {
  let taskName = document.getElementById("task-name").value;
  let priority = document.getElementById("priority").value;

  const obj = {
    taskName,
    priority,
  };

  if (taskName && priority >= 1) {
    tasks.push(obj);
    renderTask();
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

const removeTask = (i) => {
  tasks.splice(i, 1);
  renderTask();
};

add.addEventListener("click", addTask);
