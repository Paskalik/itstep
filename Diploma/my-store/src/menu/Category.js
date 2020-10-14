import React from "react";
import "../index.css";
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import {Service} from '../service/DBService';
import EditIcon from "@material-ui/icons/Edit";
import Popup from "reactjs-popup";
import AddNewCategory from '../store/AddNewCategory';
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";

export default class Category extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: 0,
            nameOld: "",
            nameNew: "",
            open: false,
            addCategory: false
        }

        this.handleAdd = this.handleAdd.bind(this);
        this.toggleValues = this.toggleValues.bind(this);
        this.handleValues = this.handleValues.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.toggleAddCategory = this.toggleAddCategory.bind(this);
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

    handleAdd() {
        this.props.update();
    }

    handleName(event) {
        this.setState({
            nameOld: event.target.defaultValue,
            nameNew: event.target.value
        })
    }

    handleEdit() {
        const name = this.state.nameNew ? this.state.nameNew : this.state.nameOld;
        let updatedCategory = {
            id: this.state.id,
            name: name
        };
        Service.getByIndex('store_product', 'category', this.state.nameOld).then(
            list => {
                list.map((val) => {
                    val.category = this.state.nameNew;
                    Service.put('store_product', val);
                })
            }
        )
        Service.put('category', updatedCategory);
        this.props.update();
    }

    handleDelete(id, name) {
        Service.getByIndex('store_product', 'category', name).then(
            list => {
                if (list.length > 0) {
                    const resultConfirm = window.confirm('Данная категория добавлена в одно из мест хранений. Точно хотите ее удалить?');
                    if (resultConfirm) {
                        list.map((val) => {
                            Service.delete('store_product', +val.id);
                        })
                        Service.delete('category',+id);
                        this.props.update();
                    }
                }
                else {
                    Service.delete('category',+id);
                    this.props.update();
                }
            }
        );
    }

    toggleAddCategory() {
        this.setState({
            addCategory: !this.state.addCategory
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
                        onClick={() => {this.toggleAddCategory()}}
                        startIcon={<AddIcon />}
                    >
                        Add
                    </Button>
                    <AddNewCategory open={this.state.addCategory} toggle={this.toggleAddCategory} update={(name) => {this.handleAdd(name)}}/>
                </div>
            <div>
                {(this.props.categories.length > 0) ? (
            <ul className="listStore">
                {this.props.categories.map((val,i) => {
                    return (
                        <li key={i}  style={{cursor: "default"}}>
                            {val.name}
                            {val.id > 1 &&
                            <DeleteForeverOutlinedIcon className="right" onClick={() => {
                                this.handleDelete(val.id, val.name)
                            }}/>
                            }
                            {val.id > 1 &&
                            <EditIcon className="right" id={val.id} onClick={() => {this.handleValues(val.id, val.name)}}/>}
                                <Popup open={this.state.open} modal nested>
                                    <div className="modal">
                                        <button className="close" onClick={this.toggleValues}>
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
            </ul>):
                    (<p>Отсутствуют категории</p>)}
            </div>
                </>
        )
    }
}
