import { ColorDefault } from '../data/Data';

const db_name = 'store';
const db_version = 1;
let db;

const storage = {
    name: "Без места",
    color: ColorDefault
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
            storeProduct.createIndex('storeProductSt_idx', 'store');
            storeProduct.createIndex('storeProductCat_idx', 'category');
            storeProduct.createIndex('storeProductPr_idx', 'product');
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

    getByIndex(tablespace, variant, name) {
        let list = [];
        return new Promise((resolve) => {
            let openRequest = indexedDB.open(db_name);
            openRequest.onsuccess = () => {
                db = openRequest.result;
                let trans = db.transaction(tablespace, 'readonly');
                let store = trans.objectStore(tablespace);
                let indexReq;
                switch (variant) {
                    case 'product':
                        indexReq = store.index('storeProductPr_idx');
                        break;
                    case 'category':
                        indexReq = store.index('storeProductCat_idx');
                        break;
                    case 'storage':
                        indexReq = store.index('storeProductSt_idx');
                        break;
                    default:
                        break;
                }
                indexReq.openCursor().onsuccess = (event) => {
                    let cursor = event.target.result;
                    if (cursor) {
                        if (cursor.value.product === name) {
                            list.push(cursor.value);
                        }
                        cursor.continue();
                    }
                    else resolve(list);
                }
            }
            openRequest.onerror = () => {
                alert('error opening database ' + openRequest.errorCode);
            }
        })
    }

    add(tablespace, object) {
        return new Promise((resolve) => {
            let openRequest = indexedDB.open(db_name);
            openRequest.onsuccess = () => {
                db = openRequest.result;
                let trans = db.transaction(tablespace, 'readwrite');
                let store = trans.objectStore(tablespace);
                let request = store.add(object);
                request.onsuccess = () => {
                    resolve(request.result)
                }
            }
            openRequest.onerror = () => {
                alert('error opening database ' + openRequest.errorCode);
            }
        })
    }

    put(tablespace, object) {
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

    delete(tablespace, key) {
        return new Promise((resolve,reject) => {
            let openRequest = indexedDB.open(db_name);
            openRequest.onsuccess = () => {
                db = openRequest.result;
                let trans = db.transaction(tablespace, 'readwrite');
                let store = trans.objectStore(tablespace);
                let request = store.delete(key);
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
}

export const Service = new DBService()