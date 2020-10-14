import React from "react";
import "../index.css";
import { CirclePicker } from 'react-color';
import Button from "@material-ui/core/Button";
import Popup from "reactjs-popup";

export default class Picker extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            backgroundColor: this.props.color
        }

        this.handlePickColor = this.handlePickColor.bind(this);
    }

    handlePickColor(color) {
        this.setState({
            backgroundColor: color.hex
        })
        this.props.update(color.hex)
    }

    render() {
        return (
            <Popup trigger={
            <Button variant="outlined" style={{backgroundColor: this.state.backgroundColor}}>Цвет</Button>} modal nested>
                {close => (
                            <div className="modal">
                                <button className="close" onClick={close}>
                                    &times;
                                </button>
                                <div className="header">
                                    Выберите цвет
                                </div>
                                <div className="content">
                                <CirclePicker
                                    color = "#fff"
                                    onChangeComplete= {(color) => {this.handlePickColor(color); close() }}
                                />
                                </div>
                            </div>

                    )}
            </Popup>
        )
    }
}
