import React from "react";
import "../index.css";

export default class Category extends React.Component {

    render() {
        return (
            <div>
                {(this.props.categories.length > 0) ? (
            <ul className="listStore">
                {this.props.categories.map((val,i) => {
                    return (
                        <li key={i} >
                            {val.name}
                        </li>
                    )
                })}
            </ul>):
                    (<p>Отсутствуют категории</p>)}
            </div>
        )
    }
}
