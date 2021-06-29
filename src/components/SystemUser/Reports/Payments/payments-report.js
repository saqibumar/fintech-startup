import React, { Component } from 'react';
import SystemHeader from '../../Header/header';
import Footer from '../../Footer/footer';
import './payments-report.css';
// import InputRange from 'react-input-range';
import "react-input-range/lib/css/index.css"
import { Route, Redirect } from 'react-router-dom'
import Payments from './payments';
import moment from 'moment';
class SystemReportPayment extends Component{
  constructor (props) {
    super (props);
    this.state = {
        asOf: new Date(),
        systemtoken: localStorage.getItem("SystemRegistrationToken"),
        value: 1000,
        days:1,
        startDate: '',
        endDate: '',
        dateDiff:'',
        count:0,

        isFetching: false, 
      fetchError: null,
      didFail:false,
      data:[],
    };
}


calculate(amount, days) {
  let p = amount;
  let n = 1; // no. of compoundings per day (1%)
  let t = days; // no. of days
  let r = 1; //rate 1%
  // result = document.getElementById("result");
  // The equation is A = p * [[1 + (r/n)] ^ nt]
  let A = (p* Math.pow((1 + (r/(n*100))), (n*t)));
  // toFixed is used for rounding the amount with two decimal places.
  // result.innerHTML = "The total amount is " + A.toFixed(2);
  /* "The total amount is " + A.toFixed(2) + " The interest is " + (A.toFixed(2) - p).toFixed(2) */
  return (<div>
    The total amount + interest is <b>${A.toFixed(2)}</b>
    <br />
    The interest + IVA is <b>${((A.toFixed(2) - p)+(A.toFixed(2) - p)*0.16).toFixed(2)}</b>
    <br/>
    16% IVA is <b>${((A.toFixed(2) - p)*0.16).toFixed(2)}</b>
  </div>
  );

}

getPaymentReport(){
  if(this.state.startDate && this.state.endDate){
  /*  alert(this.state.holderName || document.getElementById("holderName").defaultValue);
   return; */
   this.setState({
     isFetching: true,
    })
   // const deviceSessionId = this.state.sessionId;
   var config = require('../../../../Config/config.json');
   const request = {
    StartDate:this.state.startDate,
    EndDate:this.state.endDate,
};

   fetch(config.apiUrl + "GetPaymentReport", {
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
 }


onChange = date => this.setState({asOf: date});
componentDidMount(){
  if(this.state.startDate && this.state.endDate && this.state.count===0)
  {

    this.setState({
        count: this.state.count+1,
        dateDiff: datediff(parseDate(moment(this.state.startDate).format('MM/DD/YYYY')), parseDate(moment(this.state.endDate).format('MM/DD/YYYY')))
    })
   
    ("UPDATED", this.state.dateDiff)
    this.getPaymentReport();
  }
  else{
    this.setState({
      startDate:moment().subtract(30, 'days').format('YYYY-MM-DD'),
      endDate: moment().format('YYYY-MM-DD'),
    })
  }
}
componentDidUpdate(){
    if(this.state.startDate && this.state.endDate && this.state.count===0)
    {

      this.setState({
          count: this.state.count+1,
          dateDiff: datediff(parseDate(moment(this.state.startDate).format('MM/DD/YYYY')), parseDate(moment(this.state.endDate).format('MM/DD/YYYY')))
      })
     
      ("UPDATED", this.state.dateDiff)
      this.getPaymentReport();
    }
    
}
render(){
  
  if(!this.state.systemtoken){
    return <Route render={() => (
      <Redirect to="/SystemUser/login" />
      )} >
    </Route>
  }
    return (
<div id="container">
   <div id="header">
   <SystemHeader systemtoken={localStorage.getItem("SystemRegistrationToken")} />
   </div>
   <div id="body">
   <div className="container">
   
       <div className="row">
           <div className="col-12">
               <h2>Report - Payment</h2>

{/*                let dateDifference = datediff(parseDate(moment().format('MM/DD/YYYY')), parseDate(moment(row.ApprovalDateTime).format('MM/DD/YYYY')));
 */}
    <h4>{this.state.dateDiff>=0 && this.state.startDate && this.state.endDate? 
    moment(this.state.startDate).format('MM/DD/YYYY') + ' - ' +
    moment(this.state.startDate).format('MM/DD/YYYY') + ' (' +
    datediff(parseDate(moment(this.state.startDate).format('MM/DD/YYYY')), parseDate(moment(this.state.endDate).format('MM/DD/YYYY'))) + ') day(s)'
    :''}</h4>
               <hr/>
           </div>
           
           <div className="col-6" style={{textAlign:'left'}}>
               <label>Start Date {this.state.startDate}
                <input type="date" defaultValue={this.state.startDate} 
                onChange={(e)=>{
                    this.setState({
                        startDate: e.target.value,
                        count:0,
                    })
                    this.getPaymentReport();
                }}
                    />
                </label>
           </div>
           <div className="col-6" style={{textAlign:'left'}}>
           <label>End Date {this.state.endDate}
            <input type="date" defaultValue={this.state.endDate} 
            onChange={(e)=>{
                this.setState({
                    endDate: e.target.value,
                    count:0,
                })
                this.getPaymentReport();
            }} />
            </label>
           </div>
           </div>

       </div>
       {this.state.dateDiff<0?
       <div><h6>End date must be greater than the start date</h6></div>
           :
        <div style={this.state.dateDiff>=0 && this.state.startDate && this.state.endDate? {display:'block'}:{display:'none'}}>
        <Payments data={this.state.data?this.state.data:[]} xlsFilename={`${moment(this.state.startDate).format('MM/DD/YYY')} To ${moment(this.state.endDate).format('MM/DD/YYY')}`} />
        </div>
       }
        
  </div>
  <div id="footer">
   <Footer />
   </div>
</div>

  );
  }

}
/* const styles = {
  width: '100%',
  height: '500px'
} */
export default SystemReportPayment;

function parseDate(str) {
    var mdy = str.split('/');
    return new Date(mdy[2], mdy[0]-1, mdy[1]);
}

function datediff(first, second) {
    // Take the difference between the dates and divide by milliseconds per day.
    // Round to nearest whole number to deal with DST.
    return Math.round((second-first)/(1000*60*60*24));
}