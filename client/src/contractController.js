import Web3 from 'web3';
import contract from 'truffle-contract';
//var artifacts_path = '../../build/contracts/';
import Receipt_artifacts from './build/contracts/ReceiptSystem.json';

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

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
		this.ReceiptSystem.setProvider(web3.currentProvider); //localhost:8545
		web3versionFix(this.ReceiptSystem);
	}

	initialize(_web3) { //Switch to MetaMask
		web3 = _web3;
		this.ReceiptSystem.setProvider(web3.currentProvider);
		web3versionFix(this.ReceiptSystem);
	}

	async getAccount() {
		var resolve;
		var result = new Promise((res, rej) => {
			resolve = res;
		});
		web3.eth.getAccounts()
			.then( accounts => {
				this.account = accounts[0];
				console.log("Got account: ", this.account);
				return resolve(this.account);
			});
		return await result;
	}

	async deployReceiptSystem() { //Directly deploy into localhost:8545
		try {
			this.coinbase = await web3.eth.getCoinbase();
			console.log("coinbase: ", this.coinbase);
			console.log("Deploying Receipt System...");
			var instance = await this.ReceiptSystem.new(
				{from: this.coinbase, gas: 4000000});
			console.log("Receipt system deployed at: ", instance.address);
			this.ReceiptSystemAddress = instance.address;
	        return instance.address;
		} catch(e) {
			throw e;
		}
	}

	async registerInstitution(name, type, addr) { //Directly use localhost:8545
		try {
			console.log("Registering institution...");
			var instance = await this.ReceiptSystem.at(this.ReceiptSystemAddress);
			var result = await instance.registerInstitution(name, type, addr, {
				from: this.coinbase,
				gas: 400000
			});
			console.log("Institution registered. Tx: ", result.tx);
	        return result.tx;
		} catch(e) {
			throw e;
		}
	}

	async issueReceipt(hash, fromAddr) {
		try {
			console.log("Issuing receipt...");
			var instance = await this.ReceiptSystem.at(this.ReceiptSystemAddress);
			var result = await instance.issueReceipt(hash, {
				from: fromAddr,
				gas: 400000
			});
			console.log("Receipt issued. Tx: ", result.tx);
	        return result.tx;
		} catch(e) {
			throw e;
		}
	}

	async verifyReceipt(hash, fromAddr) {
		try {
			console.log("Verifying receipt...");
			var instance = await this.ReceiptSystem.at(this.ReceiptSystemAddress);
			var result = await instance.verifyReceipt.call(hash, {
				from: fromAddr
			});
			console.log("Receipt info: ", result);
	        return result;
		} catch(e) {
			throw e;
		}
	}

	async getInstitution(addr, fromAddr) {
		try {
			var instance = await this.ReceiptSystem.at(this.ReceiptSystemAddress);
			var result = await instance.getInstitutionByAddr.call(addr, 
				{from: fromAddr});
			console.log("Got institution: ", result);
			var ret = {};
			ret.name = web3.utils.toAscii(result[0]).replace(/\0/g, '');
			//Convert to string and trim null characters
			ret.type = result[1].valueOf();
			console.log(ret);
			return ret;			
		} catch(e) {
			throw e;
		}
	}

}

var controller = new Controller();

export default controller;