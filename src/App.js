import React, { Component } from 'react';
import './App.css';
import firebase from './firebase';

// Import Functions
import getRandomIntInRange, { getRandomIntInRangeExclusive, getRandomFloatInRange } from './functions/randomizers';
import removeFromArray from './functions/removeFromArray';
import determineMaxQty from './functions/determineMaxQty';

// Import Components
import StartScreen from './components/StartScreen';
import Inventory from './components/Inventory';
import Transaction from './components/Transaction';
import TravelSelection from './components/TravelSelection';

class App extends Component {
  constructor() {
    super();
    this.state = {
      gameStarted: false,
      allPlayers: [],
      countries: [],
      userName: "firstUser",
      player: {},
      location: {},
      country: {},
      items: [],
      buying: false,
      selling: false,
      selectedItem: null,
      selectedQty: 0,
      maxQty: 0,
      traveling: false,
    }
  }

  componentDidMount() {
    const dbRef = firebase.database().ref();
    dbRef.on('value', (response) => {
      const db = response.val();
      const allPlayers = db.players;
      const countries = db.countries;
      const items = db.items;

      this.setState({
        allPlayers: allPlayers,
        countries: countries,
        items: items
      });
    });

  }

  setupNewGame = ({ userName, password, guest, countryChoice }) => {
    const playersDbRef = firebase.database().ref('players');
    const startingValues = {
      money: 1000,
      maxInventory: 100,
      inventorySize: 0,
      country: countryChoice,
      location: this.state.countries[countryChoice][0],
      inventory: [{
          "type": "empty"
      }]
    };

    if (guest) {
      startingValues.name = "Nameless Merchant";
      startingValues.password = "";
      const pushedGuest = playersDbRef.push(startingValues);
      userName = pushedGuest.key;
    } else {
      startingValues.name = userName;
      startingValues.password = password;
      playersDbRef.update({
        [userName]: startingValues
      });
    }

    this.setState({
      userName: userName
    },
      this.beginGame
    );

  }

  beginGame = () => {
    const player = this.state.allPlayers[this.state.userName];
    const countryName = player.country;
    const locations = this.state.countries[countryName];

    let currentLocation;
    locations.forEach((location) => {
      if (location === player.location) {
        currentLocation = location;
      }
    });

    const country = {
      name: countryName,
      locations: locations
    };

    const location = {
      name: currentLocation,
      inventory: this.randomizeLocationInventory()
    };

    this.setState({
      player: player,
      country: country,
      location: location,
      gameStarted: true
    });
  }

  randomizeLocationInventory = () => {
    // Randomly choose how many items will be in the location inventory
    const numberOfItems = getRandomIntInRange(3, this.state.items.length);

    // Randomly choose the items to be added to the location inventory
    const itemsArrayCopy = [...this.state.items];
    const newInventory = [];
    for (let i = 0; i < numberOfItems; i++) {
      const randomIndex = getRandomIntInRangeExclusive(0, itemsArrayCopy.length);
      newInventory.push(itemsArrayCopy[randomIndex]);
      removeFromArray(itemsArrayCopy[randomIndex], itemsArrayCopy);
    }

    // Randomly assign prices to each item relative to its base price
    for (let item of newInventory) {
      const priceModifier = getRandomFloatInRange(0.1, 10.1);
      item.price = Math.round(item.basePrice * priceModifier);
      const qty = getRandomIntInRange(10, 500);
      item.qty = qty;
    }

    return newInventory;

  }

  itemClicked = (owner, item) => {
    if (item.qty > 0 && !this.state.traveling) {
      if (owner === this.state.player) {
        this.setState({
          buying: false,
          selling: true,
          selectedItem: item,
        });
      } else {
        const maxQty = determineMaxQty(item, this.state.player);
        this.setState({
          buying: true,
          selling: false,
          selectedItem: item,
          maxQty: maxQty,
        })
      }
    }
  }

  processTransaction = (qty) => {
    const selectedItem = this.state.selectedItem;

    const player = {...this.state.player};
    const location = {...this.state.location};

    let playerItemFound = false;
    player.inventory.forEach((item) => {
      if (item.type === selectedItem.type) {
        if (this.state.buying) {
          item.qty += qty;
          player.inventorySize += qty;
        } else {
          item.qty -= qty;
          player.inventorySize -= qty;
          if (item.qty <= 0) {
            removeFromArray(item, player.inventory);
          }
        }
        playerItemFound = true;
      }
    });

    if (!playerItemFound && this.state.buying) {
      player.inventory.push({
        type: selectedItem.type,
        qty: qty,
        price: selectedItem.price,
      });
      player.inventorySize += qty;
    }

    location.inventory.forEach((item) => {
      if (item.type === this.state.selectedItem.type) {
        if (this.state.buying) {
          item.qty -= qty;
          player.money -= (item.price * qty);
        } else {
          item.qty += qty;
          player.money += (item.price * qty);
        }
      }
    });

    this.setState({
      player: player,
      location: location,
      buying: false,
      selling: false,
      selectedItem: null,
      selectedQty: 0,
      maxQty: 0,
    },
      this.updateFirebase
    );

  }

  cancelTransaction = () => {
    this.setState({
      buying: false,
      selling: false,
      selectedItem: null,
      selectedQty: 0,
      maxQty: 0,
    });
  }

  updateFirebase = () => {
    const playerDbRef = firebase.database().ref('players');
    playerDbRef.update({
      [this.state.userName]: this.state.player
    });
  }

  toggleTravelSelection = () => {
    if (this.state.buying || this.state.selling) {
      this.cancelTransaction();
    }
    this.setState({
      traveling: !this.state.traveling,
    });
  }

  travel = (newLocation, travelDistance) => {
    this.cancelTransaction();
    const travelCost = travelDistance * 25;
    const player = {...this.state.player};
    player.location = newLocation.name;
    player.money -= travelCost;
    newLocation.inventory = this.randomizeLocationInventory();

    this.setState({
      location: newLocation,
      traveling: false,
      player: player
    },
      this.updateFirebase
    );
  }

  render() {
    return (
      <div className="App">
        { !this.state.gameStarted ? <StartScreen startNewGame={ this.setupNewGame } allPlayers={this.state.allPlayers} countries={Object.keys(this.state.countries)}/> : null }
        <header><h1>{this.state.country.name}</h1></header>
        <main>
          { this.state.player.inventory ? <Inventory owner={this.state.player} clickFunction={this.itemClicked}/> : null }
          { this.state.location.inventory ? <Inventory owner={this.state.location} clickFunction={this.itemClicked}/> : null}
        </main>
        <footer>
          <h2>${this.state.player.money}</h2>
          { this.state.buying ? <Transaction type={'Buy'} item={this.state.selectedItem} cancel={this.cancelTransaction} transactionClicked={this.processTransaction} maxQty={this.state.maxQty}/> : null }
          { this.state.selling ? <Transaction type={'Sell'} item={this.state.selectedItem} cancel={this.cancelTransaction} transactionClicked={this.processTransaction} maxQty={this.state.selectedItem.qty}/> : null }
          { this.state.traveling ? <TravelSelection locations={this.state.country.locations} currentLocation={this.state.player.location} cancel={this.toggleTravelSelection} travel={this.travel}/> : <button onClick={ this.toggleTravelSelection }>Travel</button>}
        </footer>
      </div>
    );
  }
}

export default App;
