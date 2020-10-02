import React from "react";
import "../index.css";

export default class Catalog extends React.Component {

    render() {
        return (
            <ul className="listStore">
                {Object.keys(this.props.products).map((val) => {
                    return (
                        <li key={val} >
                            {this.props.products[val]}
                        </li>
                    )
                })}
            </ul>
        )
    }
}
