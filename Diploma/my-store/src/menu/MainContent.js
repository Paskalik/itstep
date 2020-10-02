import React from "react";
import "../index.css";

export default class Catalog extends React.Component {

    render() {
        return (
            <ul className="listStore">
                {Object.keys(this.props.storages).map((val) => {
                    return (
                        <li key={val} >
                            {this.props.storages[val]}
                        </li>
                    )
                })}
            </ul>
        )
    }
}
