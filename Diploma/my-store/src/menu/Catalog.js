import React from "react";
import "../index.css";

export default class Catalog extends React.Component {

    render() {
        return (
            <div>
                {(this.props.products.length > 0) ? (
            <ul className="listStore">
                {Object.keys(this.props.products).map((val) => {
                    return (
                        <li key={val} >
                            {this.props.products[val]}
                        </li>
                    )
                })}
            </ul>) :
                    (<p>Отсутствуют продукты</p>)}
            </div>
        )
    }
}
