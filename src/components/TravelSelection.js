import React, { Component } from 'react';

class TravelSelection extends Component {
    render() {
        const locations = this.props.locations;
        const currentLocation = this.props.currentLocation;
        return(
            <div className="travelScreen">
                {
                    locations.map((location) => {
                        if (location !== currentLocation) {
                            return(
                                <button>{location}</button>
                            );
                        } else {
                            return (
                            <button disabled>{location}</button>
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