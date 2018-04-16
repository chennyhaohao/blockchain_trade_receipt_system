import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Routes from './Routes.js';
import Web3 from 'web3';

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var coinbase;

async function init() {
    try {
      coinbase = await web3.eth.getCoinbase();
      console.log("Coinbase:", coinbase);
    } catch(e) {
      console.log("Coinbase err: ", e);
    }

}

class App extends Component {
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

init();

export default App;
