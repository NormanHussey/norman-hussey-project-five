import React, { Component } from 'react';

class TravelSelection extends Component {

    render() {
        const locations = this.props.locations;
        const currentLocation = this.props.currentLocation;
        const startingIndex = locations.indexOf(currentLocation);
        return(
            <div className="popup travelScreen">
                {
                    locations.map((location, index) => {
                        const key = 'travelKey' + index;
                        if (location !== currentLocation) {
                            const newLocation = {
                                name: location,
                                inventory: []
                            };
                            const travelDistance = Math.abs(index - startingIndex);
                            const travelCost = travelDistance * 25;
                            let disabled = false;
                            if (travelCost > this.props.playerMoney) {
                                disabled=true;
                            }
                            return(
                                <button key={key} onClick={
                                    () => { this.props.travel(newLocation, travelCost) }
                                } disabled={disabled}>{location} ({travelDistance} days)</button>
                            );
                        } else {
                            return (
                            <button key={key} disabled>{location}</button>
                            );
                        }
                    })
                }
                <button onClick={this.props.cancel}>Cancel</button>
            </div>
        );
    }
}

export default TravelSelection;