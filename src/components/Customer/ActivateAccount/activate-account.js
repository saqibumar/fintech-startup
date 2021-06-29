import React, {Component} from 'react';
//import { Link} from 'react-router-dom'
import Header from '../../Header/header';
import HourGlass from '../../Common/hourGlass';
import './activate-account.css'

// const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

class ActivateAccount extends Component {
  constructor(props){
    super(props);
    this.state = {
        isFetching: false, 
        fetchError: null,
        didActivate:false,
    }
  }

  componentDidUpdate(){
    // "DidUpdate");
}
componentDidMount(){
    // "LOADED")
    this.activateAccount();
}

activateAccount = () => {
    this.setState({
        isFetching: true,
    })
// "this.props.match.params.Token",  this.props.match.params);
let params = this.props.match.params;

    const request = {
        registrationToken: params.regToken
    };
    //TODO: store api URL in a config file
    var config = require('../../../Config/config.json');
    fetch(config.apiUrl + "activateCustomer", {
        method: 'POST', 
        headers: {
            //Accept: 'application/json', 
            'Content-Type': 'application/json', 
            //Authorization: this.props.token
        }, 
        body: JSON.stringify(request)
    })
    .then(response => response.json())
    .then(result => {
        //setTimeout(() => {
            if(result.error){
                throw new Error(result.error.message);
            }
            this.setState ({
                isFetching: false, 
                fetchError: null,
                didActivate:true,        
            });
            //this.forceUpdate();
        //}, 3000);

    })
    .catch(e => {
        this.setState({
            isFetching: false, 
            fetchError: e.message,
        });
    });

}
  

  render() {
    if (this.state.isFetching === true) {
        return <div><HourGlass /></div>;
    }

     return (
         <div className="xcontainer">
             <Header token={localStorage.getItem("RegistrationToken")} />
             <div className="row bgBar">
             <div className="col">
                 Account Activation           
             </div>
             </div>
             <div className="container">
             <div className="row">
             <div className="col reset-box">
                <h2>Summary</h2>
                    <div style={styles.failure} hidden={!this.state.fetchError}>
                    <img src='/images/failure.png' style={{width:'30px'}} alt="failure" />
                    {this.state.fetchError}
                    </div>
                    <div style={styles.success} hidden={!this.state.didActivate}>
                       <img src='/images/success.png' style={{width:'30px'}} alt="success" />
                        Your account has been activated. 
                    </div>           
             </div>
             </div>
         </div>
         </div>

    );
  }
}

const styles = {
    failure:{
        color: 'red',
        textAlign:'left', 
        padding:'5px'
    },
    success:{
        color:'green', 
        textAlign:'left', 
        padding:'5px'
    }
}

export default ActivateAccount;
