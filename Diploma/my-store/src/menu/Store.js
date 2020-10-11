import React from "react";
import "../index.css";
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import {Service} from '../service/DBService';

export default class Store extends React.Component {
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
                {(this.props.storages.length > 0) ? (
                        <ul className="listStore">
                            {this.props.storages.map((val,i) => {
                                return (
                                    <li key={i} style={{backgroundColor: val.color, cursor: "default"}}>
                                        {val.name}
                                        <DeleteForeverOutlinedIcon className="right" id={val.id} onClick={this.handleDelete}/>
                                    </li>
                                )
                            })}
                        </ul>) :
                    (<p>Отсутствуют места хранения</p>)}
            </div>
        )
    }
}
