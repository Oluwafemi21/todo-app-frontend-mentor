// Query Selectors
const inputTodo = document.querySelector('.input-box');
const todos = document.querySelector('.todos');
const counter = document.querySelector('.counter');
const btns = document.querySelector('.btns');
const tabs = Array.from(btns.children);
const deleteAllBtn = todos.parentElement.lastElementChild;
const toggle = document.querySelector('.theme-toggle');


// AddEvent Listeners
toggle.addEventListener('click', toggleTheme);
inputTodo.addEventListener('submit', addTodo);
todos.addEventListener('click', deleteCheck);
btns.addEventListener('click', filterTodo);
deleteAllBtn.addEventListener('click', deleteAll);
tabs.forEach(btn => {
    btn.addEventListener('click', () => {
        tabs.forEach(btn => btn.classList.remove('activeBtn'));
        btn.classList.add('activeBtn');
    });
});


// Function
// Change Theme
function toggleTheme(e){
    const theme = e.target.id;
    const body = document.querySelector('body')
    switch(theme){
        case "dark":
            body.classList.add('dark');
            break;
        case "light":
            body.classList.remove('dark');
    }
}

// Add Todo
function addTodo(e) {
    e.preventDefault();
    const todo = inputTodo.add.value.trim().toLowerCase();
    if (todo.length) {
        newTodo(todo);
        inputTodo.reset();
        //Update the counter
        counter.textContent = todos.childElementCount;
    }
}

// Create Todo
function newTodo(todo) {
    html = `
    <li class="todo-item">
        <div class="check-box">
            <div class="check-box-inner">
                <img src="images/icon-check.svg" alt="check-box">
            </div>
        </div>
        <p class="text">${todo}</p>
        <img class="delete" src="images/icon-cross.svg" alt="delete todo">
    </li>`

    todos.innerHTML += html;
}

//Update the counter
counter.textContent = todos.childElementCount;

// Complete Todo or Delete Todo
function deleteCheck(e) {
    if (e.target.classList.contains('check-box')) {
        e.target.parentElement.classList.toggle('completed');
        e.target.firstElementChild.classList.toggle('checked');
    } else if (e.target.classList.contains('delete')) {
        e.path[2].remove();
        counter.textContent = todos.childElementCount;
    }
}

// Filter Todo
function filterTodo(e) {
    const filteredTodo = Array.from(todos.children);
    switch (e.target.textContent.toLowerCase()) {
        case "all":
            filteredTodo.map((todo) => todo.style.display = "flex");
            counter.textContent = todos.childElementCount;
            todos.parentElement.firstElementChild.style.display = "none";
            break;

        case "active":
            let arr1 = filteredTodo.filter((todo) => !todo.classList.contains("completed"));
            filteredTodo.map((todo) => {
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
            });
            todos.parentElement.firstElementChild.style.display = "none";
            counter.textContent = arr1.length;
            break;

        case "completed":
            let arr2 = filteredTodo.filter((todo) => todo.classList.contains("completed"));
            filteredTodo.map((todo) => {
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
            });
            if (arr2.length < 1) {
                todos.parentElement.firstElementChild.style.display = "block";
            }
            counter.textContent = arr2.length;
            break;

    }
}

// Clear all completed todo
function deleteAll(e){
    const removeTodos = Array.from(todos.children);
    let arr4 = removeTodos.filter(todo => todo.classList.contains('!completed'));
    let arr3 = removeTodos.filter(todo => todo.classList.contains('completed'));
    if(e.target.classList.contains('delete-all')){
        arr3.map(todo => todo.remove());   
        
        if(tabs[2].classList.contains('activeBtn')){
            todos.parentElement.firstElementChild.style.display = "block";
            // Update todos
            counter.textContent = arr4.length;
        } else{
            todos.parentElement.firstElementChild.style.display = "none";
        }
    }
 
}



// DRAG AND DROP //
// const sortItems = document.querySelector('#items');

// new Sortable(sortItems, {
//     animation: 150,
//     chosenClass: "sortable-chosen",
//     dragClass: "sortable-drag"
// });
