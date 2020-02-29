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
        console.log(this.state.currentEncounter.outcomes[choice]);
        this.props.encounterResult();
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