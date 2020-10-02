import React from "react";
import "../index.css";
import CustomMenu from '../menu/Menu'
import BottomButtons from './BottomButtons';

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            storages: {},
            categories: {}
        };
        this.getStorages = this.getStorages.bind(this);
        this.getCategories = this.getCategories.bind(this);
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
                name: "Без места"
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
                    allStorages.push(cursor.value.name);
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
                    allCategories.push(cursor.value.name);
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

    componentDidMount() {
        this.openDB();
        this.getStorages();
        this.getCategories();
    }

    render() {
        console.log(this.state.categories)
        console.log(this.state.storages)
        return (
            <div>
                <CustomMenu/>
                <div>
                    <ul className="listStore">
                        {Object.keys(this.state.storages).map((val) => {
                            return (
                                <li key={val}>
                                    {this.state.storages[val]}
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <BottomButtons categories = {this.state.categories} storages = {this.state.storages}/>
            </div>
        )
    }
}
