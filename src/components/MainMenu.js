import React, { Component } from 'react';

import ChooseCountry from './ChooseCountry';

class MainMenu extends Component {
    constructor() {
        super();
        this.state = {
            startNewGame: false,
            quitGame: false,
            chooseNewCountry: false
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
            quitGame: false
        },
            this.props.close
        );
    }

    closeCountryMenu = (countryChoice) => {
        this.closeMenu();
        this.props.beginGame(countryChoice);
    }

    render() {
        return(
            <div>
                <div className="popup mainMenu">
                    <div className="choices">
                    <button onClick={ this.confirmNewGame }>New Game</button>
                    <button onClick={ this.confirmQuit }>Quit Game</button>
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
                    { this.props.playerName === "Nameless Merchant" ? <p>(All of your current progress will be lost)</p> : <p>(Your game is saved)</p>}
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