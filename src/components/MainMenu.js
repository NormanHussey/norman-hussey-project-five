import React, { Component } from 'react';

import ChooseCountry from './ChooseCountry';

class MainMenu extends Component {
    constructor() {
        super();
        this.state = {
            startNewGame: false,
            quitGame: false,
            chooseNewCountry: false,
            upgradeScreen: false,
            bankScreen: false,
            depositScreen: false,
            withdrawScreen: false,
            moneyAmount: 0,
            bankIndex: 0,
            accountBalance: 0
        }
    }

    componentDidMount() {
        const player = this.props.player;
        let bankFound = false;
        let accountBalance = 0;

        player.banks.forEach((town, index) => {
            if (town.name === player.location) {
                accountBalance = town.balance;
                bankFound = index;
            }
        });

        if (!bankFound) {
            player.banks.push({
                name: player.location,
                balance: accountBalance, 
            });
            bankFound = player.banks.length - 1;
            this.props.updatePlayer(player);
        }

        this.setState({
            bankIndex: bankFound,
            accountBalance: accountBalance
        });
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
            upgradeScreen: false,
            bankScreen: false,
            depositScreen: false,
            withdrawScreen: false
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
        this.props.updatePlayer(player);
    }

    hireArmedGuard = () => {
        const player = this.props.player;
        player.money -= 5000;
        player.armedGuards++;
        player.travelCost = 25 * (player.armedGuards + 1);
        this.props.updatePlayer(player);
    }

    fireArmedGuard = () => {
        const player = this.props.player;
        player.armedGuards--;
        player.travelCost = 25 * (player.armedGuards + 1);
        this.props.updatePlayer(player);
    }

    toggleBankScreen = () => {
        this.setState({
            bankScreen: !this.state.bankScreen
        });
    }

    toggleDepositScreen = () => {
        this.setState({
            depositScreen: !this.state.depositScreen,
        });
    }

    toggleWithdrawScreen = () => {
        this.setState({
            withdrawScreen: !this.state.withdrawScreen
        });
    }

    moneyInput = (e) => {
        this.setState({
            moneyAmount: parseInt(e.target.value)
        });
    }

    depositMoney = (e) => {
        e.preventDefault();
        const player = this.props.player;
        const depositAmount = this.state.moneyAmount;
        player.banks[this.state.bankIndex].balance += depositAmount;
        player.money -= depositAmount;
        this.props.updatePlayer(player);
        this.setState({
            accountBalance: this.state.accountBalance + depositAmount,
            moneyAmount: 0
        },
            this.toggleDepositScreen
        );

    }

    withdrawMoney = (e) => {
        e.preventDefault();
        const player = this.props.player;
        const withdrawAmount = this.state.moneyAmount;
        player.banks[this.state.bankIndex].balance -= withdrawAmount;
        player.money += withdrawAmount;
        this.props.updatePlayer(player);
        this.setState({
            accountBalance: this.state.accountBalance - withdrawAmount,
            moneyAmount: 0
        },
            this.toggleWithdrawScreen
        );

    }

    render() {
        const player = this.props.player;
        let disabled = false;
        const maxDeposit = player.money;
        const maxWithdraw = this.state.accountBalance;

        return(
            <div>
                <div className="popup mainMenu">
                    <div className="choices">
                    <button onClick={ this.confirmNewGame }>New Game</button>
                    <button onClick={ this.confirmQuit }>Quit Game</button>
                    <button onClick={ this.toggleBankScreen }>Local Bank</button>
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
                {
                    this.state.bankScreen ?
                    <div className="popup bank">
                        <h3>Bank of {player.location}</h3>
                        <h4>Your account:</h4>
                        <div className="darkContainer bankBalance">
                            <h3>${this.state.accountBalance}</h3>
                        </div>
                        <div className="choices">
                            <button onClick={ this.toggleDepositScreen }>Deposit</button>
                            <button onClick={ this.toggleWithdrawScreen }>Withdraw</button>
                        </div>
                        <button onClick={ this.toggleBankScreen }>Back to Menu</button>
                    </div>
                    : null
                }
                {
                    this.state.depositScreen ?
                    <div className="popup depositScreen">
                        <h3>Deposit</h3>
                        <form onSubmit={ this.depositMoney } action="submit">
                            <label htmlFor="depositAmount">How much?</label>
                            <input onChange={ this.moneyInput } type="number" id="depositAmount" min="0" max={maxDeposit} />
                            <button type="submit">Deposit</button>
                        </form>
                        <button onClick={ this.toggleDepositScreen }>Cancel</button>
                    </div>
                    : null
                }
                {
                    this.state.withdrawScreen ?
                    <div className="popup withdrawScreen">
                        <h3>Withdraw</h3>
                        <form onSubmit={ this.withdrawMoney } action="submit">
                            <label htmlFor="withdrawAmount">How much?</label>
                            <input onChange={ this.moneyInput } type="number" id="withdrawAmount" min="0" max={maxWithdraw} />
                            <button type="submit">Withdraw</button>
                        </form>
                        <button onClick={ this.toggleDepositScreen }>Cancel</button>
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
                            <button onClick={ this.toggleUpgradeScreen }>Back to Menu</button>
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