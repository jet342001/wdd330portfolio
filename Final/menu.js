import Storage from './storage.js';

export default class Menu {

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