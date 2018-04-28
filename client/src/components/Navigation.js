import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class NavLink extends Link {
	render() {
		return (
			<NavItem eventKey = {this.props.eventKey}>{this.props.content}</NavItem>
		);
	}
}

class NavigationComponent extends React.Component {
    render() {
    	//var activeKey = null;
    	//console.log(window.location);
    	/*if (window.location.href.includes('/verify')) {
    		activeKey = 0;
    	} else if (window.location.href.includes('/issue')) {
    		activeKey = 1;
    	}*/
    	//console.log(activeKey);
        return (
            <Nav bsStyle="tabs">
                
                <LinkContainer to="/verify">
                	<NavItem eventKey = {0}>Verification Interface</NavItem>
                </LinkContainer> {" "}

                <LinkContainer to="/issue">
                	<NavItem eventKey = {1}>Issue Interface</NavItem>
                </LinkContainer>
            </Nav>
        );
    }
}

export default NavigationComponent;