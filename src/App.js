import React, { Component } from 'react';
import './App.css';
import firebase from './firebase';

import getRandomIntInRange, { getRandomIntInRangeExclusive, getRandomFloatInRange } from './functions/randomizers';
import removeFromArray from './functions/removeFromArray';

class App extends Component {
  constructor() {
    super();
    this.state = {
      player: {},
      location: {},
      items: [],
      buying: false,
      selling: false,
      selectedItem: null,
      selectedQty: 0,
      maxQty: 0,
    }
  }

  componentDidMount() {
    const playerDbRef = firebase.database().ref('players');
    playerDbRef.on('value', (response) => {
      const player = response.val().firstUser;
      player.inventory = [];
      this.setState({
        player: player
      });
    });

    const locationsDbRef = firebase.database().ref('countries');
    locationsDbRef.on('value', (response) => {
      const country = response.val()[0];
      const villages = country.locations;
      villages.forEach((village) => {
        if (village === this.state.player.location) {
          this.setState({
            location: {
              name: village,
              inventory: []
            }
          });
        }
      });
    });

    const itemsDbRef = firebase.database().ref('items');
    itemsDbRef.on('value', (response) => {
      this.setState({
        items: response.val()
      });
      this.randomizeLocationInventory();
    });

  }

  randomizeLocationInventory = () => {
    // Randomly choose how many items will be in the location inventory
    const numberOfItems = getRandomIntInRange(3, this.state.items.length);

    // Randomly choose the items to be added to the location inventory
    const itemsArrayCopy = [...this.state.items];
    const itemsToSet = [];
    for (let i = 0; i < numberOfItems; i++) {
      const randomIndex = getRandomIntInRangeExclusive(0, itemsArrayCopy.length);
      itemsToSet.push(itemsArrayCopy[randomIndex]);
      removeFromArray(itemsArrayCopy[randomIndex], itemsArrayCopy);
    }

    // Randomly assign prices to each item relative to its base price
    for (let item of itemsToSet) {
      const priceModifier = getRandomFloatInRange(0.1, 10.1);
      item.price = Math.round(item.basePrice * priceModifier);
    }

    const locationToSet = {...this.state.location};
    locationToSet.inventory = itemsToSet;
    this.setState({
      location: locationToSet
    });

  }

  render() {
    return (
      <div className="App">

      </div>
    );
  }
}

export default App;
