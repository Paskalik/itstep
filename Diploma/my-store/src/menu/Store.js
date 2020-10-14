import React from "react";
import "../index.css";
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import {Service} from '../service/DBService';
import Popup from "reactjs-popup";
import EditIcon from "@material-ui/icons/Edit";
import Picker from '../store/Picker';
import AddNewStore from "../store/AddNewStore";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";

export default class Store extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: 0,
            nameOld: "",
            nameNew: "",
            colorOld: "",
            colorNew: "",
            open: false,
            addStore: false
        }

        this.handleAdd = this.handleAdd.bind(this);
        this.handleValues = this.handleValues.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleColor = this.handleColor.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.toggleValues = this.toggleValues.bind(this);
        this.toggleAddStore = this.toggleAddStore.bind(this);
    }

    handleAdd() {
        this.props.update();
    }

    toggleValues() {
        this.setState({
            id: 0,
            nameOld: "",
            nameNew: "",
            colorOld: "",
            colorNew: "",
            open: false
        })
    }

    handleValues(id, name, color) {
        this.setState({
            id: +id,
            nameOld: name,
            colorOld: color,
            open: true
        })
    }

    handleName(event) {
        this.setState({
            nameNew: event.target.value
        })
    }

    handleColor(color) {
        this.setState({
            colorNew: color
        })
    }

    handleEdit() {
        const name = this.state.nameNew ? this.state.nameNew : this.state.nameOld;
        const color = this.state.colorNew ? this.state.colorNew : this.state.colorOld;
        let updatedStore = {
            id: this.state.id,
            name: name,
            color: color
        };
        Service.getByIndex('store_product', 'storage', this.state.nameOld).then(
            list => {
                list.map((val) => {
                    val.store = name;
                    Service.put('store_product', val);
                })
            }
        )
        Service.put('storage', updatedStore);
        this.props.update();
    }

    handleDelete(id, name) {
        Service.getByIndex('store_product', 'storage', name).then(
            list => {
                if (list.length > 0) {
                    const resultConfirm = window.confirm('Данное место хранение содержит продукты. Точно хотите его удалить?');
                    if (resultConfirm) {
                        list.map((val) => {
                            Service.delete('store_product', +val.id);
                        })
                        Service.delete('storage',+id);
                        this.props.update();
                    }
                }
                else {
                    Service.delete('storage', +id);
                    this.props.update();
                }
            }
        );
    }

    toggleAddStore() {
        this.setState({
            addStore: !this.state.addStore
        })
    }

    render() {
        return (
            <>
            <div className="BottomButton">
                <Button
                    variant="outlined"
                    color="secondary"
                    size="large"
                    onClick={() => {this.toggleAddStore()}}
                    startIcon={<AddIcon />}
                >
                    Add
                </Button>
                <AddNewStore open={this.state.addStore} toggle={this.toggleAddStore} update={(name, color) => {this.handleAdd(name, color)}}/>
            </div>
            <div>
                {(this.props.storages.length > 0) ? (
                        <ul className="listStore">
                            {this.props.storages.map((val,i) => {
                                return (
                                    <li key={i} style={{backgroundColor: val.color, cursor: "default"}}>
                                        {val.name}
                                        {val.id > 1 &&
                                        <DeleteForeverOutlinedIcon className="right" onClick={() => {
                                            this.handleDelete(val.id, val.name)
                                        }}/>
                                        }
                                        {val.id > 1 &&
                                            <EditIcon className="right" onClick={() => {this.handleValues(val.id, val.name, val.color)}}/>}
                                            <Popup open={this.state.open} modal nested>
                                                <div className="modal">
                                                    <button className="close" onClick={this.toggleValues}>
                                                        &times;
                                                    </button>
                                                    <div className="header">
                                                        Место хранения
                                                    </div>
                                                    <div className="content">
                                                        <input defaultValue={this.state.nameOld} required="required" onChange={this.handleName}/>
                                                        <Picker color={this.state.colorOld} update={this.handleColor}/>
                                                    </div>
                                                    <div className="actions">
                                                        <button
                                                            className="button"
                                                            onClick={() => {
                                                                this.toggleValues();
                                                            }}
                                                        >
                                                            Отмена
                                                        </button>
                                                        <button className="button" onClick={() => {this.handleEdit(); this.toggleValues()}}>Сохранить</button>
                                                    </div>
                                                </div>
                                        </Popup>
                                    </li>
                                )
                            })}
                        </ul>) :
                    (<p>Отсутствуют места хранения</p>)}
            </div>
                </>
        )
    }
}
