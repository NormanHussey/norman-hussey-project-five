import React, { Component } from 'react';

import encounterScenarios from '../data/encounterScenarios';
import getRandomIntInRange, { getRandomIntInRangeExclusive, getRandomFloatInRange, probability } from '../functions/randomizers';

class Encounter extends Component {
    constructor() {
        super();
        this.state = {
            encounters: [],
            currentEncounter: 0,
            encountersLeft: 0
        };
    }

    componentDidMount() {
        const encountersArray = [];
        for (let i = 0; i < this.props.numberOfEncounters; i++) {
            const choice = getRandomIntInRangeExclusive(0, encounterScenarios.length);
            encountersArray.push(encounterScenarios[choice]);
        }
        this.setState({
            encounters: encountersArray
        });
    }

    processPlayerChoice = (choice) => {
        const scenario = this.state.encounters[this.state.currentEncounter];
        const player = this.props.player;
        console.log(scenario.outcomes[choice]);
        if (scenario.type === 'robbery') {
            switch (choice) {
                case 0:
                    // Give him money
                    const percentToSteal = getRandomIntInRange(1, 25);
                    const moneyStolen = Math.round(player.money * (percentToSteal / 100));
                    player.money -= moneyStolen;
                    break;
            }
        }
        this.props.encounterResult(player);
        const encountersArray = [...this.state.encounters];
        encountersArray.shift();
        this.setState({
            encounters: encountersArray
        });
    }

    render() {
        const scenario = this.state.encounters[this.state.currentEncounter];
        return(
            <div className="popup encounter">
                { this.state.encounters.length > 0 ?
                    <div key={'scenario' + this.state.currentEncounter}>
                        <p>{scenario.text}</p>
                        <div className="choices">
                            {
                                scenario.options.map((option, index)=> {
                                    return(
                                        <button onClick={
                                            ()=> { this.processPlayerChoice(index) }
                                        } key={scenario.type + index}>{option}</button>
                                    );
                                })
                            }
                        </div>
                    </div>
                    : null
                }
            </div>
        );
    }
}

export default Encounter;