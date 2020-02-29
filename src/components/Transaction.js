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
      return(
        <div className="popup transactionScreen">
          <h2>{this.props.item.type}</h2>
          <h3>Price: ${this.props.item.price}</h3>
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