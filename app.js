const addTodoForm = document.querySelector(".form-add-todo");
const todoListContainer = document.querySelector(".todos-container");
const formSearchTodo = document.querySelector(".form-search");
const sendEditTodo = document.querySelector("#sendEditTodo");
const modal = document.querySelector("#exampleModal");

let count = 1;

const insertTodoIntoDOM = (inputValue) => {
  todoListContainer.innerHTML += `
    <li data-id="${count}" class="list-group-item d-flex justify-content-between align-items-center">
        <span>${inputValue}</span>
      <div class="container-icon">
      <i
      class="far fa-edit edit"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
       >
      </i>
        <i data-id="removeTodo" class="fa-regular fa-trash-can delete"></i>
      </div>
    </li>
  `;
  count++;
};

const filterTodos = (inputValue) => {
  Array.from(todoListContainer.children).forEach((todo) => {
    todo.textContent.toLocaleLowerCase().includes(inputValue)
      ? (todo.classList.remove("hidden"), todo.classList.add("d-flex"))
      : (todo.classList.remove("d-flex"), todo.classList.add("hidden"));
  });
};

const removeTodoFromDOM = (event) => {
  if (event.target.dataset.id === "removeTodo") {
    const li = event.target.closest("li");
    li.remove();
  }
};

const openEditForm = (event) => {
  modal.classList.add("show");
  const textContentEditTodo = event.target.closest("li").textContent.trim();

  const textEditTodoElement = document.querySelector(".textEditTodo");
  textEditTodoElement.value = textContentEditTodo;

  sendEditTodo.dataset.liReference = event.target.closest("li").dataset.id;
};
addTodoForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const inputValue = event.target.add.value.trim();

  inputValue ? insertTodoIntoDOM(inputValue) : "undefined";
  event.target.reset();
});

formSearchTodo.addEventListener("input", (event) => {
  const inputValue = event.target.value.trim().toLowerCase();
  filterTodos(inputValue);
});

todoListContainer.addEventListener("click", (event) => {
  const clickedRemoveButton = event.target.classList.contains("fa-trash-can");
  const clickedEditButton = event.target.classList.contains("fa-edit");
  if (clickedRemoveButton) {
    removeTodoFromDOM(event);
    return;
  }
  if (clickedEditButton) {
    openEditForm(event);
    return;
  }
});

const editTodo = (event) => {
  const textEditTodo = document.querySelector(".textEditTodo").value;
  const liReference = event.target.closest("button").dataset.liReference;
  const li = document.querySelector(`[data-id='${liReference}'] span`);
  li.textContent = textEditTodo;
  modal.classList.remove("show");
};

sendEditTodo.addEventListener("click", (event) => {
  event.preventDefault();
  editTodo(event);
});
