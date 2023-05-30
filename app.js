const add = document.getElementById("add");
const table = document.getElementById("tasks");

const addTask = () => {
  //   const tasks = [];
  let taskName = document.getElementById("task-name").value;
  let priority = document.getElementById("priority").value;
  const obj = {
    taskName,
    priority,
  };
  //   tasks.push(obj);
  if (taskName && priority >= 1) {
    const row = document.createElement("tr");
    row.setAttribute("id", "row");
    table.appendChild(row);
    row.innerHTML = `<th scope="row">${row.rowIndex}</th>
                          <th>${obj.taskName}</th>
                          <th>${obj.priority}</th>
                          <th>
                              <button
                               type="button" class="btn btn-danger" 
                               onclick = "removeTask(this.parentNode.parentNode)";
                               >
                                  Remove
                              </button>
                          </th>
            `;
  } else {
    alert("invalid priority or name");
  }

  //   tasks.forEach((task, idx) => {
  //     const row = document.createElement("tr");
  //     table.appendChild(row);
  //     row.innerHTML = `<th scope="row">${idx + 1}</th>
  //                     <th>${task.taskName}</th>
  //                     <th>${task.priority}</th>
  //                     <th>
  //                         <button type="button" class="btn btn-danger" id="remove">
  //                             Remove
  //                         </button>
  //                     </th>
  //       `;
  //   });
};

const removeTask = (row) => {
  row.parentNode.removeChild(row);
};

add.addEventListener("click", addTask);
