import React, { Component } from 'react';

import NewGame from './NewGame';
import LoadGame from './LoadGame';

class StartScreen extends Component {
    constructor() {
        super();
        this.state = {
            newGame: false,
            loadGame: false,
            howToPlay: false
        };
    }

    chooseNewGame = () => {
        this.setState({
            newGame: !this.state.newGame
        });
    }

    chooseLoadGame = () => {
        this.setState({
            loadGame: !this.state.loadGame
        });
    }

    chooseHowToPlay = () => {
        this.setState({
            howToPlay: !this.state.howToPlay
        });
    }

    backToMainMenu = () => {
        this.setState({
            newGame: false,
            loadGame: false,
            howToPlay: false
        });
    }

    render() {
        return(
            <div className="startScreen">
                { 
                    !this.state.newGame && !this.state.loadGame && !this.state.howToPlay ?
                    <div className="ornateContainer">
                        <h1>Merchant's Road</h1>
                        <div className="choices">
                            <button onClick={this.chooseNewGame}>New Game</button>
                            <button onClick={this.chooseLoadGame}>Load Game</button>
                            <button onClick={this.chooseHowToPlay}>How To Play</button>
                        </div>
                    </div>
                    : null 
                }
                { this.state.newGame ? <NewGame mainMenu={ this.backToMainMenu } startNewGame={ this.props.startNewGame } allPlayers={Object.keys(this.props.allPlayers)} countries={this.props.countries}/> : null}
                { this.state.loadGame ? <LoadGame mainMenu={ this.backToMainMenu } loadGame={ this.props.loadGame } allPlayers={this.props.allPlayers} /> : null}
                { this.state.howToPlay ?
                    <div className="ornateContainer howToPlay">
                        <h2>How To Play</h2>
                        <div className="instructions">
                            <p>You are a lonely merchant traveling the treacherous roads of Medieval Europe in search of fortune. Make your way from town to town buying low and selling high but be wary of the many dangers that await you on the road.</p>
                            <h3>Market</h3>
                            <p>Click items in your inventory to sell them and click items in the town's inventory to buy them. It's as simple as that.</p>
                            <h3>Travel</h3>
                            <p>Use the travel button to take you around Europe but be mindful of travel expenses. You cannot travel to a place unless you can afford the trip. Time only passes when you travel and scenarios of all kinds can happen along the way. </p>
                            <h3>Caravan</h3>
                            <p>You can manage your caravan from the menu screen. You can purchase extra inventory slots or hire and fire armed guards to aid you in times of need. Armed guards will increase your likelihood of winning a fight or avoiding one.</p>
                            <h3>Banks</h3>
                            <p>Banks can be your saviour or your nemesis so use them wisely. Any money deposited in a bank is safe from the dangers of the road and will even accrue interest for you. Banks can also help you in times of need by allowing you to borrow money from them. Borrowed money will also accrue interest though so be mindful of your debts. After 10 days of unpaid debts, the banks will send a debt collector after you who may turn up unexpectedly along the road. If you refuse to pay the collector, he may take more than just your debt. Also note that all banks work independently so if you make a deposit or take out a loan then you'll have to return to that town to get your money or pay your debt. Similarly, paying the debt collector from one town won't stop other towns from sending their own collectors after you.</p>
                        </div>
                        <button onClick={ this.backToMainMenu }>Main Menu</button>
                    </div>
                : null
                }
            </div>
        );
    }
}

export default StartScreen;