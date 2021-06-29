import React, {Component} from 'react';
import Header from '../../Header/header';
import HourGlass from '../../Common/hourGlass';
import './forgot-password.css';


// const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

class SystemForgotPassword extends Component {
  constructor(props){
    super(props);
    this.state = {
        email: '',
        formErrors: {email: ''},
        emailValid: false,
        formValid: false,
        isFetching: false, 
        fetchError: null,
        isEmailSent: false,
        emailTo: null
    }
  }

  componentDidUpdate(){
    // "DidUpdate", this.props);
}

handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
        email: this.state.email,
        password: this.state.password,
        isFetching: true,
    })

    const request = {
        email: this.state.email,
        password: this.state.password,
    };
    var config = require('../../../Config/config.json');
    fetch(config.apiUrl + "recoverPassword", {
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
            
            // "result = ", result);
            if(result.error){
                throw new Error("Email does not exist");
            }
            this.setState ({
                isFetching: false,
                fetchError: null,
                isLoginFailed: false,
                isEmailSent: result.isEmailSent,
                emailTo: result.CustomerData.Email
            });
            //this.forceUpdate();
        //}, 3000);

    })
    .catch(e => {
        // e); 
        this.setState({
            isFetching: false, 
            fetchError: e.message,
            isLoginFailed: true
        });
    });

}
handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({[name]: value},
        () => { this.validateField(name, value) });
}

validateField(fieldName, value) {
let fieldValidationErrors = this.state.formErrors;
let emailValid = this.state.emailValid;
// let passwordValid = this.state.passwordValid;

switch(fieldName) {
    case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' es inválido';
        break;
    default:
    break;
}
this.setState({formErrors: fieldValidationErrors,
                emailValid: emailValid,
                }, this.validateForm);
}

validateForm() {
this.setState({formValid: this.state.emailValid});
}

errorClass(error) {
return(error.length === 0 ? '' : 'has-error');
}    

  render() {
    if (this.state.isFetching === true) {
        return <div><HourGlass /></div>;
    }

     return (
         <div className="xcontainer">
            <div id="header">
                <Header token={localStorage.getItem("RegistrationToken")} />
            </div>
             <div className="row bgBar">
             <div className="col">
                 We will send you an email that will let you change the password              
             </div>
             </div>
             <div className="container">
             <div className="row">
             <div className="col reset-box">
                <h2>Reset your password</h2>   
                <form onSubmit={this.handleSubmit} className="resetPasswordForm">
                    <div style={styles.failure} hidden={!this.state.isLoginFailed}>
                    <img  src='/images/failure.png' style={{width:'30px'}} alt="failure" />
                    {this.state.fetchError}
                    </div>
                    <div style={styles.success} hidden={!this.state.isEmailSent}>
                       <img src='/images/success.png' style={{width:'30px'}} alt="success" />
                        Email sent to {this.state.emailTo} <br />
                        Please check your email to recover your password.
                    </div>

                <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
                            <input 
                                required className="form-control"
                                value={this.state.email}
                                placeholder="Please enter your email address" type="text" name="email" onChange={this.handleChange} />
                        </div>
                        
                            <button type="submit" value="Reset"
                                className="btn btn-primary"
                                disabled={!this.state.formValid}>Request Reset</button>&nbsp;

                        <div className="panel panel-default">
                            <FormErrors formErrors={this.state.formErrors} />
                        </div>
                </form>             
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

export default SystemForgotPassword;

export const FormErrors = ({formErrors}) =>
  <div className='formErrors'>
    {Object.keys(formErrors).map((fieldName, i) => {
      if(formErrors[fieldName].length > 0){
        return (
          <p key={i}>{fieldName} {formErrors[fieldName]}</p>
        )        
      } else {
        return '';
      }
    })}
  </div>