import React, { Component } from 'react';
import SystemHeader from '../Header/header';
import Footer from '../Footer/footer';
import './home.css';
// import InputRange from 'react-input-range';
import "react-input-range/lib/css/index.css"
import OrdersPending from '../../Orders/pending';
import {   Route, Redirect } from 'react-router-dom'

class SystemHome extends Component{
  constructor (props) {
    super (props);
    this.state = {
        asOf: new Date(),
        systemtoken: localStorage.getItem("SystemRegistrationToken"),
        value: 1000,
        days:1,
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

onChange = date => this.setState({asOf: date});

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
        <OrdersPending />
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
export default SystemHome;

