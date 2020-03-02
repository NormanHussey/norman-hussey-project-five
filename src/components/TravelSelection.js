import React, { Component } from 'react';

class TravelSelection extends Component {

    render() {
        const locations = this.props.locations;
        const currentLocation = this.props.currentLocation;
        const startingIndex = locations.indexOf(currentLocation);

        const countries = this.props.countries;
        const countryNames = Object.keys(countries);
        const currentCountryIndex = countryNames.indexOf(this.props.currentCountry);

        let nextCountry = countryNames[currentCountryIndex + 1];
        let previousCountry = countryNames[currentCountryIndex - 1];
        let travelTimeToNextCountry = 6 + (locations.length - 1) - startingIndex;
        let travelTimeToPreviousCountry = 6 + startingIndex;

        if (currentCountryIndex >= countryNames.length - 1) {
            nextCountry = countryNames[0];
            travelTimeToNextCountry += 6;
        }

        if (currentCountryIndex <= 0) {
            previousCountry = countryNames[countryNames.length - 1];
            travelTimeToPreviousCountry += 6;
        }

        const nextCountryLocationName = countries[nextCountry][0];
        const nextCountryLocation = {
            name: nextCountryLocationName,
            inventory: []
        };
        const travelCostToNextCountry = travelTimeToNextCountry * 25;
        let travelToNextCountryDisabled = false;
        if (travelCostToNextCountry > this.props.playerMoney) {
            travelToNextCountryDisabled = true;
        }
        
        const lastLocationIndex = countries[previousCountry].length - 1;
        const previousCountryLocationName = countries[previousCountry][lastLocationIndex];
        const previousCountryLocation = {
            name: previousCountryLocationName,
            inventory: []
        };
        const travelCostToPreviousCountry = travelTimeToPreviousCountry * 25;
        let travelToPreviousCountryDisabled = false;
        if (travelCostToPreviousCountry > this.props.playerMoney) {
            travelToPreviousCountryDisabled = true;
        }
        
        return(
            <div className="popup travelScreen">
                <h3>Travel Cost: $25 / day</h3>
                <div className="travelDestinations"> 
                    <button key={previousCountry + travelCostToPreviousCountry} onClick={
                        () => { this.props.travel(previousCountryLocation, travelCostToPreviousCountry, previousCountry) }
                    }
                    disabled={travelToPreviousCountryDisabled}>{previousCountry} ({travelTimeToPreviousCountry} days)</button>
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
                    <button key={nextCountry + travelCostToNextCountry} onClick={
                        () => { this.props.travel(nextCountryLocation, travelCostToNextCountry, nextCountry) }
                    } disabled={travelToNextCountryDisabled}>{nextCountry} ({travelTimeToNextCountry} days)</button>
                </div>
                <button onClick={this.props.cancel}>Cancel</button>
            </div>
        );
    }
}

export default TravelSelection;