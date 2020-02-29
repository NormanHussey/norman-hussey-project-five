import React, { Component } from 'react';

import NewGame from './NewGame';

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
                <h1>Merchant's Road</h1>
                { 
                    !this.state.newGame && !this.state.loadGame ?
                    <div className="choices">
                        <button onClick={this.chooseNewGame}>New Game</button>
                        <button onClick={this.chooseLoadGame}>Load Game</button>
                    </div>
                    : null 
                }
                { this.state.newGame ? <NewGame startNewGame={ this.props.startNewGame } allPlayers={Object.keys(this.props.allPlayers)} countries={this.props.countries}/> : null}
            </div>
        );
    }
}

export default StartScreen;