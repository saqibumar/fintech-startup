import React from 'react';
import Header from '../../Header/header';
import HourGlass from '../../Common/hourGlass';
import { toast, ToastContainer } from 'react-toastify';
import MuiDataTable from './mui-dt';
import './order.css';
import {Redirect} from 'react-router-dom'
import moment from 'moment';
import Moment from 'react-moment';
import {Checkbox, TextField, Card} from '@material-ui/core';
import StatementTable from './statement-table';
import Footer from '../../Footer/footer';
import LeftMenu from '../LeftMenu';
import Sidebar from '../LeftMenu/Sidebar';

class CustomerOrderStatement extends React.Component {
    
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false, 
      fetchError: null,
      RegistrationToken: localStorage.getItem("RegistrationToken"),
      didFail:false,
      data:[],
      orderId:this.props.match.params.orderId || 0,
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
            <div className="col-lg-3 col-md-12 col-sm-12">

            
            <div className="Full-Width-Menu">
            <LeftMenu token={localStorage.getItem("RegistrationToken")} />
            
            </div>
            <div className="Short-Width-Menu">
            <Sidebar token={localStorage.getItem("RegistrationToken")} />
           
            </div>
            </div>
            <div className="col-lg-9 col-md-12 col-sm-12">

            {/* <ToastContainer/> */}
            {/* <div id="header">
                  <Header token={localStorage.getItem("RegistrationToken")} />
            </div> */}
            {this.state.fetchError?
        (<div>
          <div style={{color:'red'}}>{this.state.fetchError}</div>
          <a href='/customer/orders/' className="backLink">Back to orders</a>
        </div>)
        :(
            <div id="body" style={{backgroundColor:'#FFFFFF'}}>
             <div className="row">
             <div className="col-12">
             {/* <Card style={{ height: '100%', padding:0,margin:0 }}> */}
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
              {/* </Card> */}
            </div>
            </div>
            </div>
        )}
          </div>
          </div>

<div id="footer">
  <Footer />
  </div>
        </div>
      )
  }
}

export default CustomerOrderStatement;

