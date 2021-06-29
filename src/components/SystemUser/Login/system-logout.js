import React, { Component } from 'react'; 
import {  Redirect} from 'react-router-dom'

class SystemLogout extends Component { 
    /* constructor(props){
        super(props);
    } */
    

      render() {
        localStorage.removeItem("SystemRegistrationToken");
        localStorage.removeItem("jwt")
        return (
            <div>
                <Redirect to='/SystemUser' />
            </div>
        );

    }
}
export default SystemLogout;
