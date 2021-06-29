import React, { Component } from 'react'; 
import HourGlass from '../../Common/hourGlass';
import {  /* BrowserRouter as Router, */  Redirect, Link} from 'react-router-dom'
import './login.css'
import { toast } from 'react-toastify';
// import { throws } from 'assert';
import Modal from 'react-modal';
import ForgotPassword from '../ForgotPassword/forgot-password';
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate( -50%, -50%)',
        /* width: '60vw',
        height: '70vh' */
    }
  };


//   Modal.setAppElement(document.getElementById('root'));
  class Login extends Component{
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
            RegistrationToken: null,
            isLoginFailed: false,

            modalIsOpen: false,
        }
        this.openModal = this.openModal.bind(this); 
        this.afterOpenModal = this.afterOpenModal.bind(this); 
        this.closeModal = this.closeModal.bind(this);

    }


    openModal() {
        /* setTimeout(() => {
            this.setState({modalIsOpen: false});
        }, 2000); */
        this.setState({modalIsOpen: true});
      }
      
      afterOpenModal() {
        // references are now sync'd and can be accessed. 
        this.subtitle.style.color = '#f00';
      }
      
      closeModal() {
        this.setState({modalIsOpen: false});
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
        fetch(config.apiUrl + "login", {
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
                
                // "result = ", result);
                if(result.error){
                    throw new Error("Unauthorized user");
                }
                var base64 = require('base-64');
                const base64Token = base64.encode(result.RegistrationToken.Id+':'+result.RegistrationToken.RegistrationToken);
                localStorage.setItem("RegistrationToken", base64Token);
                localStorage.setItem("jwt", result.jwt);
                this.setState ({
                    isFetching: false,
                    fetchError: null,
                    RegistrationToken: base64Token,
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
            toast.warn("Unauthorized user");
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
        if(localStorage.getItem("RegistrationToken")!==null){
               return (
                <Redirect to='/customer/home' />
              ) 
        }
        if (this.state.isFetching === true) {
            return <div><HourGlass /></div>;
        }
        return (
            <div className="container">
                <div className="row">
                <div className="col">
                <Modal
                        isOpen={this.state.modalIsOpen} 
                        onAfterOpen={this.afterOpenModal} 
                        onRequestClose={this.closeModal} 
                        style={customStyles} 
                        contentLabel=''
                    >
                    <h3 ref={subtitle => this.subtitle = subtitle}>
                        
                    </h3>
                        <ForgotPassword />
                </Modal>
                    <form onSubmit={this.handleSubmit} className="signupForm">
                        <h4>Iniciar sesión</h4>
                        <div style={styles} hidden={!this.state.isLoginFailed}>
                            Error en iniciar sesión - {this.state.fetchError}
                        </div>
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
                            <button type="submit" value="Iniciar sesión"
                                className="btn-normal" disabled={!this.state.formValid}
                                ><span>Iniciar sesión</span></button>&nbsp;
                            <Link onClick={()=>{
                                this.openModal()
                            }} 
                            /* to="/forgot-password"  */
                            to="#"
                            className="links">¿Has olvidado tu contraseña?</Link>

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

export default Login;

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
