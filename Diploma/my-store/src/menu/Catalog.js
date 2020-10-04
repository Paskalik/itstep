import React from "react";
import "../index.css";

export default class Catalog extends React.Component {

    render() {
        return (
            <div>
                {(this.props.products.length > 0) ? (
            <ul className="listStore">
                {this.props.products.map((val,i) => {
                    return (
                        <li key={i} >
                            {val.name}
                        </li>
                    )
                })}
            </ul>) :
                    (<p>Отсутствуют продукты</p>)}
            </div>
        )
    }
}
