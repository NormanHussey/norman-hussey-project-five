import React, { Component } from 'react';

import encounterScenarios from '../data/encounterScenarios';
import getRandomIntInRange, { getRandomIntInRangeExclusive, getRandomFloatInRange, probability } from '../functions/randomizers';

class Encounter extends Component {
    constructor() {
        super();
        this.state = {
            encountersLeft: 0,
            currentEncounter: ''
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
        const choice = getRandomIntInRangeExclusive(0, encounterScenarios.length);
        this.setState({
            currentEncounter: encounterScenarios[choice]
        });
    }

    processPlayerChoice = (choice) => {
        const scenario = this.state.currentEncounter;
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
    }

    render() {
        const scenario = this.state.currentEncounter;
        return(
            <div className="popup encounter">
                { this.state.currentEncounter ? 
                    <div>
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