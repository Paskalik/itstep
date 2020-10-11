import React from "react";
import "../index.css";
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import {Service} from '../service/DBService';

export default class Catalog extends React.Component {

    constructor(props) {
        super(props);

        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete(event) {
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
                        <li key={i}>
                            {val.name}
                            <DeleteForeverOutlinedIcon className="right" id={val.id} onClick={this.handleDelete}/>
                        </li>
                    )
                })}
            </ul>) :
                    (<p>Отсутствуют продукты</p>)}
            </div>
        )
    }
}
