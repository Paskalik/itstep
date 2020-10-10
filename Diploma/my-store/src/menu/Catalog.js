import React from "react";
import "../index.css";
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import {Service} from '../service/DBService';

export default class Catalog extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            up: false
        }

        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete(key) {
        Service.delete('product',key);
        console.log(key)
        //this.setState({up: !this.state.up})
    }

    render() {
        return (
            <div>
                {(this.props.products.length > 0) ? (
            <ul className="listStore">
                {this.props.products.map((val,i) => {
                    return (
                        <li key={i} >
                            {val.name}
                            <DeleteForeverOutlinedIcon className="right" onClick={this.handleDelete(val.id)}/>
                        </li>
                    )
                })}
            </ul>) :
                    (<p>Отсутствуют продукты</p>)}
            </div>
        )
    }
}
