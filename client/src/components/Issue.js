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

//@Radium
class IssueComponent extends Component {

	state = {
		hash: "",
		status: ""
	};

	constructor(props) {
		super(props);
		this.dropHandler = this.dropHandler.bind(this);
		this.issueReceipt = this.issueReceipt.bind(this);
		this.invalidateReceipt = this.invalidateReceipt.bind(this);
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

	async issueReceipt() {
		try {
			await controller.issueReceipt(this.state.hash, this.props.account);
			this.setState({status: "Receipt issued!"});
		} catch(e) {
			console.log(e);
			this.setState({status: "Failed to issue receipt."});
		}
	}

	async invalidateReceipt() {
		try {
			await controller.invalidateReceipt(this.state.hash, 
				this.props.account);
			this.setState({status: "Receipt invalidated!"});
		} catch(e) {
			console.log(e);
			this.setState({status: "Failed to invalidate receipt."});
		}
	}

	render() {
		return (
			<div className="IssueComponent">
				<h>Issue Interface</h>
				<Status status = {this.state.status} />
				<Welcome {...this.props} />
				<FileHolder dropHandler = {this.dropHandler} />
				{
					this.state.hash === "" ? 
					"" : <p>Receipt hash: {this.state.hash} </p>
				}
				<Button onClick={this.issueReceipt}>
					<Glyphicon glyph="upload" />Issue Receipt
				</Button>
				<Button onClick={this.invalidateReceipt}>
					<Glyphicon glyph="remove" />invalidate Receipt
				</Button>
				<br />
			</div>
		);
	}
}

export default IssueComponent;