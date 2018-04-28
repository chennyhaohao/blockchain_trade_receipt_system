import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, NavItem } from 'react-bootstrap';


class NavigationComponent extends React.Component {
    render() {
        return (
            <Nav bsStyle="pills">
                <NavItem><Link to="/verify">Verification Interface</Link></NavItem>
                <NavItem><Link to="/issue">Issuing Interface</Link></NavItem>
            </Nav>
        );
    }
}

export default NavigationComponent;