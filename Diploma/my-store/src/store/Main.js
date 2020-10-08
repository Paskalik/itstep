import React from "react";
import "../index.css";
import CustomMenu from '../menu/Menu'
import MainContent from '../menu/MainContent';
import Catalog from '../menu/Catalog';
import Category from '../menu/Category';
import Store from '../menu/Store';

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            storages: [],
            categories: [],
            products: [],
            comp: "",
            search: false
        };
        this.getStorages = this.getStorages.bind(this);
        this.getCategories = this.getCategories.bind(this);
        this.getProducts = this.getProducts.bind(this);
        this.getComponent = this.getComponent.bind(this);
        this.updateState = this.updateState.bind(this);
        this.openDB = this.openDB.bind(this);
    }

    openDB() {
        let db;
        let openRequest = indexedDB.open('store', 1);
        openRequest.onupgradeneeded = () => {
            db = openRequest.result;
            let storages = db.createObjectStore('storage', {keyPath: 'id', autoIncrement: true});
            storages.createIndex('store_idx', 'name', {'unique':true});
            let storage = {
                name: "Без места",
                color: "red"
            };
            storages.add(storage);
            let categories = db.createObjectStore('category', {keyPath: 'id', autoIncrement: true});
            categories.createIndex('category_idx', 'name', {'unique':true});
            let category = {
                name: "Без категории"
            };
            categories.add(category);
            db.createObjectStore('category_product', {keyPath: 'id', autoIncrement: true});
            let product = db.createObjectStore('product', {keyPath: 'id', autoIncrement: true});
            product.createIndex('product_idx', 'name', {'unique':true});
            db.createObjectStore('store_product', {keyPath: 'id', autoIncrement: true});
        };
        openRequest.onerror = () => {
            alert('error opening database ' + openRequest.errorCode);
        }
    }

    getStorages() {
        let db;
        let openRequest = indexedDB.open('store');
        openRequest.onsuccess = () => {
            db = openRequest.result;
            let transactionStore = db.transaction('storage', 'readonly');
            let storage = transactionStore.objectStore('storage');
            let request = storage.openCursor();
            let allStorages = [];
            request.onsuccess = () => {
                let cursor = request.result;
                if (cursor !== null) {
                    allStorages.push(cursor.value);
                    cursor.continue();
                } else {
                    this.setState({storages: allStorages})
                }
            }
            request.onerror = () => {
                alert('error in cursor request ' + request.errorCode);
            }
        }
    }

    getCategories() {
        let db;
        let openRequest = indexedDB.open('store');
        openRequest.onsuccess = () => {
            db = openRequest.result;
            let transactionCategory = db.transaction('category', 'readonly');
            let category = transactionCategory.objectStore('category');
            let request = category.openCursor();
            let allCategories = [];
            request.onsuccess = () => {
                let cursor = request.result;
                if (cursor !== null) {
                    allCategories.push(cursor.value);
                    cursor.continue();
                } else {
                    this.setState({categories: allCategories})
                }
            }
            request.onerror = () => {
                alert('error in cursor request ' + request.errorCode);
            }
        }
    }

    getProducts() {
        let db;
        let openRequest = indexedDB.open('store');
        openRequest.onsuccess = () => {
            db = openRequest.result;
            let transactionProduct = db.transaction('product', 'readonly');
            let product = transactionProduct.objectStore('product');
            let request = product.openCursor();
            let allProducts = [];
            request.onsuccess = () => {
                let cursor = request.result;
                if (cursor !== null) {
                    allProducts.push(cursor.value);
                    cursor.continue();
                } else {
                    this.setState({products: allProducts})
                }
            }
            request.onerror = () => {
                alert('error in cursor request ' + request.errorCode);
            }
        }
    }

    updateState(comp) {
        this.setState({comp: comp})
    }

    getComponent() {
        if (this.state.comp === "MainContent" || !this.state.comp) {
            return (<MainContent storages={this.state.storages} categories = {this.state.categories} search={this.state.search}/>
            )
        } else
        if (this.state.comp === "Catalog") {
            return <Catalog products={this.state.products} search={this.state.search}/>
        } else if (this.state.comp === "Category") {
            return <Category categories={this.state.categories} search={this.state.search}/>
        } else if (this.state.comp === "Store") {
            return <Store storages={this.state.storages} search={this.state.search}/>
        }
    }

    componentDidMount() {
        this.openDB();
        this.getStorages();
        this.getCategories();
    }

    render() {
        return (
            <div>
                <CustomMenu update={this.updateState}/>
                {this.getComponent()}
            </div>
        )
    }
}
