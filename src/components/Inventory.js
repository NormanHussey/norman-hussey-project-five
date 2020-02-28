import React, { Component } from 'react';

import InventoryItem from './InventoryItem';

class Inventory extends Component {
    render() {
        const owner = this.props.owner;
        return(
            <div className = "inventory">
            <h1>{owner.name}</h1>
            { owner.maxInventory ? <h2>{owner.inventorySize} / {owner.maxInventory}</h2> : null}
            {
              owner.inventory.map((item, index) => {
                if (item.type !== "empty") {
                  return(
                    <InventoryItem item={item} key={index} clickFunction={(item) => { this.props.clickFunction(owner, item) }}/>
                  );
                } else {
                  return false;
                }
              })
            }
          </div>
        );
    }
}

export default Inventory;