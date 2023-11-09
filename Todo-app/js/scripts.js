// // ************ Select the HTML Elements **************

const container = document.querySelector(".container");
const todoForm = document.querySelector(".todo-form");
const inputTodo = document.querySelector("#inputTodo");
const addTodoButton = document.querySelector("#addTodoButton");
const todoLists = document.querySelector("#lists");
const massage = document.getElementById("message");


// add Todo
const addTodo = (event) =>{
  event.preventDefault();

  const todoValue = inputTodo.value;

  const todoId = Date.now().toString();

  createTodo(todoId, todoValue);
  showMessage("Todo is Created.", "success");

  // add todo to local Storage
  const todos = getTodosFromLocalStorage();
  todos.push({todoId, todoValue});
  localStorage.setItem("mytodos", JSON.stringify(todos));

  inputTodo.value = "";
}

// Create Todo
const createTodo = (todoId, todoValue) => {
 
  const todoElement = document.createElement("li");
  todoElement.id = todoId;
  todoElement.classList.add("li-style");
  todoElement.innerHTML = `
  <span class="first">${todoValue}</span> 
  <span class="last"> <button class="btn" id="deleteButton"><i class="bi bi-trash-fill"></i></button></span>`;
  todoLists.appendChild(todoElement);

  const deleteButton = todoElement.querySelector("#deleteButton");
  deleteButton.addEventListener("click", deleteTodo);

}

const showMessage = (text,status) => {
  massage.textContent = text;
  massage.classList.add(`${status}`);

  setTimeout(() => {
   massage.textContent = "";
   massage.classList.remove(`${status}`);

  }, 1000);
}



const getTodosFromLocalStorage = () =>{
  return localStorage.getItem("mytodos") ? JSON.parse(localStorage.getItem("mytodos")) : [];
  
}

const loadTodos = () => {
 const todos = getTodosFromLocalStorage();

 todos.map((todo) => createTodo(todo.todoId, todo.todoValue));

}

// Delete Todo 
const deleteTodo = (event) => {
  const selectedTodo = event.target.parentElement.parentElement.parentElement;
  todoLists.removeChild(selectedTodo);
  showMessage("Todo is Deleted.", "delete");
 
  let todos = getTodosFromLocalStorage();
  todos = todos.filter((todo) => todo.todoId !== selectedTodo.id);
  localStorage.setItem("mytodos", JSON.stringify(todos));
  
 }

// Adding lesteners 
todoForm.addEventListener("submit", addTodo);
window.addEventListener("DOMContentLoaded", loadTodos);




