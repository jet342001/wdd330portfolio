import ToDoList from '/week6/js/todolist';
import ToDoItem from '/week6/js/item';

const ToDo = new ToDoList();

// launc app
document.addEventListener('readystatechange', (event) => {
    if (event.target.readystate === 'complete'){
        initApp();
    }
});

const initApp = () => {
    //add listeners
    const itemEntry = document.getElementById('input');
    itemEntry.addEventListener('click', (event) => {
        processSubmission();
    });

    //load list object
    //refresh the page
    refreshThePage();
}

const refreshThePage = () => {
    clearListDisplay();
    renderlist();
    clearItemEntryField();
    setFocusOnItemEntry();
}

const clearListDisplay = () => {
    const parentElement = document.getElementById('listItems');
    deleteContents(parentElement);
};

const deleteContents = (parentElement) => {
    let child = parentElement.lastElementChild;
    while (child) {
        parentElement.removeChild(child);
        child = parentElement.lastElementChild;
    }
};

const renderList = () => {
    const list = ToDoList.getList();
    list.forEach((item) => {
        buildListItem(item);
    });
};

const buildListItem = (item) => {
    const li = document.createElement('li');
    li.className = 'todo-item';
    const divCheck = document.createElement('div');
    divCheck.className = 'task-complete unchecked'
    //listener
    addClickListenertoCheck(divCheck);
    const divLabel = document.createElement('div');
    divLabel.innerHTML = item.getItem();
    divLabel.className = `${item.getId()} todo-text`;

    const divTrash = document.createElement('div');
    divTrash.innerHTML = item.getItem();
    divTrash.className = `${item.getId()} remove-item`;
    //listener for remove
    
    //package into li
    li.appendChild(divCheck);
    li.appendChild(divLabel);
    li.appendChild(divTrash);
    const container = document.getElementById('list');
    container.appendChild(li);
};

const addClickListenertoCheck = (checkbox) => {
    checkbox.addEventListener('click', (event) => {
        checkbox.classList.toggle('unchecked');
        checkbox.classList.toggle('unchecked');
    });
};

const addClickListenertoTrash = (divTrash) => {
    divTrash.addEventListener('click', (event) => {
        ToDoList.removeItemFromList(divTrash.id);
        //remove data
    });
};

const clearItemEntryField = () => {
    document.getElementById('newItem').value = '';
};

const setFocusOnItemEntry = () => {
    document.getElementById('newItem').focus();
};

const processSubmission = () => {
    const newEntryText = getNewEntry();
    if (!newEntryText.length) return;
    const nextItemId = calcNextItemId();
    const toDoItem = createnewItem(nextItemId, newEntryText);
    toDoList.addItemToList(toDoItem);
    //update persistant data
    refreshThePage();
};

const getNewEntry = () => {
    return document.getElementById('newItem').value.trim();
};

const calcNextItemId = () => {
    let nextItemId = 1;
    const list = toDoList.getList();
    if(list.length > 0) {
        nextItemId = list(list.length - 1).getid() +1;
    }
    return nextItemId;
};

const createnewItem = (itemID, itemText) => {
    const toDo = new ToDoItem();
    toDo.setId(itemId);
    toDo.setItem(itemText);
    return toDo;
};