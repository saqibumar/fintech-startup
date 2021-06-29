import React, {Component} from 'react';
import Header from '../../Header/header';
import HourGlass from '../../Common/hourGlass';
import './reset-password.css'

// const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

class SystemResetPassword extends Component {
  constructor(props){
    super(props);
    this.state = {
        newPassword: '',
        confirmPassword: '',
        formErrors: {newPassword: '', confirmPassword: ''},
        newPasswordValid: false,
        confirmPasswordValid: false,
        formValid: false,
        isFetching: false, 
        fetchError: null,
        isEmailSent: false,
        emailTo: null,
        RegistrationToken: null,
        didPasswordReset:false,
    }
  }

  componentDidUpdate(){
}

handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
        newPassword: this.state.newPassword,
        confirmPassword: this.state.confirmPassword,
        isFetching: true,
    })
// "this.props.match.params.Token",  this.props.match.params);
let params = this.props.match.params;

    const request = {
        newPassword: this.state.newPassword,
        confirmPassword: this.state.confirmPassword,
        registrationToken: params.regToken
    };
    //TODO: store api URL in a config file
    var config = require('../../../Config/config.json');
    fetch(config.apiUrl + "resetPassword", {
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
                isEmailSent: result.isEmailSent,
                emailTo: result.CustomerData.Email,
                didPasswordReset: true
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
handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({[name]: value},
        () => { this.validateField(name, value) });
}

validateField(fieldName, value) {
let fieldValidationErrors = this.state.formErrors;
let newPasswordValid = this.state.newPasswordValid;
let confirmPasswordValid = this.state.confirmPasswordValid;
switch(fieldName) {
    case 'newPassword':
        newPasswordValid = true; //value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.newPassword = newPasswordValid ? '' : ' es inválido';
        break;
    case 'confirmPassword':
        confirmPasswordValid = true; //value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.confirmPassword = confirmPasswordValid ? '' : ' es inválido';
        fieldValidationErrors.confirmPassword = (this.state.newPassword === this.state.confirmPassword) ? '' : ' mismatch';
        break;
    default:
    break;
}
    this.setState({formErrors: fieldValidationErrors,
        newPasswordValid: newPasswordValid,
        confirmPasswordValid: confirmPasswordValid,
    }, this.validateForm);
}

validateForm() {
this.setState(
    {
        formValid: this.state.newPasswordValid && this.state.confirmPasswordValid 
                    && (this.state.newPassword === this.state.confirmPassword)
    });
}

errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
}    

  render() {
    if (this.state.isFetching === true) {
        return <div><HourGlass /></div>;
    }

     return (
         <div className="xcontainerSAQ">
             <Header token={localStorage.getItem("RegistrationToken")} />
             <div className="row bgBar">
             <div className="col">
                 Choose new password and confirm              
             </div>
             </div>
             <div className="container">
             <div className="row">
             <div className="col reset-box">
                <h2>Reset your password</h2>   
                <form onSubmit={this.handleSubmit} className="resetPasswordForm">
                    <div style={styles.failure} hidden={!this.state.fetchError}>
                    <img src='/images/failure.png' style={{width:'30px'}} alt="failure" />
                    {this.state.fetchError}
                    </div>
                    <div style={styles.success} hidden={!this.state.didPasswordReset}>
                       <img src='/images/success.png' style={{width:'30px'}} alt="success" />
                        Password has been reset.
                    </div>

                    <div className={`form-group ${this.errorClass(this.state.formErrors.newPassword)}`}>
                        <input 
                            required className="form-control"
                            value={this.state.newPassword}
                            placeholder="New password" type="password" name="newPassword" onChange={this.handleChange} />
                    </div>
                    <div className={`form-group ${this.errorClass(this.state.formErrors.confirmPassword)}`}>
                        <input 
                            required className="form-control"
                            value={this.state.confirmPassword}
                            placeholder="Confirm password" type="password" name="confirmPassword" onChange={this.handleChange} />
                    </div>
                        
                            <button type="submit" value="Reset"
                                className="btn btn-primary"
                                disabled={!this.state.formValid}>Reset</button>&nbsp;

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

export default SystemResetPassword;

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