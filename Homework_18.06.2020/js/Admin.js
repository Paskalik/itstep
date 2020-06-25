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
            <div class="edit" data-name="${title}"><img src="https://img.icons8.com/metro/20/000000/edit.png" alt="edit"/></div>
            <div class="remove" data-name="${title}"><img src="https://img.icons8.com/fluent/20/000000/delete-sign.png" alt="Delete"/></div>
        `);
    }
    setButton(wrapper) {
        wrapper.append(`
            <div class="newProduct"><input type="button" value="New product" id="new"></div>
        `)
    }
    setPopup(wrapper) {
        wrapper.append(`
            <div id="fade"><div id="popup"></div></div>
        `)
        $('#popup').append(`
            <h3 id="header"></h3>
            <div class="popup">
                <label for="title">Title:</label><input id="title">
                <label for="icon">Icon url:</label><input id="icon">
                <label for="country">Country:</label><input id="country">
                <label for="quantity">Quantity:</label><input id="quantity" type="number">
                <label for="price">Price:</label><input id="price" type="number">
                <label for="save"></label><input type="button" id="save" value="Save">
            </div>
        `)
    }
    setInfoPopup(header, title = null, icon = null, country = null, quantity = null, price = null) {
        $('#header').text(header)
        $('#title').val(title)
        $('#icon').val(icon)
        $('#country').val(country)
        $('#quantity').val(quantity)
        $('#price').val(price)
    }
    newItem() {
        return {
            "title": $('#title').val(),
            "image": $('#icon').val(),
            "country": $('#country').val(),
            "count": $('#quantity').val(),
            "price": $('#price').val()
        }
    }
}