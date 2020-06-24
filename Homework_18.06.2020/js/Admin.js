export default class Admin {

    setTitle(wrapper) {
        wrapper.append(`
                <h2 class="title">Admin page:</h2>
                <div class="info"></div>
            `);
    }

    setTableHeader() {
        $('.info').append(`
                <h3>ID</h3>
                <h3>Title</h3>
                <h3>Icon</h3>
                <h3>Country</h3>
                <h3>Quantity</h3>
                <h3 class="prices">Price</h3>
                <h3>Edit</h3>
                <h3>Remove</h3>
            `);
    }

    setItems(number, title, icon, country, quantity, price) {
        $('.info').append(`
            <div>${number}.</div>
            <div>${title}</div>
            <div><img class="iconAdmin" src="${icon}" alt="${title}"></div>
            <div>${country}</div>
            <div>${quantity} kg</div>
            <div>${price} $</div>
            <div class="edit"><img src="https://img.icons8.com/metro/20/000000/edit.png"/></div>
            <div class="remove"><img src="https://img.icons8.com/fluent/20/000000/delete-sign.png"/></div>
        `);
    }
    setButton(wrapper) {
        wrapper.append(`
            <div class="newProduct"><input type="button" value="New product" id="new"></div>
        `)
    }
}