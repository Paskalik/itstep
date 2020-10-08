import React from "react";
import "../index.css";
import BottomButtons from "../store/BottomButtons";

export default class Catalog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: false
        };

        this.handleSearch = this.handleSearch.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    handleSearch() {
        this.setState({search: true})
    }

    handleSave() {
        this.props.update()
    }

    render() {
        return (
            <div>
                <div className="search">
                    {this.state.search &&
                    <input type="search" placeholder="Введите текст для поиска"/>}
                </div>
            {(this.props.storages.length > 0) ? (
            <ul className="listStore" >
                {this.props.storages.map((val,i) => {
                    return (
                        <li key={i} style={{backgroundColor: val.color}}>
                            {val.name}
                        </li>
                    )
                })}
            </ul>) :
                (<p>Отсутствуют места хранения</p>)}
            <BottomButtons categories = {this.props.categories} storages = {this.props.storages} updateSave={this.handleSave} updateSearch={this.handleSearch} />
            </div>
        )
    }
}
