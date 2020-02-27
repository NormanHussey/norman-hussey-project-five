import React, { Component } from 'react';

class InventoryItem extends Component {
    render() {
        const item = this.props.item;
        return(
            <div className="inventoryItem" onClick={() => { this.props.clickFunction(item) }}>
            <p>Type: {item.type}</p>
            <p>Qty: {item.qty}</p>
            <p>Price: {item.price}</p>
            </div>
        );
    }
}

export default InventoryItem;