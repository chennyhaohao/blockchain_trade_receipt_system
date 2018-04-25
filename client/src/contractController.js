import Web3 from 'web3';
import contract from 'truffle-contract';
//var artifacts_path = '../../build/contracts/';
import Receipt_artifacts from './build/contracts/ReceiptSystem.json';

//var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var web3;

function web3versionFix(abstract) {
	//Fix truffle compatibility issue with web3 v1.0.0
	if (typeof abstract.currentProvider.sendAsync !== "function") {
			console.log("Fixing");
		  abstract.currentProvider.sendAsync = function() {
		    return abstract.currentProvider.send.apply(
		      abstract.currentProvider, arguments
		    );
		};
	}
}

class Controller {
	constructor() {
		this.ReceiptSystem = contract(Receipt_artifacts);
	}

	initialize(_web3) { //Initialize the global web3 object
		web3 = _web3;
		this.ReceiptSystem.setProvider(web3.currentProvider);
		web3versionFix(this.ReceiptSystem);
		web3.eth.getAccounts(console.log);
	}

	
}

var controller = new Controller();

export default controller;