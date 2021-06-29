import React from 'react';
// import Header from '../../Header/header';
import HourGlass from '../Common/hourGlass';
import { toast, ToastContainer } from 'react-toastify';
import MuiDataTable from './mui-dt';
// import './order.css';
import {Redirect} from 'react-router-dom'
import moment from 'moment';
import Moment from 'react-moment';
import {Checkbox, TextField, Card} from '@material-ui/core';
import StatementTable from './statement-table';
import SystemHeader from '../SystemUser/Header/header';

class OrderStatement extends React.Component {
    
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false, 
      fetchError: null,
      SystemRegistrationToken: localStorage.getItem("SystemRegistrationToken"),
      didFail:false,
      data:[],
      orderId:this.props.match.params.orderId || 0,
      CustomerId:this.props.match.params.customerId || 0,
    }
  }
  

  componentDidMount(){
    if(this.state.orderId>0){
        this.getCustomerOrder();
      }
  }

  getCustomerOrder(){
    
    /*  alert(this.state.holderName || document.getElementById("holderName").defaultValue);
     return; */
     this.setState({
       isFetching: true,
   })
     // const deviceSessionId = this.state.sessionId;
     var config = require('../../Config/config.json');
     const request = {
       SystemRegistrationToken: this.state.SystemRegistrationToken,
       OrderId: this.state.orderId,
       CustomerId: this.state.CustomerId,
       isAdmin: true,
   };
 

   fetch(config.apiUrl + "orders/getCustomerOrderForSysUser", {
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
         data: result.recordset,
 
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

  render(){
    if(this.state.SystemRegistrationToken===null){
        return(
            <Redirect to='/' />
        );
      }
    if (this.state.isFetching === true) {
      return <div><HourGlass /></div>;
    }
      return(
          <div className="xcontainer" >
            {/* <ToastContainer/> */}
            <div id="header">
                <SystemHeader systemtoken={localStorage.getItem("SystemRegistrationToken")} />
                </div>
            {this.state.fetchError?
        (<div>
          <div style={{color:'red'}}>{this.state.fetchError}</div>
          <a href='/customer/orders/' className="backLink">Back to orders</a>
        </div>)
        :(
            <div className="xcontainer">
             <div className="row">
             <div className="col-12">
             <Card style={{ height: '100%' }}>
              {this.state.data.map((item,index) => {
              return (
                <div className="row" key={'row_'+item.OrderId}>
                <div className="col-12" key={'col_'+item.OrderId}>
                 
                  <div>
                    <StatementTable item={item} sys={this.props.match.params.sys}/>
                  </div>
                </div>
                </div>
              )
              })
            }
              </Card>
            </div>
            </div>
            </div>
        )}
        </div>
      )
  }
}

export default OrderStatement;

