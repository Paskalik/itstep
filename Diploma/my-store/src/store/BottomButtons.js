import React from "react";
import "../index.css";
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import 'reactjs-popup/dist/index.css';
import AddProduct from "./AddProduct";

export default class BottomButtons extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false
        };

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);

    }

    open() {
        this.setState({
            open: true
        })
    }

    close() {
        this.setState({
            open: false
        })
    }


    render() {
        return (
            <div className="BottomButton">
                <Button
                    variant="outlined"
                    color="secondary"
                    size="large"
                    onClick={this.open}
                    startIcon={<AddIcon />}
                >
                    Add
                </Button>
                <AddProduct open={this.state.open} close={this.close} updateSave={this.props.updateSave} categories = {this.props.categories} storages = {this.props.storages}/>
            </div>
        )
    }
}
