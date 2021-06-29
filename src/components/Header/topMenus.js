import React, { Component } from 'react'; 
import '../../App.css'; 
import { Navbar, Nav, NavDropdown, /* NavDropdown */ } from 'react-bootstrap'; 
import 'bootstrap/dist/css/bootstrap.css';
import Modal from 'react-modal';
import Signup from '../Customer/Register/signup'
//import FacebookLoginWithButton from 'react-facebook-login';
import "./topMenus.css"
import { toast, ToastContainer } from 'react-toastify';
import HourGlass from '../Common/hourGlass';
import { Redirect } from 'react-router-dom';

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


/* const componentClicked = () => {
     "Clicked!" )
} */

/* const LoginButton = ({facebookResponse}) => {
    return (
        <div>
            <FacebookLoginWithButton
            appId="526272074800572"
            //autoLoad={true}
            fields="name,email,picture"
            scope="user_birthday,user_friends,email,public_profile"
            returnScopes={true}
            onClick={componentClicked}
            callback={facebookResponse}
            icon="fa-facebook"/>
        </div>
)} */


/* const UserScreen = ({user}) => (
<div>
  <div onClick={componentClicked}>
    <img alt="" src={user.picture.data.url} height={user.picture.height} width={user.picture.width} alt="avatar"/>
      Welcome <b>{user.name.split(' ')[0]}</b>!
  </div>
  <p>{ user.email }</p>
</div>
) */

Modal.setAppElement(document.getElementById('root'));
class TopMenus extends Component{
    /* state = {user:false}
    facebookResponse = (response) => { 
         response ); 
        this.setState( {...this.state, user: response } )
    } */

    constructor (props) {
        super (props);
        this.state = {
            modalIsOpen: false,
            user:false,
            isFetching: false, 
            fetchError: null,
            userName: null,
        };
        this.openModal = this.openModal.bind(this); 
        this.afterOpenModal = this.afterOpenModal.bind(this); 
        this.closeModal = this.closeModal.bind(this);
    }
    
    openModal() {
      this.setState({modalIsOpen: true});
    }
    
    afterOpenModal() {
      // references are now sync'd and can be accessed. 
      this.subtitle.style.color = '#f00';
    }
    
    closeModal() {
      this.setState({modalIsOpen: false});
    }
    
    componentDidMount(){
        if(this.props.token && !this.state.userName){
            this.setState({
                isFetching: true, 
                fetchError: null,
            });
            let request = {
                RegistrationToken: this.props.token
            }
            this.authenticateUser(request)
        }
    }
    
    authenticateUser(request){
        var config = require('../../Config/config.json');
        fetch(config.apiUrl + "authenticateUser", {
            method: 'POST', 
            headers: {
                Accept: 'application/json', 
                'Content-Type': 'application/json', 
                //Authorization: this.props.token
            }, 
            body: JSON.stringify(request)
        })
        .then(response => {
            if(response.status===401){
                return response;
            }
            return response.json()
        })
        .then(result => {
            //setTimeout(() => {
                if(this.state.isFetching){

                    this.setState({
                        userName: result[0].FirstName + ' ' + result[0].LastName,
                        isFetching: false, 
                        fetchError: null,
                    })
                }
                if(result.status === 401){
                    this.setState({
                        isFetching: false, 
                        fetchError: "Unauthorized",
                    });
                    // return;
                    throw new Error("Unauthorized user");
                }
            })
        .catch(e => {
            toast.error("Unable to authorize. Please login!");
            
            this.setState({
                isFetching: false, 
                fetchError: e,
            });

            
              
        });
    }

    render() {
        if (this.state.isFetching === true) {
            return <div><HourGlass /></div>;
        }

        /* if(localStorage.getItem("RegistrationToken")!==null){
            return (
             <Redirect to='/customer/home' />
           ) 
     } */
     if(this.state.fetchError){
        return (
            <Redirect to='/logout' />
        ) 
     }
        
       const loggedinUser = this.props.token; //localStorage.getItem("RegistrationToken");
        return (
            <div className="container">
                {/* <div className="row">
                <div className="col">
                <div className="userName"
                    style={loggedinUser? stylesShow:stylesHide} 
                    >Welcome {this.state.userName}
                </div>
                </div>
                </div> */}
                <div className="row">
                <div className="col">
                    <ToastContainer />
                <Modal
                        isOpen={this.state.modalIsOpen} 
                        onAfterOpen={this.afterOpenModal} 
                        onRequestClose={this.closeModal} 
                        style={customStyles} 
                        contentLabel=''
                    >
                    <h3 ref={subtitle => this.subtitle = subtitle}>
                        
                    </h3>
                        <Signup />
                </Modal>
                

                <Navbar expand="lg">
                <Navbar.Brand href="/">
                    <img alt="" src="/images/logo/logo.png"></img>
                </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto justify-content-end" style={{ width: "100%" }}>
                        {/* <Nav.Link href="#" style={loggedinUser? stylesHide:stylesShow} >
                            <div style={{ margin: "auto", textAlign: "center" }}>
                                { this.state.user ? <UserScreen user={this.state.user}/> :
                                <LoginButton facebookResponse={this.facebookResponse}/>
                                }
                            </div>
                        </Nav.Link> */}
                        <Nav.Link href="#" style={loggedinUser? stylesHide:stylesShow} onClick={this.openModal}>Iniciar sesión/Regístrate</Nav.Link>
                        <Nav.Link href="/customer/home/" style={loggedinUser? stylesShow:stylesHide}>Mi Tablero</Nav.Link>
                        <Nav.Link href="/customer/payment-methods/" style={loggedinUser? stylesShow:stylesHide}>Pagar</Nav.Link>
                        <Nav.Link href="/customer/orders/" style={loggedinUser? stylesShow:stylesHide}>Estado de Cuenta</Nav.Link>

                        
                         <NavDropdown title={this.state.userName} id="basic-nav-dropdown" style={loggedinUser? stylesShow:stylesHide} >
                            <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
                            {/* <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item> */}
                        </NavDropdown> 
                        {/* <Nav.Link title="More" id="basic-nav-dropdown">
                            Welcome {this.state.userName}
                        </Nav.Link> */}
                        {/* <Nav.Link href="/logout" style={loggedinUser? stylesShow:stylesHide} 
                        className="float-right">Logout</Nav.Link> */}
                        </Nav>
                        
                    </Navbar.Collapse>
                    </Navbar>
                </div>
                
                </div>
                
            </div>
        );
    }
}
const stylesHide={
    display: 'none'
}
const stylesShow={
   display: 'block',
   /* float: 'right',
   flex: '2',
   'flexDirection': 'row' */
}

export default TopMenus;