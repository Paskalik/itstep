import React from "react";
import "../index.css";


export default class Store extends React.Component {

    render() {
        return (
            <div>
                {(this.props.storages.length > 0) ? (
                        <ul className="listStore">
                            {this.props.storages.map((val,i) => {
                                return (
                                    <li key={i} style={{backgroundColor: val.color}}>
                                        {val.name}
                                    </li>
                                )
                            })}
                        </ul>) :
                    (<p>Отсутствуют места хранения</p>)}
            </div>
        )
    }
}
