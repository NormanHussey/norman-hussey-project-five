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
                        if (location !== currentLocation) {
                            const newLocation = {
                                name: location,
                                inventory: []
                            };
                            const travelDistance = Math.abs(index - startingIndex);
                            return(
                                <button key={index} onClick={
                                    () => { this.props.travel(newLocation, travelDistance) }
                                }>{location} ({travelDistance} days)</button>
                            );
                        } else {
                            return (
                            <button key={index} disabled>{location}</button>
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