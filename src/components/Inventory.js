import React, { Component } from 'react';

import InventoryItem from './InventoryItem';

class Inventory extends Component {
    render() {
        const owner = this.props.owner;
        return(
            <div className = "inventory">
            <h1>{owner.name}</h1>
            {
              owner.inventory.map((item, index) => {
                return(
                  <InventoryItem item={item} key={index} clickFunction={(item) => { this.props.clickFunction(owner, item) }}/>
                );
              })
            }
          </div>
        );
    }
}

export default Inventory;