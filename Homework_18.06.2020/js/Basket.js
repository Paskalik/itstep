export default class Basket {

    setTitle(wrapper) {
        wrapper.append(`
                <h2 class="title">Basket:</h2>
                <div class="result"></div>
            `);
    }

    setTableHeader() {
        $('.result').append(`
                <h3>№</h3>
                <h3>Product</h3>
                <h3>Quantity</h3>
                <h3 class="prices">Price</h3>
            `);
    }

    setItems(number, product, price, quantity, maxQuantity) {
        $('.result').append(`
            <div>${number}.</div>
            <div>${product}</div>
            <div class="quantity"><input type="number" min="1" max="${maxQuantity}" step="0.1" value="${quantity}" 
                data-count="${maxQuantity}" data-price="${price}" data-num="${number}"><span>kg</span></div>
            <div class="price row" data-num="${number}">${(+price)*(+quantity)}</div>
        `);
    }

    setTotal(totalSum) {
        $('.result').append(`
            <div class="total">Total:</div>
            <div class="price sum">${totalSum}</div>
        `);
    }
}