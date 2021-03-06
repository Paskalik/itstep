import React from "react";
import "../index.css";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Picker from './Picker';
import {Service} from '../service/DBService';
import {ColorDefault} from '../data/Data';

export default class AddNewStore extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            color: ColorDefault,
            name: ""
        }

        this.handleSubmitStore = this.handleSubmitStore.bind(this);
        this.handleNewColor = this.handleNewColor.bind(this);
        this.handleName = this.handleName.bind(this)
    }

    handleSubmitStore(event) {
        event.preventDefault();
        event.stopPropagation();
        let newStore = {
            name: this.state.name,
            color: this.state.color
        }
        Service.add('storage',newStore);
        this.props.update(this.state.name, this.state.color);
    }

    handleNewColor(color) {
        this.setState({
            color: color
        })
    }

    handleName(event) {
        this.setState({
            name: event.target.value
        })
    }

    render() {
        return (
            <Popup open={this.props.open} modal nested>
                <form onSubmit={(event) => {this.handleSubmitStore(event); this.props.toggle()}}>
                        <div className="modal">
                            <button className="close" onClick={this.props.toggle}>
                                &times;
                            </button>
                            <div className="header">
                                Место хранения
                            </div>
                            <div className="content">
                                <input placeholder="Наименование" required="required" onChange={this.handleName}/>
                                <Picker color={this.state.color} update={this.handleNewColor}/>
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
                                <button className="button" type="submit">Сохранить</button>
                            </div>
                        </div>
                </form>
            </Popup>
        )
    }
}
