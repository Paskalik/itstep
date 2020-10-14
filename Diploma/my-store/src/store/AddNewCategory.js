import React from "react";
import "../index.css";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import {Service} from '../service/DBService';

export default class AddNewCategory extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: ""
        }

        this.handleSubmitCategory = this.handleSubmitCategory.bind(this);
        this.handleName = this.handleName.bind(this)
    }

    handleSubmitCategory(event) {
        event.preventDefault();
        let newCategory = {
            name: this.state.name
        }
        Service.add('category', newCategory);
            this.props.update(this.state.name);
    }

    handleName(event) {
        this.setState({
            name: event.target.value
        })
    }

    render() {
        return (
            <Popup open={this.props.open} modal nested>
                    <div className="modal">
                        <button className="close" onClick={this.props.toggle}>
                            &times;
                        </button>
                        <div className="header">
                            Новая категория
                        </div>
                        <div className="content">
                            <input placeholder="Наименование" required="required" onChange={this.handleName}/>
                        </div>
                        <div className="actions">
                            <button
                                className="button"
                                onClick={() => {
                                    this.props.toggle();
                                }}
                            >
                                Отмена
                            </button>
                            <button className="button" onClick={(event) => {this.handleSubmitCategory(event); this.props.toggle()}}>Сохранить</button>
                        </div>
                    </div>
            </Popup>
        )
    }
}
