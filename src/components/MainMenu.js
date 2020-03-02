import React, { Component } from 'react';

import ChooseCountry from './ChooseCountry';

class MainMenu extends Component {
    constructor() {
        super();
        this.state = {
            startNewGame: false,
            quitGame: false,
            chooseNewCountry: false,
            upgradeScreen: false
        }
    }

    confirmNewGame = () => {
        this.setState({
          menuOpen: false,
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

    confirmQuit = () => {
        this.setState({
          quitGame: !this.state.quitGame
        });
      }

    closeMenu = () => {
        this.setState({
            chooseNewCountry: false,
            startNewGame: false,
            quitGame: false,
            upgradeScreen: false
        },
            this.props.close
        );
    }

    closeCountryMenu = (countryChoice) => {
        this.closeMenu();
        this.props.beginGame(countryChoice);
    }

    toggleUpgradeScreen = () => {
        this.setState({
            upgradeScreen: !this.state.upgradeScreen
        });
    }

    addInventorySlots = () => {
        const player = this.props.player;
        player.money -= 10000;
        player.maxInventory += 10;
        this.props.upgradeCaravan(player);
    }

    hireArmedGuard = () => {
        const player = this.props.player;
        player.money -= 5000;
        player.armedGuards++;
        player.travelCost = 25 * (player.armedGuards + 1);
        this.props.upgradeCaravan(player);
    }

    fireArmedGuard = () => {
        const player = this.props.player;
        player.armedGuards--;
        player.travelCost = 25 * (player.armedGuards + 1);
        this.props.upgradeCaravan(player);
    }

    render() {
        const player = this.props.player;
        let disabled = false;
        return(
            <div>
                <div className="popup mainMenu">
                    <div className="choices">
                    <button onClick={ this.confirmNewGame }>New Game</button>
                    <button onClick={ this.confirmQuit }>Quit Game</button>
                    <button onClick={ this.toggleUpgradeScreen }>Manage Caravan</button>
                    <button onClick={ this.closeMenu }>Close Menu</button>
                    </div>
                </div>
                { this.state.startNewGame ? 
                <div className="popup">
                    <h3>Are you sure you want to start a new game?</h3>
                    <p>(All of your current progress will be lost)</p>
                    <div className="choices">
                    <button onClick={ this.chooseNewCountry }>Yes</button>
                    <button onClick={ this.confirmNewGame }>No</button>
                    </div>
                </div>
                : null
                }
                { this.state.quitGame ? 
                <div className="popup">
                    <h3>Are you sure you want to quit?</h3>
                    { player.name === "Nameless Merchant" ? <p>(All of your current progress will be lost)</p> : <p>(Your game is saved)</p>}
                    <div className="choices">
                        <button onClick={ () => {
                            this.closeMenu();
                            this.props.quit();
                            } }>Yes</button>
                        <button onClick={ this.confirmQuit }>No</button>
                    </div>
                </div>
                : null
                }
                { this.state.upgradeScreen ?
                    <div className="popup upgradeMenu">
                        <div className="choices">
                            <h3>Your caravan: </h3>
                            <h4>Inventory Slots: {player.maxInventory}</h4>
                            <h4>Armed Guards: {player.armedGuards}</h4>
                            { player.money < 10000 ? disabled = true : disabled = false}
                            <button disabled={disabled} onClick={this.addInventorySlots}>Add 10 Inventory Slots ($10,000)</button>
                            { player.money < 5000 ? disabled = true : disabled = false}
                            <button onClick={this.hireArmedGuard} disabled={disabled}>Hire an Armed Guard ($5,000 + $25/day)</button>
                            { player.armedGuards < 1 ? disabled = true : disabled = false}
                            <button onClick={this.fireArmedGuard} disabled={disabled}>Fire an Armed Guard</button>
                            <button onClick={ this.closeMenu }>Close</button>
                        </div>
                    </div>
                    : null
                }
                { this.state.chooseNewCountry ? 
                <div className="popup">
                    <ChooseCountry beginGame={ this.closeCountryMenu } countries={this.props.countries} />
                </div>
                : null }
            </div>
        );
    }
}

export default MainMenu;