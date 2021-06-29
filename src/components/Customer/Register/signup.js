import React, { Component } from 'react'; 
import './signup.css';
import HourGlass from '../../Common/hourGlass';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Login from '../Login/login';
import {  /* BrowserRouter as Router,  Route,  Link,  Switch, */  Redirect} from 'react-router-dom'
// import Header from '../../Header/header';


class Signup extends Component { 
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            password2: '',
            formErrors: {email: '', password: '', password2: ''},
            emailValid: false,
            passwordValid: false,
            password2Valid: false,
            passwordsMatch: false,
            formValid: false,
            isFetching: false, 
            fetchError: null, 
            isEmailSent: false,
            emailTo: null
        }
        //this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2,
            isFetching: true,
        })

        const request = {
            customerData: {
                Email: this.state.email,
                Password: this.state.password,
            }
        };


        var config = require('../../../Config/config.json');
        fetch(config.apiUrl + "register", {
        //fetch("http://localhost:1337/", {
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
            this.setState ({
                isFetching: false,
                fetchError: null ,
                isEmailSent: result.isEmailSent,
                emailTo: result.to
            });
        })
        .catch(e => {
            this.setState({
                isFetching: false, 
                fetchError: e
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
    let password2Valid = this.state.password2Valid;
    let passwordsMatch = this.state.passwordsMatch;

    switch(fieldName) {
        case 'email':
            emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            fieldValidationErrors.email = emailValid ? '' : ' es inválido';
            break;
        case 'password':
            passwordValid = value.length >= 4;
            fieldValidationErrors.password = passwordValid ? '': ' es demasiado corto';
        break;
        case 'password2':
            password2Valid = value.length >= 4;
            fieldValidationErrors.password2 = password2Valid ? '': ' es demasiado corto';
            passwordsMatch = (this.state.password===this.state.password2)
            fieldValidationErrors.password2 = passwordsMatch ? '' : "No coincide"
        break;
        default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    emailValid: emailValid,
                    passwordValid: passwordValid,
                    password2Valid: password2Valid,
                    passwordsMatch: passwordsMatch
                    }, this.validateForm);
    }

    validateForm() {
    this.setState({formValid: this.state.emailValid && this.state.passwordValid && this.state.password2Valid && this.state.passwordsMatch});
    }

    errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
    }

    
    redirectToTarget = () => {
        this.props.history.push(`/target`)
    }

      render() {
        /* const responseFacebook = (response) => {
            "fb response",response);
          }
      
          const responseGoogle = (response) => {
            response);
          } */
        //this.state.isFetching === true)
        
        if(localStorage.getItem("RegistrationToken")!==null){
            // this.history.pushState(null, '/');
            // this.location.href = "/"
            this.redirectToTarget();
              return (                 
                <Redirect to='/' />
              ) 
    
        }
        if (this.state.isFetching === true) {
            return <div><HourGlass /></div>;
        }
        return (
            <div className="container">
                <div className="row">
                <div className="col text-center">
                    <img alt="" src="/images/logo/logo.png" />
                </div>
                </div>
            <div className="row">
            <div className="col">
            
            {/* <Header token={localStorage.getItem("RegistrationToken")} /> */}
            <Tabs defaultActiveKey={this.state.isEmailSent?"register":"login"} id="uncontrolled-tab-example"  className="signupForm">
            <Tab eventKey="login" title="Iniciar sesión">
                <Login />
            </Tab>
            <Tab eventKey="register" title="Regístrate">
                <form onSubmit={this.handleSubmit} className="signupForm">
                <div style={styles.failure} hidden={!this.state.fetchError}>
                    <img src='/images/failure.png' style={{width:'30px'}} alt="failure" />
                    {this.state.fetchError}
                    </div>
                    <div style={styles.success} hidden={!this.state.isEmailSent}>
                       <img src='/images/success.png' style={{width:'30px'}} alt="success" />
                       Correo electrónico enviado a {this.state.emailTo} <br />
                       Por favor revise su correo electrónico para activar tu cuenta
                    </div>
                <h4>Regístrate</h4>
                <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
                    <input 
                        required className="form-control"
                        value={this.state.email}
                        placeholder="Correo electrónico" type="text" name="email" onChange={this.handleChange} />
                </div>
                <div className={`form-group ${this.errorClass(this.state.formErrors.password)}`}>
                    <input autoComplete="yes"
                        required className="form-control"
                        value={this.state.password}
                        placeholder="Contraseña" type="password" name="password" onChange={this.handleChange}></input>
                </div>
                <div className={`form-group ${this.errorClass(this.state.formErrors.password2)}`}>
                    <input autoComplete="yes"
                        required className="form-control" 
                        value={this.state.password2}
                        placeholder="Confirma tu contraseña" type="password" name="password2" onChange={this.handleChange}></input>
                </div>
                    <button type="submit" value="Regístrar" style={{width: '100%'}}
                        className="btn-normal"
                        disabled={!this.state.formValid}><span>Regístrar</span></button>
                <div className="panel panel-default">
                <FormErrors formErrors={this.state.formErrors} />
                </div>
            </form>
            </Tab>
            </Tabs>
            </div>
            </div>



            </div>
        );

    }
}

const styles = {
    color: 'red'
}


export default Signup;


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
