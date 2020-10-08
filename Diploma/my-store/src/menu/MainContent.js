import React from "react";
import "../index.css";
import BottomButtons from "../store/BottomButtons";
import Pots from '../store/Pots';
import moment from "moment";

export default class Catalog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: false
        };

        this.handleSearch = this.handleSearch.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.getPots = this.getPots.bind(this);
    }

    handleSearch() {
        this.setState({search: true})
    }

    handleSave() {
        this.props.update()
    }

    getPots(name) {
        let pots = [];
        let excellent = 0;
        let good = 0;
        let bad = 0;
        this.props.storeProduct.map((val) => {
                if (val.store === name) {
                    if (!val.days) {
                        return excellent++;
                    } else {
                        let daysLeft = moment.duration(moment(val.date_expired).diff(moment())).days();
                        if (daysLeft > 5) {
                            return excellent++;
                        } else {
                            if (daysLeft >= 0) {
                                return good++;
                            }
                            else return bad++;
                        }
                    }
                }
            }
        )
        pots.push(excellent,good,bad)
        console.log(pots)
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
                        <li key={i} style={{backgroundColor: val.color}}>
                            {val.name}
                            <div className="right">
                                {pots[0] > 0 &&
                                <span style={{border: "1px solid green", borderRadius: "50%", padding: "5px", backgroundColor: "green"}}>{pots[0]}</span>}
                                {pots[1] > 0 &&
                                <span style={{border: "1px solid yellow", borderRadius: "50%"}}>{pots[1]}</span>}
                                {pots[2] > 0 &&
                                <span style={{border: "1px solid red", borderRadius: "50%"}}>{pots[2]}</span>}
                            </div>
                        </li>
                    )
                })}
            </ul>) :
                (<p>Отсутствуют места хранения</p>)}
            <BottomButtons categories = {this.props.categories} storages = {this.props.storages} updateSave={this.handleSave} updateSearch={this.handleSearch} />
            </div>
        )
    }
}
