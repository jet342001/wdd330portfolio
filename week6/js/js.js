//Get my items
const clear = document.querySelector('.refresh');
const dayDate = document.querySelector('.date') ;
const list = document.querySelector('.list');
const input = document.querySelector('.input');
const additem = document.querySelector('.addTodo');

//list of items
var LIST;
var id = 0;

const options = {weekday : 'short', month:'short', day:'numeric'};
const today = new Date();

dayDate.innerHTML = today.toLocaleDateString('en-US', options);

//Creaates a todo items with all interior items
function todo(toDo){
    id++;
    checked = false;
    const item = `
                <li class='todo-item item${id}'>
                    <div class='task-compete unchecked'>
                    </div>
                    <div class='todo-text'>${toDo}</div>
                    <div class='remove-item'><img src='images/trash.svg'></div>
                </li>              
                `;
    //adds item to last on the list
    list.insertAdjacentHTML('beforeend', item);
    
}

//eventlistener for key or can press button
document.addEventListener('keyup', function(even){
    if(event.keyCode == 13){
        //keywaspressed
        //console.log(('key was pressed'))
        makeToDo();
    }
});

//called with button push or enter press to make new item
function makeToDo(){
    //check if input has value if not returns out
    if (document.querySelector('.input').value == ''){
        return;
    }
    const todoName = document.querySelector('.input').value;
    todo(todoName);
    removeInput();
}

//clears the input text box
function removeInput(){
    document.querySelector('.input').value = '';
}
//Resets all times
function reset(){
    document.querySelector('.list').innerHTML = '';
    id = 0;
}

function remove(item){
    document.remove.item
}