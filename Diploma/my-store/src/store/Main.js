import React from "react";
import "../index.css";
import CustomMenu from '../menu/Menu'
import BottomButtons from './BottomButtons';

export default class Main extends React.Component {

    render() {
        return (
            <div>
                <CustomMenu/>
                <ul>
                    <li>{this.storages}</li>
                </ul>
                <BottomButtons/>
            </div>
        )
    }
}
