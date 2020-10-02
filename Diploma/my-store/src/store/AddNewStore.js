import React from "react";
import "../index.css";
import FolderIcon from '@material-ui/icons/Folder';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export default class AddNewStore extends React.Component {

    render() {
        return (
            <FolderIcon color="secondary" className="right"/>
        )
    }
}
