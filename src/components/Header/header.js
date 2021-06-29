import React, { Component } from 'react'; 
import TopMenus from './topMenus';
// import { Jumbotron } from 'react-bootstrap'; 


class Header extends Component {
	render() {
        return(
            <div className="container">
                {/* <Jumbotron> */}
                <TopMenus token={this.props.token} />
                {/* </Jumbotron> */}
            </div>
        );
    }
}

export default Header;