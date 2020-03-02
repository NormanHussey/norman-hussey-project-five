import React, { Component } from 'react';

class MarketEvent extends Component {
    constructor() {
        super();
        this.state = {
            eventText: ''
        };
    }

    componentDidMount() {
        console.log(this.props.eventInfo);
        let eventText = ``;
        if (this.props.eventInfo.type === 'overabundance') {
            eventText = `
                The market in ${this.props.location.name} has been flooded with cheap ${this.props.eventInfo.item.type}. Prices have bottomed out!
            `;
        } else {
            eventText = `
                ${this.props.eventInfo.item.type} has become scarce in ${this.props.location.name}. The market in is paying top dollar for it!
            `;
        }
        this.setState({
            eventText: eventText
        });
    }

    render() {
        return (
            <div className="popup marketEvent">
                <h4>{this.state.eventText}</h4>
                <button onClick={ this.props.close }>Continue</button>
            </div>
        );
    }
}

export default MarketEvent;