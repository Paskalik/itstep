import React from "react";
import "../index.css";
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export default class BottomButtons extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            checked: false,
            start: new Date,
            end: new Date
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.handleChangePlace = this.handleChangePlace.bind(this);
        this.handleChangeCategory = this.handleChangeCategory.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.checkForm();
    }

    handleCheckboxChange(event) {
        this.setState({ checked: event.target.checked })
    }

    handleChangePlace(event) {
        event.preventDefault();
    }

    handleChangeCategory(event) {
        event.preventDefault();
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
                                            <button onClick={this.handleChangePlace}>
                                                {this.props.storages[0]}
                                            </button>
                                <button onClick={this.handleChangeCategory}>
                                                {this.props.categories[0]}
                                </button>
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
