import React from "react";
import "../index.css";
import Button from '@material-ui/core/Button';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import AddNewStore from './AddNewStore';
import FolderIcon from '@material-ui/icons/Folder';


export default class StoreList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            color: "default",
            name: "",
            addStore: false,
            new: true
        }
        this.handleChoosePlace = this.handleChoosePlace.bind(this);
        this.getFirstStorageName = this.getFirstStorageName.bind(this);
        this.getFirstStorageColor = this.getFirstStorageColor.bind(this);
        this.toggleAddStore = this.toggleAddStore.bind(this);
    }

    getFirstStorageName() {
            let obj = this.props.storages[0];
            for (let key in obj) {
                if (obj.hasOwnProperty(key) && (key === 'name')) {
                    this.setState({name: obj[key]}, () => {
                        this.props.update(this.state.name);
                    })
                }
            }
    }

    getFirstStorageColor() {
        let obj = this.props.storages[0];
        for (let key in obj) {
            if (obj.hasOwnProperty(key) && (key === 'color')) {
                this.setState({color: obj[key]})
            }}
    }

    handleChoosePlace(name, color) {
        this.setState({
            name: name,
            color: color}, () => {
            this.props.update(this.state.name)
        });
    }

    toggleAddStore() {
        this.setState({
            addStore: !this.state.addStore
        })
    }

    componentDidMount() {
        this.props.storages.map((val) => {
            if (val.name === this.props.place) {
                this.setState({
                    name: val.name,
                    color: val.color
                })
            } else {
                this.getFirstStorageColor();
                this.getFirstStorageName();
            }
        });
    }

    render() {
        return (
            <Popup trigger={
                <Button variant="outlined" style={{backgroundColor: this.state.color}}>
                    {this.state.name}
                </Button>} modal nested>
                {close => (
                        <div className="modal">
                            <button className="close" onClick={close}>
                                &times;
                            </button>
                            <div className="header">
                                Выберите место хранения
                                <FolderIcon color="secondary" className="right" onClick={() => {this.toggleAddStore()}}/>
                                <AddNewStore open={this.state.addStore} toggle={this.toggleAddStore} update={(name,color) => {this.handleChoosePlace(name,color); close()}}/>
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
                )}
            </Popup>
        )
    }
}