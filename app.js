const add = document.getElementById("add");
const ok = document.getElementById("ok");
const cancel = document.getElementById("cancel");
const overlay = document.getElementById("overlay");
const popUp = document.getElementById("pop-up");
const sort = document.getElementById("sort");
const form = document.getElementById("form");

class Task {
  constructor(taskName, priority) {
    this.taskName = taskName;
    this.priority = priority;
  }
}

class TaskOperation {
  constructor() {
    this.tasks = [];
  }

  addTask = () => {
    let taskName = document.getElementById("task-name").value;
    let priority = document.getElementById("priority").value;
    const task = new Task(taskName, priority);
    console.log(task);
    console.log(this.tasks);

    if (taskName && priority >= 1) {
      this.tasks.push(task);
      this.sortTasks();
      this.renderTask(this.tasks);
      form.reset();
    } else {
      alert("invalid priority or name");
    }
  };

  removeTask = (i) => {
    this.tasks.splice(i, 1);
    this.renderTask(this.tasks);
  };

  sortTasks = () => {
    this.tasks.sort((a, b) => a.priority - b.priority);
    this.renderTask(this.tasks);
  };

  sortTaskstoHighest = () => {
    this.tasks.sort((a, b) => b.priority - a.priority);
    this.renderTask(this.tasks);
  };

  renderTask = (tasks) => {
    let tbody = "";
    tasks.forEach((task, idx) => {
      tbody += this.getTasks(task, idx);
    });
    document.getElementById("rr").innerHTML = tbody;
  };

  getTasks = (task, idx) => {
    let row = `
                <tr>
                    <td scope="row">${idx + 1}</td>
                        <td>${task.taskName}</td>
                        <td>${task.priority}</td>
                        <td>
                             <button
                                type="button" class="btn btn-primary"
                                onclick = "taskOperation.popMenu(${idx})";
                              >
                                  Edit
                              </button>
                        </td>
                        <td>
                              <input type="checkbox" name="delete" />
                        </td>
                        <td>
                             <button
                                type="button" class="btn btn-danger"
                                onclick = "taskOperation.removeTask(${idx})";
                              >
                                  Remove
                              </button>
                        </td>
                    </tr>
          `;
    return row;
  };

  popMenu = (i) => {
    this.tasks.splice(i, 1);
    overlay.style.display = "block";
    popUp.style.display = "block";
  };

  editTask = () => {
    const name = document.getElementById("name").value;
    const pr = document.getElementById("prio").value;

    if (!name.trim() && pr != 0) {
      alert("invalid name and priority");
    } else {
      const obj2 = {
        taskName: name,
        priority: pr,
      };
      this.tasks.push(obj2);
      this.sortTasks();
      this.renderTask(this.tasks);
      form.reset();
      overlay.style.display = "none";
      popUp.style.display = "none";
    }
  };

  cancelEdit = () => {
    overlay.style.display = "none";
    popUp.style.display = "none";
    form.reset();
  };

  filterTasks = () => {
    const filter = document.getElementById("filter").value;
    const arr = this.tasks.filter((task) => {
      return task.priority == parseInt(filter);
    });
    if (filter == 0) {
      this.renderTask(this.tasks);
    } else {
      this.renderTask(arr);
    }
  };

  deleteFinished = () => {
    let finished = document.getElementsByName("delete");
    for (let i = 0; i < finished.length; i++) {
      if (finished[i].checked) {
        this.tasks.splice(finished[i], 1);
      }
    }
    console.log(finished);
    console.log(this.tasks);
    this.renderTask(this.tasks);
  };
}

const taskOperation = new TaskOperation();
console.log(taskOperation);

add.addEventListener("click", taskOperation.addTask);
cancel.addEventListener("click", taskOperation.cancelEdit);
ok.addEventListener("click", taskOperation.editTask);
sort.addEventListener("click", taskOperation.sortTaskstoHighest);
filter.addEventListener("change", taskOperation.filterTasks);
