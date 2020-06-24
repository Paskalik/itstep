export default class Products {

    setTitle(wrapper) {
        wrapper.append(`
                <h2 class="title">All products:</h2>
                <div class="products"></div>
            `);
    }
    setItems(id, title, imageLink, country, price, count) {
        $('.products').append(`
            <div id="${id}">
                <h4 class="item">${title}</h4>
                <img class="icon" src="${imageLink}" alt="${title}">
                <p class="country">${country}</p>
                <span class="price">${price}</span>
                <input class="counter" type="number" min="1" max="${count}" step="0.1" value="1">
                <input type="button" value="Buy" data-num="${id}" data-count="${count}">
            </div>
        `);
    }
}