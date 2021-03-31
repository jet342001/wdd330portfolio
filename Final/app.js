const cartBtn = document.querySelector('.cart-btn');
const closecartBtn = document.querySelector('.close-cart');
const clearCartBtn = document.querySelector('.clear-cart');
const cartWindow = document.querySelector('.cart');
const cartOverlay = document.querySelector('.cart-overlay');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const cartContent = document.querySelector('.cart-content');
const menuApp = document.querySelector('.menu-center');

let cart = [];
let myButtons = [];
// Menu
class Menu {


    async getMenu() {
        try {
            let result = await fetch('menu.json');
            let data = await result.json();
            console.log(data);
            let menu = data.menu;
            console.log(menu);
            menu = menu.map(item => {
                const {
                    title,
                    price
                } = item.fields;
                const {
                    id
                } = item.sys;
                const image = item.fields.image.fields.file.url;
                console.log(title,price,id,image);
                return {
                    title,
                    price,
                    id,
                    image
                };
            });
            console.log(menu);
            return menu;
        } catch (error) {
            console.log(error);
        }
    }
}


class UI {
    // displays individual menu items
    displayMenu(menuItems) {
        let result = "";
        menuItems.forEach(item => {
            result += `
          <article class="menu">
            <div class="img-container">
              <img
                src=${item.image}
                alt="food image"
                class="menu-img"
              />
              <button class="bag-btn" data-id=${item.id}>
                <i class="fas fa-shopping-cart"></i>
                add to bag
              </button>
            </div>
            <h3>${item.title}</h3>
            <h4>$${item.price}</h4>
          </article>
     `;
        });
        menuApp.innerHTML = result;
    }
    getBagButtons() {
        let buttons = [...document.querySelectorAll(".bag-btn")];
        myButtons = buttons;
        buttons.forEach(button => {
            let id = button.dataset.id;
            let inCart = cart.find(item => item.id === id);

            if (inCart) {
                button.innerText = "In Cart";
                button.disabled = true;
            }
            button.addEventListener("click", event => {
                // disable button
                event.target.innerText = "In Cart";
                event.target.disabled = true;
                // add to cart
                let cartItem = {
                    ...Storage.getMenu(id),
                    amount: 1
                };
                cart = [...cart, cartItem];
                Storage.saveCart(cart);
                // add to DOM
                this.setCartValues(cart);
                this.addCartItem(cartItem);
                this.showCart();
            });
        });
    }
    setCartValues(cart) {
        let tempTotal = 0;
        let itemsTotal = 0;
        cart.map(item => {
            tempTotal += item.price * item.amount;
            itemsTotal += item.amount;
        });
        cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
        cartItems.innerText = itemsTotal;
    }

    addCartItem(item) {
        const div = document.createElement("div");
        div.classList.add("cart-item");
        div.innerHTML = `
              <img src=${item.image} alt="menu-image" />
              <div>
                <h4>${item.title}</h4>
                <h5>$${item.price}</h5>
                <span class="remove-item" data-id=${item.id}>remove</span>
              </div>
              <div>
                  <i class="fas fa-chevron-up" data-id=${item.id}></i>
                <p class="item-amount">
                  ${item.amount}
                </p>
                  <i class="fas fa-chevron-down" data-id=${item.id}></i>
              </div>
      `;
        cartContent.appendChild(div);
    }
    showCart() {
        cartOverlay.classList.add("transparentBcg");
        cartWindow.classList.add("showCart");
    }
    setupAPP() {
        cart = Storage.getCart();
        this.setCartValues(cart);
        this.populateCart(cart);
        cartBtn.addEventListener("click", this.showCart);
        closecartBtn.addEventListener("click", this.hideCart);
    }
    populateCart(cart) {
        cart.forEach(item => this.addCartItem(item));
    }
    hideCart() {
        cartOverlay.classList.remove("transparentBcg");
        cartWindow.classList.remove("showCart");
    }
    cartLogic() {
        clearCartBtn.addEventListener("click", () => {
            this.clearCart();
        });
        cartContent.addEventListener("click", event => {
            if (event.target.classList.contains("remove-item")) {
                let removeItem = event.target;
                let id = removeItem.dataset.id;
                cartContent.removeChild(removeItem.parentElement.parentElement);
                // remove item
                this.removeItem(id);
            } else if (event.target.classList.contains("fa-chevron-up")) {
                let addAmount = event.target;
                let id = addAmount.dataset.id;
                let tempItem = cart.find(item => item.id === id);
                tempItem.amount = tempItem.amount + 1;
                Storage.saveCart(cart);
                this.setCartValues(cart);
                addAmount.nextElementSibling.innerText = tempItem.amount;
            } else if (event.target.classList.contains("fa-chevron-down")) {
                let lowerAmount = event.target;
                let id = lowerAmount.dataset.id;
                let tempItem = cart.find(item => item.id === id);
                tempItem.amount = tempItem.amount - 1;
                if (tempItem.amount > 0) {
                    Storage.saveCart(cart);
                    this.setCartValues(cart);
                    lowerAmount.previousElementSibling.innerText = tempItem.amount;
                } else {
                    cartContent.removeChild(lowerAmount.parentElement.parentElement);
                    this.removeItem(id);
                }
            }
        });
    }
    clearCart() {
        // console.log(this);
        let cartItems = cart.map(item => item.id);
        cartItems.forEach(id => this.removeItem(id));
        while (cartContent.children.length > 0) {
            cartContent.removeChild(cartContent.children[0]);
        }
        this.hideCart();
    }
    removeItem(id) {
        cart = cart.filter(item => item.id !== id);
        this.setCartValues(cart);
        Storage.saveCart(cart);
        let button = this.getSingleButton(id);
        button.disabled = false;
        button.innerHTML = `<i class="fas fa-shopping-cart"></i>add to bag`;
    }
    getSingleButton(id) {
        return myButtons.find(button => button.dataset.id === id);
    }
}

//checks local storage
class Storage {
    static saveMenu(menu) {
        localStorage.setItem("menu", JSON.stringify(menu));
    }
    static getMenu(id) {
        let menu = JSON.parse(localStorage.getItem("menu"));
        return menu.find(menu => menu.id === id);
    }
    static saveCart(cart) {
        localStorage.setItem("cart", JSON.stringify(cart));
    }
    static getCart() {
        return localStorage.getItem("cart") ?
            JSON.parse(localStorage.getItem("cart")) :
            [];
    }
}

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