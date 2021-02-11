import ToDoList from './todolist.js';
import ToDoItem from './toDoItem.js';

const dayDate = document.querySelector('.date') ;
const options = {weekday : 'short', month:'short', day:'numeric'};
const today = new Date();

dayDate.innerHTML = today.toLocaleDateString('en-US', options);

const toDo = new ToDoList();

// launch app

document.addEventListener('readystatechange', (event) => {
    if (event.target.readyState === 'complete'){
        initApp();
    }
});

const initApp = () => {
    //add listeners
    const itemEntry = document.querySelector('.addTodo');
    itemEntry.addEventListener('click', (event) => {
        processSubmission();
    });
    document.addEventListener('keyup', function(event){
        if(event.keyCode == 13){
            processSubmission();
        }
    });
    const clear = document.querySelector('.refresh');
    clear.addEventListener('click', (event) => {
        toDo.clearList();
        updatePersistantData(toDo.getList());
        refreshThePage();
    });

    //load list object
    loadListObject();
    //refresh the page
    refreshThePage();
}

const loadListObject = () => {
    const storedList = localStorage.getItem('myToDoList');
    if(typeof storedList != 'string') return;
    const parsedList = JSON.parse(storedList);
    parsedList.forEach((itemObj) => {
        const newToDoItem = createnewItem(itemObj._id, itemObj._item, itemObj._complete);
        toDo.addItemToList(newToDoItem);
    });
};

const refreshThePage = () => {
    clearListDisplay();
    renderList();
    clearItemEntryField();
    setFocusOnItemEntry();
}

const clearListDisplay = () => {
    const parentElement = document.querySelector('.list');
    deleteContents(parentElement);
};

const deleteContents = (parentElement) => {
    let child = parentElement.lastElementChild;
    while (child) {
        parentElement.removeChild(child);
        child = parentElement.lastElementChild;
    }
    updatePersistantData(toDo.getList());
};

const renderList = () => {
    const list = toDo.getList();
    list.forEach((item) => {
        buildListItem(item);
    });
};

const buildListItem = (item) => {
    const li = document.createElement('li');
    li.className = 'todo-item';
    const divCheck = document.createElement('div');
    divCheck.className = 'task-complete unchecked'

    divCheck.id = item.getId();
    addClickListenertoCheck(divCheck);

    const divLabel = document.createElement('div');
    divLabel.innerHTML = item.getItem();
    divLabel.className = `td${item.getId()} todo-text`;

    const divTrash = document.createElement('div');
    divTrash.id = item.getId();
    divTrash.className = `${item.getId()} remove-item`;
    const trashimg = document.createElement('img');
    trashimg.src = '/week6/images/trash.svg';
    divTrash.appendChild(trashimg);
    addClickListenertoTrash(divTrash);

    if(item.getComplete()){
        divCheck.classList.toggle('unchecked');
        divCheck.classList.toggle('checked');
        divLabel.classList.toggle('crossedOut');
    }
    
    //package into li
    li.appendChild(divCheck);
    li.appendChild(divLabel);
    li.appendChild(divTrash);
    const container = document.querySelector('.list');
    container.appendChild(li);
};

const addClickListenertoCheck = (checkbox) => {
    checkbox.addEventListener('click', (event) => {
        const currentItem = findItem(checkbox.id)
        currentItem.toggleComplete();
        updatePersistantData(toDo.getList());
        refreshThePage();
    });
};

const findItem = (id) => {
    const list =toDo.getList()
    for (let i = 0; i < list.length; i++) {
        if (list[i]._id == id){
            return list[i];
        }
    }
}

const addClickListenertoTrash = (divTrash) => {
    divTrash.addEventListener('click', (event) => {
        toDo.removeItemFromList(divTrash.id);
        updatePersistantData(toDo.getList());
        refreshThePage();
    });
};

const clearItemEntryField = () => {
    document.querySelector('.newItem').value = '';
};

const setFocusOnItemEntry = () => {
    document.querySelector('.newItem').focus();
};

const processSubmission = () => {
    const newEntryText = getNewEntry();
    if (!newEntryText.length) return;
    const nextItemId = calcNextItemId();
    const toDoItem = createnewItem(nextItemId, newEntryText);
    toDo.addItemToList(toDoItem);
    updatePersistantData(toDo.getList());
    refreshThePage();
};

const getNewEntry = () => {
    return document.querySelector('.newItem').value.trim();
};

const calcNextItemId = () => {
    let nextItemId = 0;
    const list = toDo.getList();
    if(list.length > 0) {
        nextItemId = list[list.length - 1].getId() +1;
    }
    return nextItemId;
};

const createnewItem = (itemId, itemText, complete = false) => {
    const toDo = new ToDoItem();
    toDo.setId(itemId);
    toDo.setItem(itemText);
    toDo.setComplete(complete);
    return toDo;
};

const updatePersistantData = (listArray) => {
    localStorage.setItem('myToDoList', JSON.stringify(listArray));
};