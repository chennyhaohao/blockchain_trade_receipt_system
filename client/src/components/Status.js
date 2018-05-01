import React, { Component } from 'react';

const StatusComponent = (props) => {
	if (!props.status) return "";
	return (
		<p><b>Status:</b> {props.status}</p>
	);
};

export default StatusComponent