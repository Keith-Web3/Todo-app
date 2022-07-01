import { todoInput, todoList, itemsLeft } from './index.js'

let allTodo
let completedTodo
let unCompletedTodo
let uncompletedItems

function getTodoHtml(todoText) {
  return `
      <div class="check-box" data-checkbox="js-check">
        <img data-checkbox="js-check" src="icon-check.svg" alt="complete">
      </div>
      <p class="todo-item">${todoText}</p>
      <img src="icon-cross.svg" alt="remove item" data-action="remove-todo">
  `
}

function createNewTodo() {
  const newTodo = document.createElement("div")
  newTodo.setAttribute("draggable", "true")
  newTodo.className = "todo"
  newTodo.innerHTML = getTodoHtml(todoInput.value)
  todoInput.value.trim() ? todoList.prepend(newTodo) : ""
  todoInput.value = ""
  saveToLocalStorage()
}

function filterTodoList() {
  const checkBox = [...document.querySelectorAll(".check-box")]
  const checkBoxCompleted = checkBox.filter(box => [...box.classList].includes("completed"))
  const checkBoxUncompleted = checkBox.filter(box => [...box.classList].length === 1)

  allTodo = document.querySelectorAll(".todo")
  completedTodo = checkBoxCompleted.map(box => {
    return box.closest(".todo")
  })
  unCompletedTodo = checkBoxUncompleted.map(box => {
    return box.closest(".todo")
  })

  uncompletedItems = allTodo.length - completedTodo.length
  itemsLeft.textContent = `${uncompletedItems} ${uncompletedItems > 1 ? "items" : "item"} left`

  saveToLocalStorage()
}

function getCompletedItems() {
  unCompletedTodo.forEach(item => {
    item.style.display = "none"
  })
  completedTodo.forEach(item => {
    item.style.display = "flex"
  })
}
function getUnCompletedItems() {
  completedTodo.forEach(item => {
    item.style.display = "none"
  })
  unCompletedTodo.forEach(item => {
    item.style.display = "flex"
  })
}
function getAllItems() {
  allTodo.forEach(item => {
    item.style.display = "flex"
  })
  itemsLeft.textContent = `${uncompletedItems} ${uncompletedItems > 1 ? "items" : "item"} left`
}

function clearCompletedItems() {
  completedTodo.forEach(todo => {
    todo.remove()
  })
  filterTodoList()
}

function saveToLocalStorage() {
  localStorage.setItem("olaTodoNoteApp", JSON.stringify(todoList.innerHTML))
}

function loadFromLocalStorage() {
  const data = localStorage.getItem("olaTodoNoteApp")
  todoList.innerHTML = JSON.parse(data)
  filterTodoList()
}
export { createNewTodo, filterTodoList, getCompletedItems, getUnCompletedItems, getAllItems, clearCompletedItems, loadFromLocalStorage }