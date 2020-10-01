import React from "react";
import "../index.css";
import CustomMenu from '../menu/Menu'
import BottomButtons from './BottomButtons';

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.storages = this.props.storages;
    }


    render() {
        console.log(this.props.storages);
        return (
            <div>
                <CustomMenu/>
                    {Object.keys(this.storages).map((index) => {
                        return (
                            <span>{this.storages[index].name}</span>
                        )
                    })}
                <BottomButtons/>
            </div>
        )
    }
}
