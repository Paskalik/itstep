import React from "react";
import "../index.css";
import Button from '@material-ui/core/Button';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import AddNewStore from './AddNewStore';


export default class StoreList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            color: "default",
            name: ""
        }
        this.handleChoosePlace = this.handleChoosePlace.bind(this);
        this.getFirstStorageName = this.getFirstStorageName.bind(this);
        this.getFirstStorageColor = this.getFirstStorageColor.bind(this);
    }

    getFirstStorageName() {
        let obj = this.props.storages[0];
        for (let key in obj) {
            if (obj.hasOwnProperty(key) && (key === 'name')) {
                this.setState({name: obj[key]})
                //return obj[key]
            }}
    }

    getFirstStorageColor() {
        let obj = this.props.storages[0];
        for (let key in obj) {
            if (obj.hasOwnProperty(key) && (key === 'color')) {
                this.setState({color: obj[key]})
                //return obj[key]
            }}
    }

    handleChoosePlace(name, color) {
        this.setState({choosePlace: true,
            name: name,
            color: color})
    }

    componentDidMount() {
        this.getFirstStorageColor();
        this.getFirstStorageName();
    }

    render() {
        return (
            <Popup trigger={
                <Button id = "storage" variant="outlined" style={{backgroundColor: this.state.color}}>
                    {this.state.name}
                </Button>} modal nested>
                {close => (
                    <form onSubmit={this.handleSubmit}>
                        <div className="modal">

                            <button className="close" onClick={close}>
                                &times;
                            </button>
                            <div className="header">
                                Выберите место хранения
                                <AddNewStore update={this.handleChoosePlace}/>
                            </div>
                            <div className="content">
                                <ul className="listChoose">
                                    {this.props.storages.map((val,i) => {
                                        return (
                                            <li key={i} style={{backgroundColor: val.color}} onClick={() => {this.handleChoosePlace(val.name, val.color); close()}}>
                                                {val.name}
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                    </form>
                )}
            </Popup>
        )
    }
}