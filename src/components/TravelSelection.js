import React, { Component } from 'react';

class TravelSelection extends Component {
    render() {
        const locations = this.props.locations;
        const currentLocation = this.props.currentLocation;
        return(
            <div className="travelScreen">
                {
                    locations.map((location, index) => {
                        if (location !== currentLocation) {
                            const newLocation = {
                                name: location,
                                inventory: []
                            };
                            return(
                                <button key={index} onClick={
                                    () => { this.props.travel(newLocation) }
                                }>{location}</button>
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