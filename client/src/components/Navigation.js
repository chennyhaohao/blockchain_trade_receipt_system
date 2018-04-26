import React from 'react';
import { Link } from 'react-router-dom';



class NavigationComponent extends React.Component {
    render() {
        return (
            <div>
                <Link to="/verify">Verification Interface</Link>  {' '}
                <Link to="/issue">Issuing Interface</Link> {' '}
            </div>
        );
    }
}

export default NavigationComponent;