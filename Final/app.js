import Menu from './menu.js';
import Storage from './storage.js';
import UI from './ui.js';

// main starts app once content loads
document.addEventListener("DOMContentLoaded", () => {
    const ui = new UI();
    const menu = new Menu();
    ui.setupAPP();


    // get all menu itesm
    menu
        .getMenu()
        .then(menu => {
            //Populate order
            ui.displayMenu(menu);
            //check for stored items
            Storage.saveMenu(menu);
        })
        .then(() => {
            //main app
            ui.getBagButtons();
            ui.cartLogic();
        });
});

//simple add on to remove the main banner to start order
function startOrder() {
    document.querySelector('.hero').classList.toggle('start-order');
}