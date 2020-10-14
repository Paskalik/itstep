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
            show: "",
            showCat: ""
        };

        this.handleSearch = this.handleSearch.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.getPots = this.getPots.bind(this);
        this.toggleShow = this.toggleShow.bind(this);
        this.toggleShowCat = this.toggleShowCat.bind(this);
        this.getCategories = this.getCategories.bind(this);
        this.getProducts = this.getProducts.bind(this);
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
            }, () => {console.log(this.state.show)})
        }
    }

    toggleShowCat(name) {
        let nameOld = this.state.showCat;
        if (nameOld === name) {
            this.setState({
                showCat: ""
            })
        } else {
            this.setState({
                showCat: name
            }, () => {console.log(this.state.showCat)})
        }
    }

    getProducts(store, category) {
        let products = [];
        let pots = [];
        this.props.storeProduct.map((val) => {
            if (val.store === store && val.category === category) {
                products.push(val);
                if (val.days !== null) {
                    let daysLeft = moment.duration(moment(val.date_expired).diff(moment())).days();
                    if (daysLeft > 5) {
                        return pots.push(Color.excellent);
                    } else {
                        if (daysLeft > 0) {
                            return pots.push(Color.good);
                        } else return pots.push(Color.bad);
                    }
                }
                else {
                    return pots.push(Color.excellent);
                }
            }
        })
        return (
                    products.map((val, i) => {
                            return (
                                <li key={i} style={{background: `linear-gradient(to right, ${pots[i]} 40%, #fff)`}}>
                                    {val.product}
                                </li>
                            )
                        }
                    )
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
                    categories.map((val, i) => {
                        return (
                            <>
                                <li key={i} onClick={() => {
                                    this.toggleShowCat(val)
                                }}>
                                    {val}
                                </li>
                                {this.state.showCat === val &&
                                this.getProducts(store, val)
                                }
                            </>
                        )
                    })
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
                        <li key={i} style={{background: `linear-gradient(to right, ${val.color} 60%, #b4b1b1)`, position: "relative"}} onClick={() => {this.toggleShow(val.name)}}>
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
