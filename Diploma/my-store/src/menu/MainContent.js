import React from "react";
import "../index.css";
import BottomButtons from "../store/BottomButtons";
import moment from "moment";
import { Color } from '../data/Data';

export default class Catalog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: false,
            show: ""
        };

        this.handleSearch = this.handleSearch.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.getPots = this.getPots.bind(this);
        this.toggleShow = this.toggleShow.bind(this);
        this.getCategories = this.getCategories.bind(this);
    }

    handleSearch() {
        this.setState({search: true})
    }

    handleSave() {
        this.props.update()
    }

    toggleShow(name) {
        let nameOld = this.state.show;
        if (nameOld === name) {
            this.setState({
                show: ""
            })
        } else {
            this.setState({
                show: name
            })
        }
    }

    getProducts(store, category) {
        let products = [];
        this.props.storeProduct.map((val) => {
            if (val.store === store && val.category === category) {
                if (!products.some((el)=> el === val.product)) {
                    products.push(val.product)
                }
            }
        })
        return (
            (products.length > 0) ?
                products.map((val,i) => {
                        return (
                            <li key={i}>
                                {val}
                            </li>
                        )
                    }
                )
                : <li>Место хранения пустое</li>
        )
    }

    getCategories(store) {
        let categories = [];
        this.props.storeProduct.map((val) => {
            if (val.store === store) {
                if (!categories.some((el)=> el === val.category)) {
                    categories.push(val.category)
                }
            }
        })
        return (
            (categories.length > 0) ?
                        categories.map((val,i) => {
                                return (
                                <li key={i}>
                                    {val}
                                    {this.getProducts(store, val)}
                                </li>
                                )
                            }
                            )
             : <li>Место хранения пустое</li>
        )
    }

    getPots(name) {
        let pots = [];
        let excellent = 0;
        let good = 0;
        let bad = 0;
        this.props.storeProduct.map((val) => {
                if (val.store === name) {
                    if (val.days !== null) {
                        let daysLeft = moment.duration(moment(val.date_expired).diff(moment())).days();
                        if (daysLeft > 5) {
                            return excellent++;
                        } else {
                            if (daysLeft > 0) {
                                return good++;
                            } else return bad++;
                    }
                    }
                    else {
                        return excellent++;
                    }
                }
            }

        )
        pots.push(excellent,good,bad)
        return pots;
    }

    render() {
        return (
            <div>
                <div className="search">
                    {this.state.search &&
                    <input type="search" placeholder="Введите текст для поиска"/>}
                </div>
            {(this.props.storages.length > 0) ? (
            <ul className="listStore" >
                {this.props.storages.map((val,i) => {
                    const pots = this.getPots(val.name);
                    return (
                        <>
                        <li key={i} style={{backgroundColor: val.color, position: "relative"}} onClick={() => {this.toggleShow(val.name)}}>
                            {val.name}
                            <div className="Pots">
                                {pots[0] > 0 &&
                                <div style={{borderColor: Color.excellent, backgroundColor: Color.excellent}}>{pots[0]}</div>}
                                {pots[1] > 0 &&
                                <div style={{borderColor: Color.good, backgroundColor: Color.good}}>{pots[1]}</div>}
                                {pots[2] > 0 &&
                                <div style={{borderColor: Color.bad, backgroundColor: Color.bad}}>{pots[2]}</div>}
                            </div>
                        </li>
                            {this.state.show === val.name &&
                                this.getCategories(val.name)
                            }
                        </>
                    )
                })}
            </ul>) :
                (<p>Отсутствуют места хранения</p>)}
            <BottomButtons categories = {this.props.categories} storages = {this.props.storages} updateSave={this.handleSave} updateSearch={this.handleSearch} />
            </div>
        )
    }
}
