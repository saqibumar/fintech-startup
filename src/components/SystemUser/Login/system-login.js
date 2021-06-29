import React, { Component } from 'react'; 
import HourGlass from '../../Common/hourGlass';
import {  /* BrowserRouter as Router, */  Redirect, Link} from 'react-router-dom'
import './login.css'
// import { throws } from 'assert';
import SystemHeader from '../Header/header';

class SystemLogin extends Component{
    constructor(props, context){
        super(props, context);
        this.state = {
            email: '',
            password: '',
            formErrors: {email: '', password: ''},
            emailValid: false,
            passwordValid: false,
            formValid: false,
            isFetching: false, 
            fetchError: null, 
            SystemRegistrationToken: null,
            isLoginFailed: false,
        }
    }

    componentDidUpdate(){
        // "DidUpdate");
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
        fetch(config.apiUrl + "admin/login", {
            method: 'POST', 
            headers: {
                Accept: 'application/json', 
                'Content-Type': 'application/json', 
                //Authorization: this.props.token
            }, 
            body: JSON.stringify(request)
        })
        .then(response => response.json())
        .then(result => {
            //setTimeout(() => {
                
                if(result.error){
                    throw new Error("Unauthorized user");
                }
                var base64 = require('base-64');
                const base64Token = base64.encode(result.RegistrationToken.Id+':'+result.RegistrationToken.RegistrationToken);
                localStorage.setItem("SystemRegistrationToken", base64Token);
                localStorage.setItem("jwt", result.jwt);
                this.setState ({
                    isFetching: false,
                    fetchError: null,
                    SystemRegistrationToken: base64Token,
                    isLoginFailed: false,
                });
                //this.forceUpdate();
            //}, 3000);

        })
        .catch(e => {
            // e); 
            this.setState({
                isFetching: false, 
                fetchError: e.message,
                isLoginFailed: true,
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
    let passwordValid = this.state.passwordValid;

    switch(fieldName) {
        case 'email':
            emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            fieldValidationErrors.email = emailValid ? '' : ' es inválido';
            break;
        case 'password':
            passwordValid = value.length >= 1;
            fieldValidationErrors.password = passwordValid ? '': ' is too short';
        break;
        default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    emailValid: emailValid,
                    passwordValid: passwordValid,
                    }, this.validateForm);
    }

    validateForm() {
    this.setState({formValid: this.state.emailValid && this.state.passwordValid});
    }

    errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
    }    
    render() {
        if(localStorage.getItem("SystemRegistrationToken")!==null){
               return (
                <Redirect to='/SystemUser/home/' />
              ) 
        }
        if (this.state.isFetching === true) {
            return <div><HourGlass /></div>;
        }
        return (
            <div className="Xcontainer">
                <div id="header">
                <SystemHeader systemtoken={localStorage.getItem("SystemRegistrationToken")} />
                </div>

                <div className="row">
                <div className="col">
                    <form onSubmit={this.handleSubmit} className="signupForm">
                        <h2>Login</h2>
                        <div style={styles} hidden={!this.state.isLoginFailed}>
                            Login failed - {this.state.fetchError}
                        </div>
                        <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
                            <input 
                                required className="form-control"
                                value={this.state.email}
                                placeholder="Email" type="text" name="email" onChange={this.handleChange} />
                        </div>
                        <div className={`form-group ${this.errorClass(this.state.formErrors.password)}`}>
                            <input autoComplete="yes"
                                required className="form-control"
                                value={this.state.password}
                                placeholder="Password" type="password" name="password" onChange={this.handleChange}></input>
                        </div>
                            <button type="submit" value="Login"
                                className="btn btn-primary"
                                disabled={!this.state.formValid}>Login</button>&nbsp;
                            <Link to="/SystemUser/forgot-password" className="links">Forgot Password?</Link>

                        <div className="panel panel-default">
                            <FormErrors formErrors={this.state.formErrors} />
                        </div>
                    </form>
                </div>
                </div>
            </div>
        );
    }
}

const styles = {
    color: 'red'
}

export default SystemLogin;

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
