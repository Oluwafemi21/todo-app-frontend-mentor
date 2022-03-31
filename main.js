// Query Selectors
const inputTodo = document.querySelector('.input-box');
const todos = document.querySelector('.todos');
const counter = document.querySelector('.counter');
const btns = document.querySelector('.btns');
const tabs = Array.from(btns.children);
const deleteAllBtn = todos.parentElement.lastElementChild;

// AddEvent Listeners
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
            <img src="images/icon-check.svg" alt="check-box">
        </div>
        <p class="text">${todo}</p>
        <img class="delete" src="images/icon-cross.svg" alt="delete todo">
    </li>`

    todos.innerHTML += html;
}

//Update the counter
counter.textContent = todos.childElementCount;


function deleteCheck(e) {
    if (e.target.classList.contains('check-box')) {
        e.target.parentElement.classList.toggle('completed')
        e.target.classList.toggle('checked');
    } else if (e.target.classList.contains('delete')) {
        e.target.parentElement.remove();
        counter.textContent = todos.childElementCount;
    }
}

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

function deleteAll(e){
    const removeTodos = Array.from(todos.children);
    if(e.target.classList.contains('delete-all')){
        removeTodos.filter(todo => todo.classList.contains('completed'))
        .map(todo => todo.remove());   
        //Update the counter
        counter.textContent = todos.childElementCount;
    }
}

