import React from "react";
import "../index.css";

export default class Store extends React.Component {

    render() {
        return (
            <div>
                {(this.props.storages.length > 0) ? (
                        <ul className="listStore">
                            {Object.keys(this.props.storages).map((val) => {
                                return (
                                    <li key={val} >
                                        {this.props.storages[val]}
                                    </li>
                                )
                            })}
                        </ul>) :
                    (<p>Отсутствуют места хранения</p>)}
            </div>
        )
    }
}
