import React, { Component } from 'react';

const WelcomeComponent = (props) => {
	return (
		<div className="Welcome">
			Welcome{!props.insName ? "" :
					", " + props.insName}! <br />
				{ !props.account ? "" : 
					"Your account: " + props.account} 
		</div>
	);
};

export default WelcomeComponent;