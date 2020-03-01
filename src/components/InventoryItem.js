import React, { Component } from 'react';

class InventoryItem extends Component {
    render() {
        const item = this.props.item;
        return(
            <div className="inventoryItem rpgui-container framed-grey" onClick={() => { this.props.clickFunction(item) }}>
            <p>Type: {item.type}</p>
            <p>Qty: {item.qty}</p>
            <p>Price: {item.price}</p>
            </div>
        );
    }
}

export default InventoryItem;