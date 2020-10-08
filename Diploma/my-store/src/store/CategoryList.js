import React from "react";
import "../index.css";
import Button from '@material-ui/core/Button';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import AddNewCategory from './AddNewCategory';

export default class CategoryList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: ""
        }
        this.handleChooseCategory = this.handleChooseCategory.bind(this);
        this.getFirstCategory = this.getFirstCategory.bind(this);
    }

    getFirstCategory() {
        let obj = this.props.categories[0];
        for (let key in obj) {
            if (obj.hasOwnProperty(key) && (key === 'name')) {
                this.setState({name: obj[key]})
            }}
    }

    handleChooseCategory(name) {
        this.setState({
            name: name});
        this.props.update(this.state.name);
    }

    componentDidMount() {
        this.getFirstCategory();
    }

    render() {
        return (
<Popup trigger={
    <Button variant="outlined">
        {this.state.name}
    </Button>
} modal nested>
    {close => (
            <div className="modal">

                <button className="close" onClick={close}>
                    &times;
                </button>
                <div className="header">
                    Выберите категорию
                    <AddNewCategory update={(name) => {this.handleChooseCategory(name); close()}}/>
                </div>
                <div className="content">
                    <ul className="listChoose">
                        {this.props.categories.map((val,i) => {
                            return (
                                <li key={i} onClick={() => {this.handleChooseCategory(val.name); close()}}>
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