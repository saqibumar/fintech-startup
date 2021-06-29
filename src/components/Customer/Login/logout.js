import React, { Component } from 'react'; 
import {  Redirect} from 'react-router-dom'

class Logout extends Component { 
    /* constructor(props){
        super(props);
    } */
    

      render() {
        // "mounted");
        localStorage.removeItem("RegistrationToken");
        localStorage.removeItem("jwt")
        return (
            <div>
                <Redirect to='/' />
            </div>
        );

    }
}
export default Logout;
