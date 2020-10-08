import * as idb from 'idb';
const db_name = 'store';
const db_version = 1;
let db;

const storage = {
    name: "Без места",
    color: "red"
};
const category = {
    name: "Без категории"
};

class DBService {

    init() {
        let openRequest = indexedDB.open(db_name, db_version);
        openRequest.onupgradeneeded = () => {
            db = openRequest.result;
            let storages = db.createObjectStore('storage', {keyPath: 'id', autoIncrement: true});
            storages.createIndex('store_idx', 'name', {'unique':true});
            storages.put(storage);
            let categories = db.createObjectStore('category', {keyPath: 'id', autoIncrement: true});
            categories.createIndex('category_idx', 'name', {'unique':true});
            categories.put(category);
            let product = db.createObjectStore('product', {keyPath: 'id', autoIncrement: true});
            product.createIndex('product_idx', 'name', {'unique':true});
            let storeProduct = db.createObjectStore('store_product', {keyPath: 'id', autoIncrement: true});
            storeProduct.createIndex('storeProduct_idx', 'store');
        };
        openRequest.onerror = () => {
            alert('error opening database ' + openRequest.errorCode);
        }
    }

    getAll(tablespace) {
        return new Promise((resolve,reject) => {
            let openRequest = indexedDB.open(db_name);
            openRequest.onsuccess = () => {
                db = openRequest.result;
                let trans = db.transaction(tablespace, 'readonly');
                let store = trans.objectStore(tablespace);
                let request = store.getAll();
                request.onsuccess = () => {
                    resolve(request.result)
                }
                request.onerror = () => {
                    reject(request.error)
                }
            }
            openRequest.onerror = () => {
                alert('error opening database ' + openRequest.errorCode);
            }
        })
    }

    put(tablespace, object, key = null) {
        return new Promise((resolve,reject) => {
            let openRequest = indexedDB.open(db_name);
            openRequest.onsuccess = () => {
                db = openRequest.result;
                let trans = db.transaction(tablespace, 'readwrite');
                let store = trans.objectStore(tablespace);
                let request = store.put(object);
                request.onsuccess = () => {
                    resolve(request.result)
                }
                request.onerror = () => {
                    reject(request.error)
                }
            }
            openRequest.onerror = () => {
                alert('error opening database ' + openRequest.errorCode);
            }
        })
    }

   /* delete(tablespace, key) {
        return dbPromise.then(db => {
            return db.transaction(tablespace, 'readwrite').objectStore(tablespace).delete(key);
        }).catch(error => {
            alert('error in db: ' + error);
        });
    }

    deleteAll(tablespace) {
        return dbPromise.then(db => {
            return db.transaction(tablespace, 'readwrite').objectStore(tablespace).clear();
        }).catch(error => {
            alert('error in db: ' + error);
        });
    }*/
}

export const Service = new DBService()