import React, { Component } from 'react'; 
import SystemTopMenus from './topMenus';
// import { Jumbotron } from 'react-bootstrap'; 


class SystemHeader extends Component {
	render() {
        return(
            <div className="container">
                {/* <Jumbotron> */}
                <SystemTopMenus systemtoken={this.props.systemtoken} />
                {/* </Jumbotron> */}
            </div>
        );
    }
}

export default SystemHeader;