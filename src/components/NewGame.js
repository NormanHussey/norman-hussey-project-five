import React, { Component } from 'react';

class NewGame extends Component {
    constructor() {
        super();
        this.state = {
            userName: '',
            password: '',
            countryChoice: '',
            uniqueUserName: true
        };
    }

    enteringUserName = (e) => {
        const entry = e.target.value;
        let uniqueUserName = true;
        this.props.allPlayers.forEach((username)=> {
            if (entry === username) {
                uniqueUserName = false;
            }
        });

        this.setState({
            userName: entry,
            uniqueUserName: uniqueUserName
        });
    }

    render() {
        return(
            <div className="startNewGame">
                <div>
                    <h2>Create an account:</h2>
                    <h3>(An account will allow you to save your game and return to it later)</h3>
                </div>
                <form action="submit" className="newGameForm">
                    <label htmlFor="newUserName">Choose your user name: </label>
                    <input onChange={this.enteringUserName} type="text" name="newUserName" id="newUserName" minLength="2" />
                    { !this.state.uniqueUserName ? <p>Username already exists</p> : null }
                    <label htmlFor="newPassword">Choose a password (at least 4 characters): </label>
                    <input type="password" name="newPassword" id="newPassword" minLength="4"/>
                    <label htmlFor="newCountryChoice">Choose a starting country:</label>
                    <select id="newCountryChoice">
                        {
                            this.props.countries.map((country, index)=> {
                                const key = `newCountry${index}`;
                                return(
                                    <option key={key} value={country}>{country}</option>
                                );
                            })
                        }
                    </select>
                    <button type="submit">Begin</button>
                </form>
                <h2>Or play as a guest:</h2>
                <form action="submit" className="newGameForm">
                    <label htmlFor="guestCountryChoice">Choose a starting country:</label>
                        <select id="guestCountryChoice">
                            {
                                this.props.countries.map((country, index)=> {
                                    const key = `guestCountry${index}`;
                                    return(
                                        <option key={key} value={country}>{country}</option>
                                    );
                                })
                            }
                        </select>
                    <button type="submit">Begin as Guest</button>
                </form>

            </div>
        );
    }
}

export default NewGame;