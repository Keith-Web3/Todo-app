let todoList = document.querySelector(".todos")
let itemsLeft = document.getElementById("items-left")
localStorage.getItem("olaTodoNoteApp") ? loadFromLocalStorage() : ""

import { createNewTodo, filterTodoList, getCompletedItems, getUnCompletedItems, getAllItems, clearCompletedItems, loadFromLocalStorage } from './utils.js'

const todoFooter = document.querySelector(".todo-footer")
const todoNav = document.querySelector(".todo-nav")
const createtodoBtn = document.querySelector(".new-todo > button")
const todoInput = document.querySelector(".new-todo > input")
const todoNavItems = document.querySelectorAll("li")
const allBtn = document.querySelectorAll(".all")
const activeBtn = document.querySelectorAll(".active")
const completedBtn = document.querySelectorAll(".complete")
const clearCompletedBtn = document.getElementById("clear-completed")
const themeSwitcher = document.getElementById("theme-switcher")
todoList = document.querySelector(".todos") // redefined for local storage functionality
itemsLeft = document.getElementById("items-left")
let draggedElement

themeSwitcher.addEventListener("click", () => {
  document.body.classList.toggle("light-theme")
})

createtodoBtn.addEventListener("click", createNewTodo)

todoInput.addEventListener("keyup", function(e) {
  if (e.key !== "Enter") return
  todoInput.value ? createNewTodo() : ""
  toggleTodoFooter()
  filterTodoList()
})

document.body.addEventListener("click", e => {
  if (e.target.matches("[data-checkbox = 'js-check']")) {
    const checkBox = e.target.closest(".check-box")
    checkBox.classList.toggle("completed")
    filterTodoList()
  } else if (e.target.matches("[data-action = 'remove-todo']")) {
    const todoItem = e.target.closest(".todo")
    todoItem.remove()
    toggleTodoFooter()
    filterTodoList()
  }
})

//drag and drop start
document.body.addEventListener("dragstart", e => {
  if (!e.target.matches(".todo")) return
  console.log(e)
  draggedElement = e.target
})
document.body.addEventListener("dragover", e => {
  if (!e.target.matches(".todo")) return
  e.preventDefault()
})
document.body.addEventListener("drop", e => {
  if (!e.target.matches(".todo")) return
  e.target.insertAdjacentElement("afterend", draggedElement)
})
// drag and drop end

function toggleTodoFooter() {
  todoFooter.style.display = todoList.children.length > 1 ? "flex" : "none"
  todoNav.style.display = todoList.children.length > 1 && window.innerWidth < 600 ? "block" : "none"
}

todoNavItems.forEach(item => {
  item.addEventListener("click", function(e) {
    resetNavItemsColor()
    e.target.classList.add("nav-item-active")
  })
})

function resetNavItemsColor() {
  todoNavItems.forEach(navItem => {
    navItem.classList.remove("nav-item-active")
  })
}
allBtn.forEach(button => button.addEventListener("click", getAllItems))
activeBtn.forEach(button => button.addEventListener("click", getUnCompletedItems))
completedBtn.forEach(button => button.addEventListener("click", getCompletedItems))

clearCompletedBtn.addEventListener("click", clearCompletedItems)

// Todo nav media query toggle
const x = window.matchMedia("(max-width: 600px)")
function mediaQuery(x) {
  if (x.matches) {
    todoNav.style.display = todoList.children.length > 2 ? "block" : "none"
  } else {
    todoNav.style.display = "none"
  }
}
mediaQuery(x)
x.addListener(mediaQuery)

if(window.innerWidth < 600) {
  alert("mobile drag and drop coming soon 😁😁")
}
export { todoInput, todoList, itemsLeft }