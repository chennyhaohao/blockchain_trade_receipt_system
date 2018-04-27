import React, { Component } from 'react';

const StatusComponent = (props) => {
	if (!props.status) return "";
	return (
		<p>Status: {props.status}</p>
	);
};

export default StatusComponent