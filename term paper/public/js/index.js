'use strict';

const requestURL = "/api/todos";

const createTodoButton = document.querySelector('.arrow');
createTodoButton.addEventListener('click', createTodo);

const clearAllButton = document.querySelector('.clear-all');
clearAllButton.addEventListener('click', clearAllTodos);

const allStatusButtons = document.querySelector('.total');
allStatusButtons.addEventListener('click', retrieveAllTodos);

const successButton = document.querySelector('.success');
successButton.addEventListener('click', retrieveSuccessTodos);

const pendingButton = document.querySelector('.pending');
pendingButton.addEventListener('click', retrievePendingTodos);

const searchButton = document.querySelector('#elastic');
searchButton.addEventListener('input', searhTodos);

function updateData() {

    this.innerText == 'check_box' ? 
    this.innerText = 'check_box_outline_blank' : this.innerText = 'check_box';
    updateTodo(this.id, this.innerText);
}

function getTodos() {    

    fetch(requestURL, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    }).then (response => {
        if (response.ok) {
            return response.json()
        }
    }).then (resultsArr => {
        resultsArr.forEach(element => {
            appendNewTodo(document.querySelector('.todo-wrapper'), element);            
        });
    }).catch(error => {
        console.log(error);
        const e = new Error('Something went wrong')
        e.data = error
        throw e
    })
};

function createTodo() {

    const input = document.querySelector('#create-todo');
    const description = input.value;
    const date = getReadebleDate();
    let todo = {
        description: description,
        date: date
    }        
    fetch(requestURL, {
        method: 'POST',
        body: JSON.stringify(todo),
        headers: {'Content-Type': 'application/json'}
    }).then (response => {
        if (response.ok) {
            return response.json()
        }
    }).then (obj => {
        appendNewTodo(document.querySelector('.todo-wrapper'), obj);
    }).catch(error => {
        const e = new Error('Something went wrong')
        e.data = error
        throw e
    })
};

function deleteTodo() {

    fetch(requestURL, {
        method: 'DELETE',
        body: JSON.stringify({id: this.id}),
        headers: {'Content-Type': 'application/json'}
    }).then (response => {
        if (response.ok) {
            return response.json()
        }
    }).then (obj => {
        removeDeletedTodo(obj);
    }).catch(error => {
        const e = new Error('Something went wrong')
        e.data = error
        throw e
    })
};

function clearAllTodos() {

    fetch(requestURL, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    }).then (response => {
        if (response.ok) {
            document.querySelector('.todo-wrapper').innerHTML = '';
        }
    }).catch(error => {
        const e = new Error('Something went wrong')
        e.data = error
        throw e
    })
}

function updateTodo(id, status){

    let completed;
    status == 'check_box_outline_blank' ? completed = false : completed = true;
    const dataToUpdate = {
        id: id,
        completed: completed
    }
    fetch(requestURL, {
        method: "PUT",
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify(dataToUpdate)
    }).then (response => {
        if (response.ok) {
            return response.json()
        }
    }).then (obj => {
        console.log(obj);
    }).catch(error => {
        const e = new Error('Something went wrong')
        e.data = error
        throw e
    })
}

function appendNewTodo(where, obj) {

    let bodyDiv = document.createElement('div');
    let descriptionDiv = document.createElement('div');
    let additionalDiv = document.createElement('div');
    let dateDiv = document.createElement('div');
    let iconsDiv = document.createElement('div');
    
    let checkBoxSpan = document.createElement('span');
    let deleteSpan = document.createElement('span');

    bodyDiv.classList.add('todo-body');
    bodyDiv.classList.add('flex-row');
    bodyDiv.setAttribute('id', `body-${obj._id}`);
    descriptionDiv.classList.add('col-lg-9');
    descriptionDiv.classList.add('col-md-9');
    descriptionDiv.classList.add('col-sm-9');
    descriptionDiv.classList.add('col-xs-12');
    descriptionDiv.innerText = obj.description;
    additionalDiv.classList.add('col-lg-3');
    additionalDiv.classList.add('col-md-3');
    additionalDiv.classList.add('col-sm-3');
    additionalDiv.classList.add('col-xs-12');
    additionalDiv.classList.add('todo-additional');
    dateDiv.innerText = obj.date;
    checkBoxSpan.classList.add('material-icons');
    checkBoxSpan.addEventListener('click', updateData);
    checkBoxSpan.innerText = `${obj.completed ? 'check_box' : 'check_box_outline_blank'}`;
    checkBoxSpan.setAttribute('id', obj._id);
    deleteSpan.classList.add('material-icons');
    deleteSpan.innerText = 'delete_outline';
    deleteSpan.setAttribute('id', obj._id);
    deleteSpan.addEventListener('click', deleteTodo);

    iconsDiv.append(checkBoxSpan);
    iconsDiv.append(deleteSpan);
    additionalDiv.append(dateDiv);
    additionalDiv.append(iconsDiv);
    bodyDiv.append(descriptionDiv);
    bodyDiv.append(additionalDiv);

    where.prepend(bodyDiv);
    cleanInput();
}

function removeDeletedTodo(obj) {

    const todoToRemove = document.getElementById('body-' + obj._id);
    todoToRemove.remove();
}

function cleanInput() {

    document.querySelector('#create-todo').value = '';
}

function getReadebleDate() {

    const date = new Date();
    const month = date.toLocaleString('en-us', { month: 'short' });
    const day = date.getDate()
    return month + ' ' + day;
}

function retrieveAllTodos() {

    let statusButtons = document.querySelectorAll('.material-icons');
    for (let item of statusButtons) {
        if (item.closest('.todo-body') && item.closest('.todo-body').style.display == 'none') {
            item.closest('.todo-body').style.removeProperty('display');
        }
    }
    return statusButtons;
}

function retrieveSuccessTodos() {

    let statusButtons = retrieveAllTodos();
    for (let item of statusButtons) {
        if (item.innerText == 'check_box_outline_blank') {
            if (item.closest('.todo-body').style.display == 'none') {
                item.closest('.todo-body').style.removeProperty('display');
            }
            else item.closest('.todo-body').style.display = 'none';
        }
    
    }  
}

function retrievePendingTodos() {

    let statusButtons = retrieveAllTodos();
    for (let item of statusButtons) {
        if (item.innerText == 'check_box') {
            if (item.closest('.todo-body').style.display == 'none') {
                item.closest('.todo-body').style.removeProperty('display');
            }
            else item.closest('.todo-body').style.display = 'none';
        }
    
    }  
}

function searhTodos() {

    let val = this.value.trim();
    let allTodos = document.querySelectorAll('.todo-body');
    if (val != '') {
        allTodos.forEach(function(elem) {
            if (elem.firstChild.innerText.search(val) == -1) {
                elem.style.display = 'none';
                elem.firstChild.innerHTML = elem.firstChild.innerText;
            } 
            else {

                elem.style.removeProperty('display');
                let str = elem.firstChild.innerText;
                elem.firstChild.innerHTML = insertMark(str, elem.firstChild.innerText.search(val), val.length);
            }
        });
    }
    else {
        allTodos.forEach(function(elem) {
            elem.style.removeProperty('display');
            elem.firstChild.innerHTML = elem.firstChild.innerText;
        });
    }
}

function insertMark(string, pos, len) {
    return string.slice(0, pos) + '<mark>' + string.slice(pos, pos + len) + '</mark>' + string.slice(pos + len);
}

getTodos();