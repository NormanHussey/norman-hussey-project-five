import React, { Component } from 'react';

class Transaction extends Component {
    constructor() {
      super();
      this.state = {
        qty: 0
      };
    }
  
    inputChange = (e) => {
      this.setState({
        qty: parseInt(e.target.value)
      });
    }
  
    handleFormSubmit = (e) => {
      e.preventDefault();
      this.props.transactionClicked(this.state.qty);
    }
  
    render() {
      let priceDisplay = 'Price';
      if (this.props.type === 'Sell') {
        priceDisplay = 'Cost';
      }
      return(
        <div className="popup transactionScreen">
          <div>
            <h2>{this.props.item.type}</h2>
            <h3>{priceDisplay}: ${this.props.item.price}</h3>
            <h4>Qty: {this.props.item.qty}</h4>
          </div>
          <form onSubmit={ this.handleFormSubmit }>
            <input type="number" onChange={ this.inputChange } min="0" max={this.props.maxQty}/>
            <button type="submit">{this.props.type}</button>
          </form>
          <button onClick={this.props.cancel}>Cancel</button>
        </div>
      );
    }
  }

  export default Transaction;