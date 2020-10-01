import React from 'react';
import './App.css';
import Main from './store/Main';

class App extends React.Component{
    constructor(props) {
        super(props);
        this.storages = [];
    }

    openDB() {
        let openRequest = indexedDB.open("store", 1);

        openRequest.onupgradeneeded = function() {
            let db = openRequest.result;
            db.createObjectStore('storage', {keyPath: 'id', autoIncrement: true});
            db.createObjectStore('category', {keyPath: 'id', autoIncrement: true});
            db.createObjectStore('category_product', {keyPath: 'id', autoIncrement: true});
            db.createObjectStore('product', {keyPath: 'id', autoIncrement: true});
            db.createObjectStore('store_product', {keyPath: 'id', autoIncrement: true});
        };
        openRequest.onsuccess = function() {
            let db = openRequest.result;
            let transactionStore = db.transaction('storage', 'readwrite');
            let transactionCategory = db.transaction('category', 'readwrite');
            let storages = transactionStore.objectStore('storage');
            let categories = transactionCategory.objectStore('category');
            let storage = {
                id: 1,
                name: "Без места"
            };
            let category = {
                id: 1,
                name: "Без категории"
            };
            storages.add(storage);
            categories.add(category);
        }
    }

    loadData() {
        let openRequest = indexedDB.open("store");
        openRequest.onsuccess = function() {
            let db = openRequest.result;
            let transactionStore = db.transaction('storage', 'readonly');
            let storage = transactionStore.objectStore('storage');
            let getStorages = storage.getAll();
            console.log(getStorages);
            getStorages.onsuccess = function() {
                this.storages = getStorages.result.name;
                console.log(getStorages.result.name);
            }
        }
    }

    componentDidMount() {
        this.openDB();
        this.loadData();
    }

    render() {
        return (
            <div className="App">
                <Main/>
            </div>
        );
    }
}

export default App;
