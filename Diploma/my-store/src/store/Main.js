import React from "react";
import "../index.css";
import CustomMenu from '../menu/Menu'
import MainContent from '../menu/MainContent';
import Catalog from '../menu/Catalog';
import Category from '../menu/Category';
import Store from '../menu/Store';
import {Service} from '../service/DBService';

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            storages: [],
            categories: [],
            products: [],
            storeProduct: [],
            comp: "",
            update: false
        };
        Service.init();
        this.getStorages = this.getStorages.bind(this);
        this.getCategories = this.getCategories.bind(this);
        this.getProducts = this.getProducts.bind(this);
        this.getStoreProduct = this.getStoreProduct.bind(this);
        this.getData = this.getData.bind(this);
        this.getComponent = this.getComponent.bind(this);
        this.updateState = this.updateState.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    handleSave() {
        this.getData();
    }

    getStorages() {
        Service.getAll('storage').then(storages => {
            this.setState({storages: storages});
        })
    }

    getCategories() {
        Service.getAll('category').then(categories => {
            this.setState({categories: categories});
        })
    }

    getProducts() {
        Service.getAll('product').then(products => {
            this.setState({products: products});
        })
    }

    getStoreProduct() {
        Service.getAll('store_product').then(storeProduct => {
            this.setState({storeProduct: storeProduct});
        })
    }

    getData() {
        this.getStoreProduct();
        this.getCategories();
        this.getStorages();
        this.getProducts();
    }

    updateState(comp) {
        this.setState({comp: comp})
    }

    getComponent() {
        if (this.state.comp === "MainContent" || !this.state.comp) {
            return (
                <MainContent
                    storages={this.state.storages}
                    categories = {this.state.categories}
                    storeProduct = {this.state.storeProduct}
                    update={this.handleSave}
                />
            )
        } else
        if (this.state.comp === "Catalog") {
            return <Catalog products={this.state.products} updateComponent={this.handleSave}/>
        } else if (this.state.comp === "Category") {
            return <Category categories={this.state.categories}/>
        } else if (this.state.comp === "Store") {
            return <Store storages={this.state.storages}/>
        }
    }

    componentDidMount() {
        this.getData();
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
