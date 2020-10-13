import React from "react";
import "../index.css";
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import {Service} from '../service/DBService';
import Popup from "reactjs-popup";
import EditIcon from "@material-ui/icons/Edit";

export default class Store extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            nameOld: "",
            nameNew: ""
        }

        this.handleName = this.handleName.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleName(event) {
        this.setState({
            nameOld: event.target.defaultValue,
            nameNew: event.target.value
        })
    }

    handleEdit(event) {
        let updatedProduct = {
            id: +event.target.id,
            name: this.state.nameNew
        };
        Service.getByIndex('store_product', 'store', this.state.nameOld).then(
            list => {
                list.map((val) => {
                    val.product = this.state.nameNew;
                    Service.put('store_product', val);
                })
            }
        )
        Service.put('store', updatedProduct);
        this.props.update();
    }

    handleDelete(event, name) {
        Service.getByIndex('store_product', 'storage', name).then(
            list => {
                if (list.length > 0) {
                    const resultConfirm = window.confirm('Данное место хранение содержит продукты. Точно хотите его удалить?');
                    if (resultConfirm) {
                        list.map((val) => {
                            Service.delete('store_product',+ val.id);
                            this.props.update();
                        })
                    }
                }
            }
        );
        Service.delete('storage',+event.target.id);
        this.props.update();
    }

    render() {
        return (
            <div>
                {(this.props.storages.length > 0) ? (
                        <ul className="listStore">
                            {this.props.storages.map((val,i) => {
                                return (
                                    <li key={i} style={{backgroundColor: val.color, cursor: "default"}}>
                                        {val.name}
                                        {val.id > 1 &&
                                        <DeleteForeverOutlinedIcon className="right" id={val.id} onClick={(event) => {
                                            this.handleDelete(event, val.name)
                                        }}/>
                                        }
                                        {val.id > 1 &&
                                        <Popup trigger={
                                            <EditIcon className="right" id={val.id}/>
                                        } modal nested>
                                            {close => (
                                                <div className="modal">
                                                    <button className="close" onClick={close}>
                                                        &times;
                                                    </button>
                                                    <div className="header">
                                                        Категория
                                                    </div>
                                                    <div className="content">
                                                        <input defaultValue={val.name} required="required" onChange={this.handleName}/>
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
                                                        <button id={val.id} className="button" onClick={(event) => {this.handleEdit(event); close()}}>Сохранить</button>
                                                    </div>
                                                </div>
                                            )}
                                        </Popup>
                                        }
                                    </li>
                                )
                            })}
                        </ul>) :
                    (<p>Отсутствуют места хранения</p>)}
            </div>
        )
    }
}
