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
            id: 0,
            nameOld: "",
            nameNew: "",
            open: false
        }

        this.toggleValues = this.toggleValues.bind(this);
        this.handleValues = this.handleValues.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleValues(id, name) {
        this.setState({
            id: +id,
            nameOld: name,
            open: true
        })
    }

    toggleValues() {
        this.setState({
            id: 0,
            nameOld: "",
            open: false
        })
    }

    handleName(event) {
        this.setState({
            nameNew: event.target.value
        })
    }

    handleEdit() {
        const name = this.state.nameNew ? this.state.nameNew : this.state.nameOld;
        let updatedProduct = {
            id: this.state.id,
            name: name
        };
        Service.getByIndex('store_product', 'product', this.state.nameOld).then(
            list => {
                list.map((val) => {
                    val.product = this.state.nameNew;
                    Service.put('store_product', val);
                })
            })
        Service.put('product', updatedProduct);
        this.props.update();
    }

    handleDelete(id, name) {
        Service.getByIndex('store_product', 'product', name).then(
            list => {
                if (list.length > 0) {
                    const resultConfirm = window.confirm('Данный продукт добавлен в одно из мест хранений. Точно хотите его удалить?');
                    if (resultConfirm) {
                        list.map((val) => {
                            Service.delete('store_product', +val.id);
                        })
                        Service.delete('product',+id);
                        this.props.update();
                    }
                }
                else {
                    Service.delete('product',+id);
                    this.props.update();
                }
            }
        )
    }

    render() {
        return (
            <div>
                {(this.props.products.length > 0) ? (
                    <ul className="listStore">
                        {
                            this.props.products.map((val,i) => {
                                return (
                                    <li key={i} style={{cursor: "default"}}>
                                        {val.name}
                                        <DeleteForeverOutlinedIcon
                                            className="right"
                                            onClick={() => {this.handleDelete(val.id, val.name)}}
                                        />
                                        <EditIcon
                                            className="right"
                                            onClick={() => {this.handleValues(val.id, val.name)}}
                                        />
                                        <Popup open={this.state.open} modal nested>
                                                <div className="modal">
                                                    <button
                                                        className="close"
                                                        onClick={this.toggleValues}
                                                    >
                                                        &times;
                                                    </button>
                                                    <div className="header">
                                                        Продукт
                                                    </div>
                                                    <div className="content">
                                                        <input
                                                            defaultValue={this.state.nameOld}
                                                            required="required"
                                                            onChange={this.handleName}
                                                        />
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
                                                        <button
                                                            className="button"
                                                            onClick={() => {this.handleEdit(); this.toggleValues()}}
                                                        >
                                                            Сохранить
                                                        </button>
                                                    </div>
                                                </div>
                                        </Popup>
                                    </li>
                                )
                            })
                        }
                    </ul>) : (<p>Отсутствуют продукты</p>)
                }
            </div>
        )
    }
}
