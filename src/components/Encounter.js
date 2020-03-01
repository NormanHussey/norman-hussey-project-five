import React, { Component } from 'react';

import encounterScenarios from '../data/encounterScenarios';
import getRandomIntInRange, { getRandomIntInRangeExclusive, getRandomFloatInRange, probability } from '../functions/randomizers';

class Encounter extends Component {
    constructor() {
        super();
        this.state = {
            encounters: [],
            currentEncounter: 0
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
        const outcome = {
            type: 'resolved',
            text: scenario.outcomes[choice]
        };
        if (scenario.type === 'robbery') {
            switch (choice) {
                case 0:
                    // Give him money
                    const percentToSteal = getRandomIntInRange(1, 25);
                    const moneyStolen = Math.round(player.money * (percentToSteal / 100));
                    player.money -= moneyStolen;
                    outcome.text = `
                        ${outcome.text}
                        You lost $${moneyStolen}.
                    `;
                    break;
            }
        }
        this.props.encounterResult(player);
        this.showOutcome(outcome);
    }

    showOutcome = (outcome) => {
        const encountersArray = [...this.state.encounters];
        encountersArray[0] = outcome;
        this.setState({
            encounters: encountersArray
        });
    }

    nextEncounter = () => {
        const encountersArray = [...this.state.encounters];
        encountersArray.shift();
        this.setState({
            encounters: encountersArray
        });
        this.props.adjustNumberOfEncounters(encountersArray.length);
    }

    render() {
        const scenario = this.state.encounters[this.state.currentEncounter];
        return(
            <div className="popup encounter">
                { this.state.encounters.length > 0 ?
                    <div key={scenario.type + Math.random()}>
                        <p>{scenario.text}</p>
                        <div className="choices">
                            {
                                scenario.type !== 'resolved' ?
                                scenario.options.map((option, index)=> {
                                    return(
                                        <button onClick={
                                            ()=> { this.processPlayerChoice(index) }
                                        } key={scenario.type + index}>{option}</button>
                                    );
                                })
                                :
                                <button onClick={this.nextEncounter} key={scenario.text + Math.random()}>Continue</button>
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