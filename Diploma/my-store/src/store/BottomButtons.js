import React from "react";
import "../index.css";
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import StoreList from './StoreList';
import CategoryList from './CategoryList';
import moment from 'moment';

export default class BottomButtons extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            place: "",
            color: "",
            category: "",
            dateFrom: moment().format(),
            dateTo: moment().format(),
            days: 0,
            count: 1,
            checked: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleStorage = this.handleStorage.bind(this);
        this.handleCategory = this.handleCategory.bind(this);
        this.handleFrom = this.handleFrom.bind(this);
        this.handleDays = this.handleDays.bind(this);
        this.handleTo = this.handleTo.bind(this);
        this.handleSearch = this.handleSearch.bind(this);

    }

    handleSubmit(event) {
        event.preventDefault();
        this.checkForm();
    }

    handleCheckboxChange(event) {
        this.setState({ checked: event.target.checked })
    }

    handleName(event) {
        this.setState({
            name: event.target.value
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

    handleStorage(name,color) {
        this.setState({place: name,
        color: color})
    }

    handleCategory(name) {
        this.setState({category: name})
    }

    handleSearch() {
        this.props.update();
    }

    checkForm() {
        alert("Submit")
    }


    render() {
        return (
            <div className="BottomButton">
                <Popup trigger={<Button
                    variant="outlined"
                    color="secondary"
                    size="large"
                    startIcon={<AddIcon />}
                >
                    Add
                </Button>} modal nested>
                    {close => (
                        <form onSubmit={this.handleSubmit}>
                        <div className="modal">

                            <button className="close" onClick={close}>
                                &times;
                            </button>
                            <div className="header">Новый продукт</div>
                            <div className="content">
                                <input
                                placeholder="Наименование продукта"
                                required="required"
                                onChange={this.handleName}
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
                                        close();
                                    }}
                                >
                                    Отмена
                                </button>
                                <button className="button" type="submit">Сохранить</button>
                            </div>

                        </div>
                        </form>
                    )}
                </Popup>
                <Button
                    variant="outlined"
                    color="primary"
                    size="large"
                    type="search"
                    startIcon={<SearchIcon />}
                    onClick={this.handleSearch}
                >
                    Search
                </Button>
            </div>
        )
    }
}
