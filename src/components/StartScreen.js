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
                        <p>You are a lonely merchant traveling the treacherous roads of Medieval Europe in search of fortune. Make your way from town to town buying low and selling high but be wary of the many dangers that await you along the way.</p>
                        <p>Click items in your inventory to sell them and items in the town's inventory to buy them. Use the travel button to take you around Europe but be mindful of traveling expenses.</p>
                        <button onClick={ this.backToMainMenu }>Main Menu</button>
                    </div>
                : null
                }
            </div>
        );
    }
}

export default StartScreen;