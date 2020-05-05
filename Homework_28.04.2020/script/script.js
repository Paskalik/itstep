'use strict';

import {Products} from '../modules/products.js';

let ProductsList = [
    {id: 1, name: 'APPLE', price: 1.02},
    {id: 2, name: 'PEAR', price: 1.52},
    {id: 3, name: 'BANANA', price: 2.00},
    {id: 4, name: 'MANGO', price: 5.60},
    {id: 5, name: 'ORANGE', price: 2.35},
    {id: 6, name: 'LIME', price: 3.90},
    {id: 7, name: 'APRICOT', price: 4.10},
    {id: 8, name: 'AVOCADO', price: 5.90},
    {id: 9, name: 'PAPAYA', price: 7.00},
    {id: 10, name: 'RASPBERRY', price: 4.60},
    {id: 11, name: 'LEMON', price: 3.45}
];

let products = new Products(ProductsList);
products.loadProducts();

let btnSort = document.getElementById('btn');

function mySort(arr, cmp) {
    arr.sort(cmp);
    products.loadProducts();
}

btnSort.onclick = () => {
    let sortVal = document.getElementById('type');
    sortVal = sortVal[sortVal.selectedIndex].value;
    mySort(products.products, (a, b) => ((b[sortVal] < a[sortVal]) - (a[sortVal] < b[sortVal])));
}