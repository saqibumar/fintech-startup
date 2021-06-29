import React from 'react';
import Header from '../../Header/header';
import HourGlass from '../../Common/hourGlass';
import { toast, ToastContainer } from 'react-toastify';
import MuiDataTable from './mui-dt';
import './order.css';
import {Redirect} from 'react-router-dom'
import Payment from '../Payment/payment';
import Footer from '../../Footer/footer';
import LeftMenu from '../LeftMenu';
import Sidebar from '../LeftMenu/Sidebar';
//const vsprintf = sprintfJs.vsprintf;
// let sessionId = uuidv4();
// sessionId = sessionId.toUpperCase().replace(/-/g, '');

class CustomerOrder extends React.Component {
    
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false, 
      fetchError: null,
      RegistrationToken: localStorage.getItem("RegistrationToken"),
      didFail:false,
      data:[],
    }
  }
  getOrdersByCustomer(){
    
   /*  alert(this.state.holderName || document.getElementById("holderName").defaultValue);
    return; */
    this.setState({
      isFetching: true,
  })
    // const deviceSessionId = this.state.sessionId;
    var config = require('../../../Config/config.json');
    const request = {
      RegistrationToken: this.state.RegistrationToken,
    };

    fetch(config.apiUrl + "orders/getOrdersByCustomer", {
      method: 'POST', 
      headers: {
          'Content-Type': 'application/json', 
      }, 
      body: JSON.stringify(request)
  })
  .then(response => response.json())
  .then(result => {
    if(result.error){
        throw new Error(result.error.message);
    }
    this.setState ({
        isFetching: false, 
        fetchError: null,   
        data: result.recordset,

    });
  })
  .catch(e => {
      this.setState({
          isFetching: false, 
          fetchError: e.message,
      });
  });
  }

  componentDidMount(){
    this.getOrdersByCustomer();
  }

  render(){
    if(this.state.RegistrationToken===null){
        return(
            <Redirect to='/' />
        );
      }
    if (this.state.isFetching === true) {
      return <div><HourGlass /></div>;
    }
      return(
          <div id="container" >
            <div className="row">
            <div className="Full-Width-Menu col-lg-3 col-md-1 col-sm-1">
            <LeftMenu token={localStorage.getItem("RegistrationToken")} />
            </div>
            <div className="Short-Width-Menu">
            {/* <NavigationBar/> */}
            <Sidebar token={localStorage.getItem("RegistrationToken")} />
           
            </div>
            <div className="col-lg-9 col-md-11 col-sm-11">

            {/* <ToastContainer/> */}
            {/* <div id="header">
                  <Header token={localStorage.getItem("RegistrationToken")} />
            </div> */}
            <div id="body" style={{backgroundColor:'#FFFFFF'}}>

            <div className="container">
             <div className="row">
             <div className="col-12">
              {/* <h2>Your Loan Orders</h2> */}
              <div style={{color:'red'}} hidden={!this.state.didFail}>
                  Operation failed - {this.state.fetchError+''}
              </div>
              <MuiDataTable data={this.state.data?this.state.data:[]} />
            </div>
            </div>
            </div>
            </div>
          </div>
          </div>
            <div id="footer">
  <Footer />
  </div>
          </div>
      )
  }
}



export default CustomerOrder;