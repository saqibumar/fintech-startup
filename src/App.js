import React, {Component} from 'react';
import { BrowserRouter as Router,  Route, Redirect, Switch } from 'react-router-dom'

/* import logo from './logo.svg'; */
import './App.css';
// Pages
import Home from './components/Home/home';
import Login from './components/Customer/Login/login';
import Signup from './components/Customer/Register/signup';
import ForgotPassword from './components/Customer/ForgotPassword/forgot-password'; 
import ResetPassword from './components/Customer/ResetPassword/reset-password'; 
import ActivateAccount from './components/Customer/ActivateAccount/activate-account'; 
import './App.css';
import Header from './components/Header/header';
import Logout from './components/Customer/Login/logout';
import CustomerHome from './components/Customer/customer-home';
import Iframe from './components/Customer/Payment/Iframe';
import Payment from './components/Customer/Payment/payment';
import SystemLogin from './components/SystemUser/Login/system-login';
import SystemLogout from './components/SystemUser/Login/system-logout';
import SystemResetPassword from './components/SystemUser/ResetPassword/system-reset-password';
import SystemForgotPassword from './components/SystemUser/ForgotPassword/system-forgot-password';
import SystemHome from './components/SystemUser/Home/home';
import SystemClock from './components/SystemUser/Clock/clock';
import SystemCalculator from './components/SystemUser/Calculator/calculator';
import CustomerOrder from './components/Customer/Order/order';
import CustomerOrderStatement from './components/Customer/Order/statement';
import OrderStatement from './components/Orders/statement';
import CustomerPayment from './components/Orders/Payments/payment'
import PrivateRoute from './components/Auth/private-route';
import SystemReportPayment from './components/SystemUser/Reports/Payments/payments-report';
import PaymentMethods from './components/Customer/Payment/payment-methods';
import BankTransfer from './components/Customer/Payment/bank-transfer';
// Pages requiring authentication
//import CustomerHome from './components/Customers/home';

/* // https://tc39.github.io/ecma262/#sec-array.prototype.findindex
if (!Array.prototype.findIndex) {
  Object.defineProperty(Array.prototype, 'findIndex', {
    value: function(predicate) {
     // 1. Let O be ? ToObject(this value).
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If IsCallable(predicate) is false, throw a TypeError exception.
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      }

      // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
      var thisArg = arguments[1];

      // 5. Let k be 0.
      var k = 0;

      // 6. Repeat, while k < len
      while (k < len) {
        // a. Let Pk be ! ToString(k).
        // b. Let kValue be ? Get(O, Pk).
        // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
        // d. If testResult is true, return k.
        var kValue = o[k];
        if (predicate.call(thisArg, kValue, k, o)) {
          return k;
        }
        // e. Increase k by 1.
        k++;
      }

      // 7. Return -1.
      return -1;
    },
    configurable: true,
    writable: true
  });
} */

class App extends Component {
  hasAuth(){
    /* You will want to do more in depth validation for your authentication (e.g. token valid, not expired, etc.) */
    
    return this.props.token && this.props.token.length > 0;
  }
render() { 
  return (
    <div className="App">
      {/* <Header token={localStorage.getItem("RegistrationToken")} /> */}
      <Router>
        <Switch>
          
        <Route exact path='/' component={Home}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/logout' component={Logout}/>
        <Route path='/signup' component={Signup}/>
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <Route exact path="/reset-password/:regToken" component={ResetPassword}/>
        <Route exact path="/activate/:regToken" component={ActivateAccount}/>

        <Route exact path='/Customer/Payment/test.html' 
            component={Iframe} />

        <Route exact path='/customer/home' 
            component={CustomerHome} />
        <Route exact path='/customer/home/:displaySteps' 
            component={CustomerHome} />
        <Route exact path='/customer/payments/:orderId/:amount' 
            component={Payment} />
        <Route exact path='/customer/statement/:orderId/:sys' 
            component={CustomerOrderStatement} />
        <Route exact path='/customer/statement/:orderId' 
            component={CustomerOrderStatement} />
        <Route exact path='/customer/payments' 
            component={Payment} />
        <Route exact path='/customer/bank-transfer' 
            component={BankTransfer} />
        <Route exact path='/customer/payment-methods' 
            component={PaymentMethods} />
        <Route exact path='/customer/orders' 
          component={CustomerOrder} />
            {/* <PrivateRoute exact path='/customer/home' 
            component={CustomerHome} 
            canActivate={() => this.hasAuth()}
          /> */}

        <Route exact path='/SystemUser/login' 
            component={SystemLogin} />
        <Route exact path='/SystemUser' 
            component={SystemHome} />
        <Route exact path='/SystemUser/home' 
            component={SystemHome} />
        <Route exact path='/SystemUser/reports/payments-report' 
            component={SystemReportPayment} />
        <Route exact path='/SystemUser/clock' 
            component={SystemClock} />
        <Route exact path='/SystemUser/calculator' 
            component={SystemCalculator} />
        <Route exact path='/SystemUser/logout' component={SystemLogout}/>
        <Route exact path="/SystemUser/reset-password/:regToken" component={SystemResetPassword}/>
        <Route exact path="/SystemUser/forgot-password" component={SystemForgotPassword} />
        <Route exact path='/SystemUser/statement/:orderId/:customerId' 
            component={OrderStatement} />
        <Route exact path='/SystemUser/payments/:orderId/:customerId' 
            component={CustomerPayment} />
        <Route path="/not-found" render={() => 
          <div><Header token={localStorage.getItem("RegistrationToken")} />
          <h1>Resource can not be found</h1></div>
          }/>
        <Route render={() => (
          <Redirect to="/not-found" />
          )} >
        </Route>
        </Switch>
      </Router>
    </div>


  );
}
}

export default App;
