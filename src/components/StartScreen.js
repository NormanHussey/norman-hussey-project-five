import React, { Component } from 'react';

import NewGame from './NewGame';
import LoadGame from './LoadGame';

class StartScreen extends Component {
    constructor() {
        super();
        this.state = {
            newGame: false,
            loadGame: false,
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

    render() {
        return(
            <div className="startScreen">
                { 
                    !this.state.newGame && !this.state.loadGame ?
                    <div className="ornateContainer">
                        <h1>Merchant's Road</h1>
                        <div className="choices">
                            <button onClick={this.chooseNewGame}>New Game</button>
                            <button onClick={this.chooseLoadGame}>Load Game</button>
                        </div>
                    </div>
                    : null 
                }
                { this.state.newGame ? <NewGame startNewGame={ this.props.startNewGame } allPlayers={Object.keys(this.props.allPlayers)} countries={this.props.countries}/> : null}
                { this.state.loadGame ? <LoadGame loadGame={ this.props.loadGame } allPlayers={this.props.allPlayers} /> : null}
            </div>
        );
    }
}

export default StartScreen;