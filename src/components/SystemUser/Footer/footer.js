import React, { Component } from 'react'; 

function TimeX(){
    var d = new Date();
    return d.getFullYear()-1 + " - " + d.getFullYear();
}
class Footer extends Component {
	render() {
        return(
            <div className="container footer">
                {/* <Jumbotron> */}
                Sr.Preston @Copyright(<TimeX />)
                {/* </Jumbotron> */}
            </div>
        );
    }
}

export default Footer;