import React from "react";
import "../index.css";
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import EditIcon from '@material-ui/icons/Edit';
import {Service} from '../service/DBService';
import Popup from 'reactjs-popup';

export default class Catalog extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            nameOld: "",
            nameNew: "",
            exist: false
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
        Service.getByIndex('store_product', 'product', this.state.nameOld).then(
                list => {
                    list.map((val) => {
                    val.product = this.state.nameNew;
                    Service.put('store_product', val);
                })
                }
            )
        Service.put('product', updatedProduct);
        this.props.update();
    }

    handleDelete(event, name) {
        Service.getByIndex('store_product', 'product', name).then(
            list => {
                if (list.length > 0) {
                    const resultConfirm = window.confirm('Данный продукт добавлен в одно из мест хранений. Точно хотите его удалить?');
                    alert(resultConfirm);
                    if (resultConfirm) {
                        list.map((val) => {
                            Service.delete('store_product',+ val.id);
                        })
                    }
                }
            }
        );
        Service.delete('product',+event.target.id);
        this.props.update();
    }

    render() {
        return (
            <div>
                {(this.props.products.length > 0) ? (
            <ul className="listStore">
                {this.props.products.map((val,i) => {
                    return (
                        <li key={i} style={{cursor: "default"}}>
                            {val.name}
                            <DeleteForeverOutlinedIcon className="right" id={val.id} onClick={(event) => {this.handleDelete(event, val.name)}}/>
                            <Popup trigger={
                            <EditIcon className="right" id={val.id}/>
                            } modal nested>
                                {close => (
                                    <div className="modal">
                                        <button className="close" onClick={close}>
                                            &times;
                                        </button>
                                        <div className="header">
                                            Продукт
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
                        </li>
                    )
                })}
            </ul>) :
                    (<p>Отсутствуют продукты</p>)}
            </div>
        )
    }
}
