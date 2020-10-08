import React from "react";
import "../index.css";
import moment from 'moment';

export default class Pots extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                excellent: 0,
                good: 0,
                bad: 0
        };

        this.getPots = this.getPots.bind(this);
    }

    getPots() {
        this.props.storeProduct.map((val) => {
            if (val.store === this.props.storage) {
                if (!val.days) {
                    this.setState({excellent: this.state.excellent + 1});
                } else {
                    let daysLeft = moment.duration(moment(val.date_expired).diff(moment())).days();
                    if (daysLeft > 5) {
                        this.setState({excellent: this.state.excellent + 1});
                    } else {
                        if (daysLeft >= 0) {
                            this.setState({good: this.state.good + 1});
                        }
                        else this.setState({bad: this.state.bad + 1});
                    }
                }
            }
                return this.state;
        }
        )
    }

    componentDidMount() {
        this.getPots();
    }

    render() {
        return (
            <div className="right">
                {this.state.excellent > 0 &&
                <span style={{border: "1px solid green", borderRadius: "50%", padding: "5px", backgroundColor: "green"}}>{this.state.excellent}</span>}
                {this.state.good > 0 &&
                <span style={{border: "1px solid yellow", borderRadius: "50%"}}>{this.state.good}</span>}
                {this.state.bad > 0 &&
                <span style={{border: "1px solid red", borderRadius: "50%"}}>{this.state.bad}</span>}
            </div>
        )
    }
    }