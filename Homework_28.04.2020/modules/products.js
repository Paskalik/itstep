export class Products {
    constructor(products) {
        this.products = products;
    }

    loadProducts() {
        if (!this.products) {
            console.warn('Nothing to load!');
            return false;
        }
        this.removeProducts();
        let list = document.getElementById('list');
        this.products.forEach(el => {
            let product = document.createElement('div');
            product.className = 'product';
            product.innerHTML = `
                        <p class="number">#${el.id}</p>
                        <p class="bold">${el.name}</p>
                        <p class="number">${el.price} $</p>
                        `
            list.appendChild(product);
        });
    }

    removeProducts() {
        let items = document.getElementsByClassName('product');
        while (items.length > 0) {
            items[0].remove();
        }
    }

}