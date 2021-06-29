
import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'
import Header from '../Header/header';
import Footer from '../Footer/footer';
import HourGlass from '../Common/hourGlass';
import InputRange from 'react-input-range';
import "react-input-range/lib/css/index.css";
//import MainSteps from "./Register/Steps/index";
import Main from "./Register/LoanSteps/Main";
import FileUpload from './FileUpload/FileUpload';
import CustomerCamera from './FileUpload/Camera/camera';
import LeftMenu from './LeftMenu';
import {Card} from '@material-ui/core';
import { NavigationBar } from './LeftMenu/NavigationBar';
import Sidebar from './LeftMenu/Sidebar';
import './customer-home.css'
import { Navbar } from 'react-bootstrap';
/* import '../Home/home.css'; */
// import Notifications from '../Notifications'

class CustomerHome extends Component {
  constructor (props) {
    super (props);
    this.state = {
        isFetching: false, 
        fetchError: null,
        token: localStorage.getItem("RegistrationToken"),
        asOf: new Date(),
        value: 1000,
        days:1,
        displaySteps:  false,
        totalAmountwithIva:0,
    };
}

  componentDidMount(){
    this.setState({
      displaySteps:this.props.match.params.displaySteps?true: false,
    })
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
  // let netTotal = (A+((A - p)*0.16)).toFixed(2);
  //netTotal = (A.toFixed(2))+((A.toFixed(2) - p)*0.16).toFixed(2);
// this.state.totalAmountwithIva = netTotal;
/* this.setState({
  totalAmountwithIva: netTotal
}) */
  return (<div>
    The total amount + interest is <b>${A.toFixed(2)}</b>
    {/* <br />
    The interest + IVA is <b>${((A.toFixed(2) - p)+(A.toFixed(2) - p)*0.16).toFixed(2)}</b>
    <br/>
    16% IVA is ${((A.toFixed(2) - p)*0.16).toFixed(2)} */}
  </div>
  );

}


  render() {
    if(this.state.token===null){
      return(
          <Redirect to='/' />
      );
    }
    if(this.state.isFetching) {
      return <HourGlass />;
    }
    return (
      <div id="container">
        <div className="row">
          
            <div className="Full-Width-Menu">
            <LeftMenu token={localStorage.getItem("RegistrationToken")} />
            </div>
            <div className="Short-Width-Menu">
            {/* <NavigationBar/> */}
            <Sidebar token={localStorage.getItem("RegistrationToken")} />
           
            </div>
          
          <div className="col-lg-9 col-md-11 col-sm-11">
            {/* <div id="header">
        <Header token={localStorage.getItem("RegistrationToken")} />
        </div> */}

        <div id="body">
          <div className="row">
            <div className="col-12 bg-customer" >
            <div className="calc-main">
              <div className="Xblur"></div>
              <div className="container calculator-container" 
              style={this.state.displaySteps?{maxWidth:'100%'}:{maxWidth:'400px'}}>
              <span>
                <div style={this.state.displaySteps?{display:'none'}:{display:''}}>
                <div className="row" style={{'padding': '20px'}}>
                {/* <div className="col-md-4 col-lg-4 col-xl-4 col-sm-5 col"> */}
                <div className="col">
                  How much $$?
                </div>
                  {/* <div className="col-md-4 col-lg-4 col-xl-4 col-sm-7 col"> */}
                  <div className="col">
                  <InputRange 
                    step={100}
                    formatLabel={value => `$${value}`}
                    maxValue={10000}
                    minValue={1000}
                    value={this.state.value}
                    onChange={value => this.setState({ value })} />

                  </div>
                </div>
                <div className="row" style={{'padding': '20px'}}>
                {/* <div className="col-md-4 col-lg-4 col-xl-4 col-sm-5 col"> */}
                <div className="col">
                  How many days
                </div>
                  {/* <div className="col-md-4 col-lg-4 col-xl-4 col-sm-7 col"> */}
                  <div className="col">
                  <InputRange 
                    step={1}
                    formatLabel={days => `${days}`}
                    maxValue={15}
                    minValue={1}
                    value={this.state.days}
                    onChange={days => this.setState({ days })} />  
                    </div>              

                </div>
                <div className="row" style={{'padding': '20px'}}>
               {/*  <div className="col-md-8 col-lg-8 col-xl-8"> */}
               <div className="col-12">
                  {this.calculate(this.state.value, this.state.days)}
                </div>
                {/* <div className="col-md-8 col-lg-8 col-xl-8"> */}
                <div className="col-12">
                  <button className="btn-normal pull-right float-right"
                  onClick={()=>{
                    this.setState(
                      {
                        displaySteps: true
                      }
                    )
                    localStorage.setItem(
                      'totalAmountwithIva', this.state.totalAmountwithIva
                    )
                  }}
                  ><span>SOLICITALO!</span></button>

                
                </div>
                </div>
                </div>
              </span>


              <div className="row" style={this.state.displaySteps?{display:'', 'padding': '20px'}:{display:'none'}}>
              <div className="col-md-12 col-lg-12 col-xl-12" style={{textAlign:'left'}}>
                <Main />
              </div>
              </div>
              <div className="row" style={this.state.displaySteps?{display:'', 'padding': '20px'}:{display:'none'}}>
              <div className="col-md-12 col-lg-12 col-xl-12" style={{textAlign:'left'}}>
                {/* <FileUpload/>
                <CustomerCamera /> */}
                </div>
              </div>
            </div>
            </div>
          </div>
            </div>
            <div className="container">
            <div className="row">
            <div className="col-xs-12">
              <img alt="" style={{width: '100%'}} src="/images/Customer/mr preston-customer service-01.png" className="pull-right" alt="" />              
            </div>
            <div className="col-xs-12" style={{padding: '50px', textAlign:'left'}}>
              <h5 style={{color:'#3350B9'}}>Hablar con un asesor</h5>
              </div>
            </div>
              <div className="row">
                <div className="col-6">
                  <Card style={{ height: '100%', minHeight:'200px' }}>
                    Aun no cuentas con estado de cuenta
                  </Card>
                </div>
                <div className="col-6">
                  <Card style={{ height: '100%', minHeight:'200px' }}>
                  Aun no cuentas con historial de pagos
                  </Card>
                </div>
              </div>
            </div>
        </div>
        </div>
        </div>

        <div className="row">
        <div id="footer">
        <Footer />
        </div>
        </div>
        
      </div>

    );
  }
}

export default CustomerHome;
