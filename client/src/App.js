import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Routes from './Routes.js';
import Web3 from 'web3';
import controller from './contractController.js';

//var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var coinbase;
var bankAddr = "0xEd586f731CF380Ea09013909eac17FB174CeC483";
var warehouseAddr = "0x4FA9B933f1Ecaa4986191e570712BED7F1D46077";

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

  state = {
    account: "",
    insName: "",
  }

  constructor(props) {
    super(props);
    this.refresh = this.refresh.bind(this);
  }

  async componentDidMount() {
    if (typeof window.web3 !== 'undefined') {
      console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
      // Use Mist/MetaMask's provider
      this.web3 = new Web3(window.web3.currentProvider);
    } else {
      console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
      // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
      this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }
    await controller.deployReceiptSystem();
    await controller.registerInstitution("Bank A", 0, bankAddr);
    await controller.registerInstitution("Warehouse A", 2, warehouseAddr);
    controller.initialize(this.web3);
    this.refresh();
  }

  async refresh() {
    this.setState({account: await controller.getAccount()}, 
      () => {
        controller.getInstitution(this.state.account, 
          this.state.account)
          .then( ins => {
            this.setState({insName: ins.name});
          });
      });
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

        <button onClick={this.refresh}>refresh</button>
        
        <Routes account={this.state.account} insName={this.state.insName}/>

      </div>
    );
  }
}

//init();

export default App;
