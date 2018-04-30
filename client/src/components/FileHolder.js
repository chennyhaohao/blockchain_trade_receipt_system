import React, { Component } from 'react';

class FileHolderComponent extends Component {
	state = {
		margin: "auto",
		border: "10px dashed #ccc",
		width: "150px",
		height: "150px"
	};
	render() {
		return (		
			<div id="holder" 
				style = {this.state}
				onDrop = {this.props.dropHandler}
				onDragOver = {(e)=>{e.preventDefault();}}
				onDragEnd = {(e)=>{return false;}}
				onMouseOver = {(e)=>{this.setState({border:"10px dashed #333"});}}
				onMouseOut = {(e)=>{this.setState({border:"10px dashed #ccc"});}}
			> Drag and drop the receipt file here </div>
		);
	}
}

export default FileHolderComponent;