import React from "react";
import "../index.css";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import StoreList from './StoreList';
import CategoryList from './CategoryList';
import moment from 'moment';
import {Service} from '../service/DBService';

export default class AddProduct extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            place: "",
            color: "",
            category: "",
            dateFrom: moment().format(),
            dateTo: moment().format(),
            days: "0",
            count: "1",
            checked: false
        };

        this.handleAdd = this.handleAdd.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleStorage = this.handleStorage.bind(this);
        this.handleCategory = this.handleCategory.bind(this);
        this.handleCount = this.handleCount.bind(this);
        this.handleFrom = this.handleFrom.bind(this);
        this.handleDays = this.handleDays.bind(this);
        this.handleTo = this.handleTo.bind(this);
        this.toggleState = this.toggleState.bind(this);

    }

    toggleState() {
        this.setState({
            name: "",
            place: "",
            color: "",
            category: "",
            dateFrom: moment().format(),
            dateTo: moment().format(),
            days: "0",
            count: "1",
            checked: false
        })
    }

    handleAdd(event) {
        event.preventDefault();
            let newProduct = {
                name: this.state.name
            };
            let newStoreProduct = {
                store: this.state.place,
                category: this.state.category,
                product: this.state.name,
                quantity: this.state.count,
                date_issued: !this.state.checked ? this.state.dateFrom : null,
                date_expired: !this.state.checked ? this.state.dateTo : null,
                days: !this.state.checked ? this.state.days : null
            };
            Service.add('product', newProduct);
            Service.add('store_product', newStoreProduct);
        this.props.updateSave();
        this.toggleState();

    }

    handleCheckboxChange(event) {
        this.setState({ checked: event.target.checked })
    }

    handleName(event) {
        this.setState({
            name: event.target.value
        })
    }

    handleCount(event) {
        this.setState({
            count: event.target.value
        })
    }

    handleFrom(event) {
        this.setState({dateFrom: event.target.value,
            dateTo: moment(event.target.value).add(event.target.value, 'days').format()});
    }

    handleDays(event) {
        this.setState({days: event.target.value,
            dateTo: moment(this.state.dateFrom).add(event.target.value, 'days').format()})
    }

    handleTo(event) {
        this.setState({dateTo: event.target.value,
            days: moment.duration(moment(event.target.value).diff(moment(this.state.dateFrom))).days()});
    }

    handleStorage(name) {
        this.setState({place: name})
    }

    handleCategory(name) {
        this.setState({category: name})
    }

    render() {
        return (
            <Popup open={this.props.open} modal nested>
                <form onSubmit={(event) => {this.handleAdd(event); this.props.close()}}>
                <div className="modal">
                    <button className="close" onClick={() => {this.props.updateSave(); this.props.close()}}>
                        &times;
                    </button>
                    <div className="header">Новый продукт</div>
                    <div className="content">
                        <input
                            placeholder="Наименование продукта"
                            required="required"
                            onChange={this.handleName}
                            defaultValue={this.state.name}
                        />
                        <ul className={this.state.checked ? "afterCheck" : "beforeCheck"}>
                            <li>
                                <input
                                    placeholder="Годен с"
                                    type="date"
                                    onChange={this.handleFrom}
                                    required={this.state.checked ? "" : "required"}
                                    value={this.state.dateFrom.split('T')[0]}
                                />
                            </li>
                            <li>
                                <input
                                    type="number"
                                    placeholder="Дней"
                                    value={this.state.days}
                                    className="days"
                                    min={0}
                                    onChange={this.handleDays}
                                    required={this.state.checked ? "" : "required"}
                                />
                            </li>
                            <li>
                                <input
                                    placeholder="Годен до"
                                    type="date"
                                    onChange={this.handleTo}
                                    required={this.state.checked ? "" : "required"}
                                    value={this.state.dateTo.split('T')[0]}
                                />
                            </li>
                        </ul>

                        <input type="number"
                               placeholder="Количество"
                               value={this.state.count}
                               min={1}
                               className="counter"
                               required="required"
                               onChange={this.handleCount}
                        />
                        <StoreList update={this.handleStorage} storages = {this.props.storages}/>
                        <CategoryList update={this.handleCategory} categories = {this.props.categories}/>
                        <label>
                            <input type="checkbox" checked={this.state.checked} onChange={this.handleCheckboxChange}/>
                            Без срока годности
                        </label>
                    </div>
                    <div className="actions">
                        <button
                            className="button"
                            onClick={() => {
                                this.props.updateSave();
                                this.props.close();
                            }}
                        >
                            Отмена
                        </button>
                        <button className="button" type="submit">Сохранить</button>
                    </div>
                </div>
            </form>
            </Popup>
        )
    }
}
