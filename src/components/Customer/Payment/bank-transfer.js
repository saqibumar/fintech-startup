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
import PaymentMethods from './payment-methods';

//const vsprintf = sprintfJs.vsprintf;
// let sessionId = uuidv4();
// sessionId = sessionId.toUpperCase().replace(/-/g, '');

class BankTransfer extends React.Component {
    
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false, 
      fetchError: null,
      sessionId: undefined,
      iframeSrc: '/Customer/Payment/test.html',
      RegistrationToken: localStorage.getItem("RegistrationToken"),
      cardToken:undefined,

      holderName:'',
      cardNumber: '',
      expirationYear: '',
      expirationMonth: '',
      cvv2:'',

      amount:this.props.match.params.amount || 0,
      orderId:this.props.match.params.orderId || 0,

      form:{},

      didFail:false,
      order_data:null,
      data:null,

    }
    this.onChange = this.onChange.bind(this);
  }
  
  makePayment(orderId){
    
    this.setState({
      isFetching: true,
  })
    // const deviceSessionId = this.state.sessionId;
    var config = require('../../../Config/config.json');
    const request = {
      RegistrationToken: this.state.RegistrationToken,
      amount: this.state.amount,
      orderId,
      description: 'Bank transfer - customer to merchant',
  };

  
    fetch(config.apiUrl + "openpay/chargeCustomerBankAccount", {
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
      if(result.error_code === 2004){
        throw new Error(result.description);
      }
      this.setState ({
          isFetching: false, 
          fetchError: null, 
      });
      setTimeout(() => {      
        toast.success("Thank you. Payment has been processed.");
      }, 200);
    })
    .catch(e => {
        this.setState({
            isFetching: false, 
            fetchError: e.message,
        });
    });
  }

  onChange(e) {
    const name = e.target.name;
    const value = e.target.value;
      this.setState({
        name: value,
        cardNumber: value,
      }
      /* ,
          () => { this.validateField(name, value) } */);
    
  }

  getCustomerOrder(){
    
    /*  alert(this.state.holderName || document.getElementById("holderName").defaultValue);
     return; */
     this.setState({
       isFetching: true,
   })
     // const deviceSessionId = this.state.sessionId;
     var config = require('../../../Config/config.json');
     const request = {
       RegistrationToken: this.state.RegistrationToken,
       OrderId: this.state.orderId
   };
 
   
     fetch(config.apiUrl + "orders/getCustomerOrder", {
       method: 'POST', 
       headers: {
           'Content-Type': 'application/json', 
       }, 
       body: JSON.stringify(request)
   })
   .then(response => response.json())
   .then(result => {
     if(result.error || result.recordset.length<=0){
         throw new Error("Order not found");
     }
     this.setState ({
         isFetching: false, 
         fetchError: null,   
         data: result.recordset[0],
 
     });
   })
   .catch(e => {
       this.setState({
           isFetching: false, 
           fetchError: e.message,
       });
       toast.warn(this.state.fetchError)
   });
   }

  componentDidMount(){
    this.getOrdersByCustomer();
    if(this.state.orderId>0){
      this.getCustomerOrder();
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
         order_data: result.recordset, 
     });
     

   })
   .catch(e => {
       this.setState({
           isFetching: false, 
           fetchError: e.message,
       });
   });
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
            <Sidebar token={localStorage.getItem("RegistrationToken")} />
           
            </div>
          <div className="col-lg-7 col-md-11 col-sm-11">

            <ToastContainer/>
            <div id="body" style={{backgroundColor:'#FFFFFF'}}>
           
             
        {this.state.fetchError?
        (<div>
          <div style={{color:'red'}}>{this.state.fetchError}</div>
          <a href='/customer/bank-transfer/' className="backLink">Atras</a>
        </div>)
        :(
            <div className="container">
              
             <div className="row">
             <div className="col Xreset-box">
            <div className="content table" /* style={{maxWidth:'800px'}} */>
              {/* <h2>Card Information</h2> */}
              <div style={{color:'red'}} hidden={!this.state.didFail}>
                  Operation failed - {this.state.fetchError+''}
              </div>
                  <form id="processCard">
                  
                  <div className="tableRow">
                      <div className="tableCell">
                        <p>Orden de prestamo:</p>
                        {this.state.data?this.state.data.OrderId + " - $" + this.state.amount/* this.state.data.OrderAmount */:
                        (<select ref="orderId" onChange={(e)=>{
                          this.setState({
                            orderId: e.target.value
                          })                          
                        }}>
                          {this.state.order_data&&this.state.order_data.map((item,index)=>{
                            // "item = ",item)
                          let dateDifference = datediff(parseDate(moment().format('MM/DD/YYYY')), parseDate(moment(item.ApprovalDateTime).format('MM/DD/YYYY')));
                          // dateDifference)
                            //this.createTableWithFee(this.state.numberOfDays)
                            if(dateDifference<0 && item.CurrentOutstandingBalance>0){
                              
                            return <option key={item.OrderId+index} value={item.OrderId}>{item.OrderId} - ${item.CurrentOutstandingBalance}</option>
                            }
                          })}
                          
                        </select>)
                        }
                      </div>
                    </div>

                  <div className="tableRow">
                      <div className="tableCell">
                        <p>Monto:</p>
                        <input type="text" data-openpay-card="amount" className="inputText disableOnSubmit" id="amount" size="50" name="amount"
                          defaultValue={this.state.amount || "0"} onChange={(e)=>{
                            this.setState({
                              amount:e.target.value
                            })
                          }} />
                      </div>
                    </div>
                </form>
                  <hr/>
                  <div className="table">
                    <div className="tableRow">
                      <div className="tableCell">
                      Transacciones realizadas vía:
                      <img alt="" src="/images/openpay_tarjeta/openpay.png" />
                        
                      </div>
                      <div className="tableCell">
                      <img alt="" src="/images/openpay_tarjeta/security.png" />
                      <span className="pull-right">
                      Tus pagos se realizan de forma segura <br/>con encriptación de 256 bits
                      </span>
                      </div>
                      
                    </div>
                  </div>

                  <div className="table">
                    <div className="tableRow">
                      <div className="tableCell">
                        <button className="btn-normal disableOnSubmit" id="makeRequestCard" style={{width:'100%'}} 
                        onClick={()=>{
                          this.makePayment(this.state.orderId?this.state.orderId: this.refs.orderId.value);
                        }}>
                          <span>Pagar</span>
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
            
            {/* <hr/>
              <iframe src="/test.html" width="0" height="0" style={{display:'none'}} id="iframeId"></iframe>
 
              <button onClick={()=>{
                this.getSessoinId();
              }}>generate device session</button>

            <div className="table" style={{display:'none'}}>
              <div className="tableRow">
                <div className="tableCell">
                  <p>Mode:</p>
                  <select id="mode" className="inputSelect disableOnSubmit">
                    <option defaultValue="true">Sandbox</option>
                    <option defaultValue="false">Production</option>
                  </select>
                </div>
              </div>
              <div className="tableRow">
                <div className="tableCell">
                  <p>Merchant ID:</p>
                  <input type="text" className="inputText disableOnSubmit" id="id" defaultValue="mtrgpaj7xbtr9cay4nk1" size="50" />
                </div>
                <div className="tableCell">
                  <p>Request API Key:</p>
                  <input type="text" className="inputText disableOnSubmit" id="apiKey" defaultValue="pk_04db228e11544f3fb4d61d5d2bb98042" size="50" />
                </div>
              </div>
            </div>

            <div className="table">
            <form id="openpayForm">
            <fieldset>
              <legend>SessionId</legend>
                <div className="tableRow">
                <div className="tableCell">
                  <p>Generated Session Id: <span id="deviceId">{this.state.sessionId}</span></p>
                </div>
              </div>
              <div className="tableRow">
                <div className="tableCell">
                  <p>Hidden value:</p>
                  <input type="text" className="inputText disableOnSubmit" id="deviceSessionId" size="50"
                    defaultValue={this.state.sessionId}/>
                </div>
              </div>
            </fieldset>
            </form>
            </div>
             */}
            </div>
            </div>
            </div>
        )}
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


function parseDate(str) {
  var mdy = str.split('/');
  return new Date(mdy[2], mdy[0]-1, mdy[1]);
}

function datediff(first, second) {
  // Take the difference between the dates and divide by milliseconds per day.
  // Round to nearest whole number to deal with DST.
  return Math.round((second-first)/(1000*60*60*24));
}

export default BankTransfer;