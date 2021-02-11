import ToDoList from './todolist';
import ToDoItem from './item';

const ToDo = new ToDoList();

// launc app
document.addEventListener('readystatechange', (event) => {
    if (event.target.readystate === 'complete'){
        initApp();
    }
});

const initApp = () => {
    //add listeners

    //load list object
    //refresh the page
    refreshThePage();
}

const refreshThePage = () => {
    clearListDisplay();
    //renderlist();
    //clearItemEntryField
}

