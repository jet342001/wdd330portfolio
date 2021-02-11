export default class ToDoItem{
    constructor() {
        this._id = null;
        this._item = null;
        this._complete = false;
    }

    getId(){
        return this._id;
    }

    setId(id) {
        this._id = id;
    }

    getItem() {
        return this._item;
    }

    setItem(item) {
        this._item = item;  
    }

    toggleComplete() {
        if(this._complete){
            this._complete = false;
            return;
        }
        this._complete = true;
    }

    setComplete(complete) {
        this._complete = complete;
    }

    getComplete(){
        return this._complete;
    }


}