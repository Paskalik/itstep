import React from "react";
import "../index.css";
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import StoreList from './StoreList';
import AddNewCategory from './AddNewCategory';

export default class BottomButtons extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            choosePlace: false,
            place: "",
            color: "",
            checked: false,
            start: new Date,
            end: new Date
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.handleChooseCategory = this.handleChooseCategory.bind(this);
        this.getFirstCategory = this.getFirstCategory.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.checkForm();
    }

    handleCheckboxChange(event) {
        this.setState({ checked: event.target.checked })
    }

    handleChooseCategory() {
        alert("Category choose")
    }

    getFirstCategory() {
        let obj = this.props.categories[0];
        for (let key in obj) {
            if (obj.hasOwnProperty(key) && (key === 'name')) {
                return obj[key]
            }}
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
                                />
                                <ul className={this.state.checked ? "afterCheck" : "beforeCheck"}>
                                    <li>
                                        <input
                                            placeholder="Годен с"
                                            type="date"
                                            required={this.state.checked ? "" : "required"}
                                            defaultValue={this.state.start.toISOString().split('T')[0]}
                                        />
                                    </li>
                                    <li><input placeholder="Дней" className="days"/></li>
                                    <li><input placeholder="Годен до" type="date"/></li>
                                </ul>

                                <input type="number"
                                       defaultValue="1"
                                       min="1"
                                       className="counter"
                                       required="required"
                                />
                                <StoreList categories = {this.props.categories} storages = {this.props.storages}/>
                                <Popup trigger={
                                <Button variant="outlined">
                                    {this.getFirstCategory()}
                                    </Button>
                                } modal nested>
                                    {close => (
                                        <form onSubmit={this.handleSubmit}>
                                            <div className="modal">

                                                <button className="close" onClick={close}>
                                                    &times;
                                                </button>
                                                <div className="header">
                                                    Выберите категорию
                                                    <AddNewCategory/>
                                                </div>
                                                <div className="content">
                                                    <ul className="listChoose">
                                                        {this.props.categories.map((val,i) => {
                                                            return (
                                                                <li key={i} onClick={this.handleChooseCategory}>
                                                                    {val.name}
                                                                </li>
                                                            )
                                                        })}
                                                    </ul>
                                                </div>
                                            </div>
                                        </form>
                                    )}
                                </Popup>
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
                    startIcon={<SearchIcon />}
                >
                    Search
                </Button>
            </div>
        )
    }
}
