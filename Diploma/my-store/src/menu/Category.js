import React from "react";
import "../index.css";

export default class Category extends React.Component {

    render() {
        return (
            <ul className="listStore">
                {Object.keys(this.props.categories).map((val) => {
                    return (
                        <li key={val} >
                            {this.props.categories[val]}
                        </li>
                    )
                })}
            </ul>
        )
    }
}
