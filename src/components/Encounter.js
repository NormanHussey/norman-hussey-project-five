import React, { Component } from 'react';

import encounterScenarios from '../data/encounterScenarios';

class Encounter extends Component {
    constructor() {
        super();
        this.state = {
            encountersLeft: 0
        };
    }

    componentDidMount() {
        this.setState({
            encountersLeft: this.props.encounters
        },
            this.chooseEncounter
        );
    }

    chooseEncounter = () => {

    }

    render() {

        return(
            <div className="popup encounter">
                <p>An encounter!</p>
                <button onClick={ this.props.close }>Continue</button>
            </div>
        );
    }
}

export default Encounter;