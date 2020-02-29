import React, { Component } from 'react';

class StartScreen extends Component {
    constructor() {
        super();
        this.state = {
            signIn: false,
            signUp: false,
        };
    }
    
    render() {
        return(
            <div className="startScreen">
                <h1>Merchant's Road</h1>
                <button>New Game</button>
                <button>Load Game</button>
            </div>
        );
    }
}

export default StartScreen;