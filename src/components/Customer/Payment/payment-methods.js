import React from 'react';
import Header from '../../Header/header';
import HourGlass from '../../Common/hourGlass';
import uuidv4 from 'uuid/v4';
import sprintfJs from 'sprintf-js';
//import { deviceDetect } from 'react-device-detect';
// import Iframe from './Iframe.js';
// import $ from "jquery";
import OPay from "./opay";
import OPayData from "./opay-data";
import "./payment.css";
import { toast, ToastContainer } from 'react-toastify';
import {Redirect} from 'react-router-dom'
import { Link } from '@material-ui/core';
import moment from 'moment';
import Footer from '../../Footer/footer';
import LeftMenu from '../LeftMenu';
import Sidebar from '../LeftMenu/Sidebar';
import {Card} from '@material-ui/core';
import Payment from './payment';

//const vsprintf = sprintfJs.vsprintf;
// let sessionId = uuidv4();
// sessionId = sessionId.toUpperCase().replace(/-/g, '');

class PaymentMethods extends React.Component {
    
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false, 
      fetchError: null,
    }
    // this.onChange = this.onChange.bind(this);
  }

  render(){
    if(this.state.RegistrationToken === null){
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
            <div className="Full-Width-Menu">
            <LeftMenu token={localStorage.getItem("RegistrationToken")} />
            </div>
            <div className="Short-Width-Menu">
            {/* <NavigationBar/> */}
            <Sidebar token={localStorage.getItem("RegistrationToken")} />
           
            </div>
            {/* <div className="row"> */}
          <div className="col-lg-8 col-md-11 col-sm-11">
          <div id="body" style={{backgroundColor:'#FFFFFF'}}>
            <h1>Metodos de pago</h1>
            <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-6">
            <Card style={{cursor:'pointer'}} onClick={()=>{
              window.location.href="/customer/payments"
            }}>
              <img alt="" src="/images/openpay_tarjeta/cards1.png" /* style={{width:'100%'}} */ />
              <h5>
              Tarjeta de credito o debito
              </h5>
              <br/>
              <h6>Costo</h6> 2.9% + $2.5 MXN
            </Card>
            </div>
            
            <div className="col-lg-6 col-md-6 col-sm-6">
            <Card style={{cursor:'pointer'}} onClick={()=>{
              window.location.href="/customer/bank-transfer"
            }}>
            <img alt="" src="/images/openpay_tarjeta/cards2.png" style={{width:'100%'}} />
              <h5>
              Transferencia bancario
              </h5>
            </Card>
            </div>
            </div>

          </div>
          </div>

          </div>
          </div>
      )
  }

  

  
}


export default PaymentMethods;