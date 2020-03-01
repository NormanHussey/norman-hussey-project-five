import React, { Component } from 'react';
import './App.css';
import firebase from './firebase';

// Import Functions
import getRandomIntInRange, { getRandomIntInRangeExclusive, getRandomFloatInRange, probability } from './functions/randomizers';
import removeFromArray from './functions/removeFromArray';
import determineMaxQty from './functions/determineMaxQty';

// Import Components
import StartScreen from './components/StartScreen';
import Inventory from './components/Inventory';
import Transaction from './components/Transaction';
import TravelSelection from './components/TravelSelection';
import ChooseCountry from './components/ChooseCountry';
import Encounter from './components/Encounter';

class App extends Component {
  constructor() {
    super();
    this.state = {
      gameStarted: false,
      allPlayers: [],
      countries: [],
      userName: "",
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
      startNewGame: false,
      quitGame: false,
      chooseNewCountry: false,
      encountersOccurring: 0
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
      day: 1,
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

  loadGame = (userName) => {
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

  travel = (newLocation, travelCost, newCountry = false) => {
    this.cancelTransaction();
    const player = {...this.state.player};
    player.money -= travelCost;
    const daysPassed = (travelCost / 25);
    player.day += daysPassed;
    const countryToTravel = {...this.state.country};

    if (newCountry) {
      countryToTravel.name = newCountry;
      countryToTravel.locations = this.state.countries[newCountry];
      player.country = newCountry;
    }

    player.location = newLocation.name;
    newLocation.inventory = this.randomizeLocationInventory();

    const numberOfRandomEncounters = this.randomEncounters(daysPassed);

    this.setState({
      country: countryToTravel,
      location: newLocation,
      traveling: false,
      player: player,
      encountersOccurring: numberOfRandomEncounters
    },
      this.updateFirebase
    );
  }

  randomEncounters = (daysPassed) => {
    let encounters = 0;
    for(let i = 0; i < daysPassed; i++) {
      if (probability(0.25)) {
        encounters++;
      }
    }
    return encounters;
  }

  encounterResult = (player = {...this.state.player}) => {
    let encountersLeft = this.state.encountersOccurring - 1;

    if (encountersLeft < 0) {
      encountersLeft = 0;
    }

    this.setState({
      player: player,
      encountersOccurring: encountersLeft
    },
      this.updateFirebase
    );
  }

  confirmNewGame = () => {
    this.setState({
      startNewGame: !this.state.startNewGame
    });
  }

  chooseNewCountry = () => {
    this.setState({
      chooseNewCountry: true,
      startNewGame: false,
      quitGame: false
    });
  }

  startingNewGame = (countryChoice) => {
    let guest = false;
    if (this.state.player.name === "Nameless Merchant") {
      guest = true;
    }

    const newGameValues = {
      userName: this.state.userName,
      password: this.state.player.password,
      guest: guest,
      countryChoice: countryChoice
    };

    this.setState({
      chooseNewCountry: false
    },
      () => { this.setupNewGame(newGameValues); }
    );
  }

  confirmQuit = () => {
    this.setState({
      quitGame: !this.state.quitGame
    });
  }

  quitting = () => {
    this.setState({
      gameStarted: false,
      buying: false,
      selling: false,
      selectedItem: null,
      selectedQty: 0,
      maxQty: 0,
      traveling: false,
      startNewGame: false,
      quitGame: false,
      chooseNewCountry: false
    });
  }

  render() {
    return (
      <div className="App">
        { !this.state.gameStarted ? <StartScreen startNewGame={ this.setupNewGame } loadGame={ this.loadGame } allPlayers={this.state.allPlayers} countries={Object.keys(this.state.countries)}/> : null }
        <header>
          <div className="wrapper gameHeader">
            <h2>Day: {this.state.player.day}</h2>
            <h2>{this.state.country.name}</h2>
            <div className="headerButtons">
              <button onClick={ this.confirmNewGame }>New Game</button>
              <button onClick={ this.confirmQuit }>Quit Game</button>
            </div>
            { this.state.startNewGame ? 
              <div className="popup">
                <h3>Are you sure you want to start a new game?</h3>
                <p>(All of your current progress will be lost)</p>
                <div className="booleanChoices">
                  <button onClick={ this.chooseNewCountry }>Yes</button>
                  <button onClick={ this.confirmNewGame }>No</button>
                </div>
              </div>
              : null
            }
            { this.state.quitGame ? 
              <div className="popup">
                <h3>Are you sure you want to quit?</h3>
                { this.state.player.name === "Nameless Merchant" ? <p>(All of your current progress will be lost)</p> : <p>(Your game is saved)</p>}
                <div className="booleanChoices">
                  <button onClick={ this.quitting }>Yes</button>
                  <button onClick={ this.confirmQuit }>No</button>
                </div>
              </div>
              : null
            }
            { this.state.chooseNewCountry ? 
              <div className="popup">
                <ChooseCountry beginGame={ this.startingNewGame } countries={Object.keys(this.state.countries)} />
              </div>
              : null }
          </div>
        </header>
        <main>
          <div className="wrapper gameMain">
            { this.state.player.inventory ? <Inventory owner={this.state.player} clickFunction={this.itemClicked}/> : null }
            { this.state.location.inventory ? <Inventory owner={this.state.location} clickFunction={this.itemClicked}/> : null}
          </div>
        </main>
        <footer>
          <div className="wrapper gameFooter">
            <h2>${this.state.player.money}</h2>
            { this.state.buying ? <Transaction type={'Buy'} item={this.state.selectedItem} cancel={this.cancelTransaction} transactionClicked={this.processTransaction} maxQty={this.state.maxQty}/> : null }
            { this.state.selling ? <Transaction type={'Sell'} item={this.state.selectedItem} cancel={this.cancelTransaction} transactionClicked={this.processTransaction} maxQty={this.state.selectedItem.qty}/> : null }
            { this.state.encountersOccurring ? <Encounter numberOfEncounters={this.state.encountersOccurring} player={this.state.player} encounterResult={this.encounterResult} /> : null }
            { this.state.traveling ? <TravelSelection playerMoney={this.state.player.money} locations={this.state.country.locations} currentLocation={this.state.player.location} countries={this.state.countries} currentCountry={this.state.country.name} cancel={this.toggleTravelSelection} travel={this.travel}/> : <button onClick={ this.toggleTravelSelection }>Travel</button>}
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
