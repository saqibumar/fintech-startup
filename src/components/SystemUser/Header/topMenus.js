import React, { Component } from 'react'; 
import '../../../App.css'; 
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'; 
import 'bootstrap/dist/css/bootstrap.css';
import "./topMenus.css"
import { toast, ToastContainer } from 'react-toastify';
import { Redirect } from 'react-router-dom';
import HourGlass from '../../Common/hourGlass';

/* const customStyles = {
  content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate( -50%, -50%)',
      
  }
}; */

class SystemTopMenus extends Component{
    
    constructor (props) {
        super (props);
        this.state = {
            user:false,
            isFetching: false, 
            fetchError: null,
            userName: null,
        };
    }

    componentDidMount(){
        if(this.props.systemtoken && !this.state.userName){
            this.setState({
                isFetching: true, 
                fetchError: null,
            });
            let request = {
                RegistrationToken: this.props.systemtoken
            }
            this.authenticateUser(request)
        }
    }
    
    authenticateUser(request){
        var config = require('../../../Config/config.json');
        fetch(config.apiUrl + "admin/authenticateUser", {
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
                if(this.state.isFetching){
                    if(result[0]){
                        this.setState({
                            userName: result[0].FirstName + ' ' + result[0].LastName,
                            isFetching: false, 
                            fetchError: null,
                        })
                    }
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
        if(this.state.fetchError && !this.state.isFetching){
            return (
                <Redirect to='/SystemUser/logout' />
            ) 
         }
         
       const loggedinUser = this.props.systemtoken; //localStorage.getItem("RegistrationToken");
        return (
            <div className="container">
                <div className="row">
                <div className="col">
                {/* <div className="userName"
                    style={loggedinUser? stylesShow:stylesHide} 
                    >Welcome {this.state.userName}</div> */}
                <ToastContainer />
                <Navbar expand="lg" style={{padding:'30px'}}>
                <Navbar.Brand href="/">SrPreston</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto justify-content-end" style={{ width: "100%" }}>
                        
                        <Nav.Link href="/SystemUser/login/" style={loggedinUser? stylesHide:stylesShow} >Login/Signup</Nav.Link>
                        <Nav.Link href="/SystemUser/home/" style={loggedinUser? stylesShow:stylesHide}>Dashboard</Nav.Link>
                        {/* <Nav.Link href="/SystemUser/reports/payments/" style={loggedinUser? stylesShow:stylesHide}>Reports</Nav.Link> */}
                        <NavDropdown title="Reports" id="basic-nav-dropdown" style={loggedinUser? stylesShow:stylesHide} >
                            <NavDropdown.Item href="/SystemUser/reports/payments-report/">Payments</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="/SystemUser/calculator/" style={loggedinUser? stylesShow:stylesHide}>Calculator</Nav.Link>

                        <NavDropdown title={this.state.userName} id="basic-nav-dropdown" style={loggedinUser? stylesShow:stylesHide} >
                            <NavDropdown.Item href="/SystemUser/logout">Logout</NavDropdown.Item>
                        </NavDropdown>
                        
                        {/* <Nav.Link href="/SystemUser/logout" style={loggedinUser? stylesShow:stylesHide} className="float-right">Logout</Nav.Link>*/}
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

export default SystemTopMenus;