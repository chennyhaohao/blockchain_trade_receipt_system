import sha256 from 'crypto-js/sha256';
import crypto from 'crypto-js';
import React, { Component } from 'react';
import Radium from 'radium';
import './Issue.css';
import web3 from 'web3';
import controller from '../contractController.js';
import Status from './Status.js';
import Welcome from './Welcome.js';
import FileHolder from './FileHolder.js';
import {Button, Glyphicon} from 'react-bootstrap';


class VerifyComponent extends Component {

	state = {
		hash: "",
		verificationResult: null,
		status: ""
	};

	constructor(props) {
		super(props);
		this.dropHandler = this.dropHandler.bind(this);
		this.verifyReceipt = this.verifyReceipt.bind(this);
		this.claimReceipt = this.claimReceipt.bind(this);
		this.renderResult = this.renderResult.bind(this);
	}

	dropHandler(e) {
		e.preventDefault();
		console.log("File dropped");

		var file = e.dataTransfer.files[0];
		var reader = new FileReader();

		reader.onload = (e) => {
			var binary = e.target.result;
			var hash = sha256(binary);
			hash = hash.toString(crypto.enc.Base64);
			console.log(hash);
			this.setState({hash: hash});
		};

		reader.readAsBinaryString(file);
	}

	async verifyReceipt() {
		var result = await controller.verifyReceipt(this.state.hash, 
			this.props.account);
		this.setState({verificationResult: result});
	}

	async claimReceipt() {
		try {
			await controller.claimReceipt(this.state.hash, this.props.account);
			this.setState({status: "Receipt claimed!"});
		} catch(e) {
			console.log(e);
			this.setState({status: "Failed to claim receipt."});
		}
	}

	renderResult() {
		var result = this.state.verificationResult;
		if (!result) return "";
		if (!result.exists) {
			return (
				<div className="results">
					Receipt doesn't exist.
				</div>
			);
		}

		return (
			<div className="results">
				<b>Issued by:</b> {result.issuer} <br />
				<b>Valid:</b> {result.valid ? "Yes" : "No"} <br />
				{result.possessed ? <span> <b>Currently in possession of: </b> 
					{result.possesser} </span> : ""}
			</div>
		);

	}

	render() {
		return (
			<div className="VerifyComponent">
				<h4>Verify Interface</h4>
				<Status status = {this.state.status} />
				<Welcome {...this.props} />
				<FileHolder dropHandler = {this.dropHandler} />
				{
					this.state.hash === "" ? 
					"" : <p>Receipt hash: {this.state.hash} </p>
				}
				<Button onClick={this.verifyReceipt}>
					<Glyphicon glyph="check" />verify receipt
				</Button>
				<Button onClick={this.claimReceipt}>
					<Glyphicon glyph="download" />claim receipt
				</Button><br />
				{this.renderResult()}
			</div>
		);
	}
}

export default VerifyComponent;