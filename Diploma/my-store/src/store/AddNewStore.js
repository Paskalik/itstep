import React from "react";
import "../index.css";
import FolderIcon from '@material-ui/icons/Folder';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Picker from './Picker';
import {Service} from '../service/DBService';

export default class AddNewStore extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            color: "default",
            name: ""
        }

        this.handleSubmitStore = this.handleSubmitStore.bind(this);
        this.handleNewColor = this.handleNewColor.bind(this);
        this.handleName = this.handleName.bind(this)
    }

    handleSubmitStore(event) {
        event.preventDefault();
        let newStore = {
            name: this.state.name,
            color: this.state.color
        }
        Service.put('storage',newStore);
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
            <Popup trigger={
            <FolderIcon color="secondary" className="right"/>
            } modal nested>
                {close => (
                        <div className="modal">
                            <button className="close" onClick={close}>
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
                                        close();
                                    }}
                                >
                                    Отмена
                                </button>
                                <button className="button" onClick={(event) => {this.handleSubmitStore(event); close()}}>Сохранить</button>
                            </div>
                        </div>
                )}
            </Popup>
        )
    }
}
