import React, { Component } from 'react';

const FileHolderComponent = (props) => {
	return (
		<div id="holder" 
			onDrop = {props.dropHandler}
			onDragOver = {(e)=>{e.preventDefault();}}
			onDragEnd = {(e)=>{return false;}}
		> Drag and drop the receipt file here </div>
	);
}

export default FileHolderComponent;