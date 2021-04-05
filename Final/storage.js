export default class Storage {
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