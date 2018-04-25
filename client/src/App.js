import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Routes from './Routes.js';
import Web3 from 'web3';
import controller from './contractController.js';

//var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var coinbase;

/*
async function init() {
    try {
      coinbase = await web3.eth.getCoinbase();
      console.log("Coinbase:", coinbase);
    } catch(e) {
      console.log("Coinbase err: ", e);
    }

}*/

class App extends Component {

  componentDidMount() {
    if (typeof window.web3 !== 'undefined') {
      console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
      // Use Mist/MetaMask's provider
      this.web3 = new Web3(window.web3.currentProvider);
    } else {
      console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
      // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
      this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }

    controller.initialize(this.web3);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
        </p>
        
        <Routes />

      </div>
    );
  }
}

//init();

export default App;
