const addTodoForm = document.querySelector(".form-add-todo");
const todoListContainer = document.querySelector(".todos-container");
const formSearchTodo = document.querySelector(".form-search");

const insertTodoIntoDOM = (inputValue) => {
  todoListContainer.innerHTML += `
    <li data-id="dinamic-li" class="list-group-item d-flex justify-content-between align-items-center">
        <span>${inputValue}</span>
        <i class="far fa-trash-alt delete"></i>
    </li>
  `;
};

const filterTodos = (inputValue) => {
  Array.from(todoListContainer.children).forEach((todo) => {
    todo.textContent.toLocaleLowerCase().includes(inputValue)
      ? (todo.classList.remove("hidden"), todo.classList.add("d-flex"))
      : (todo.classList.remove("d-flex"), todo.classList.add("hidden"));
  });
};

const removeTodoFromDOM = (event) => {
  if (Array.from(event.target.classList).includes("delete")) {
    const li = event.target.parentNode.dataset["id"];
    li ? event.target.parentNode.remove() : undefined;
  }
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

todoListContainer.addEventListener("click", removeTodoFromDOM);
