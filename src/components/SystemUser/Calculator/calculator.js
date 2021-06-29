import React, { Component } from 'react';
import SystemHeader from '../Header/header';
import Footer from '../Footer/footer';
import InputRange from 'react-input-range';
import "react-input-range/lib/css/index.css";

class SystemCalculator extends Component{
    constructor(props) {
        super(props);
        this.state = {
            currentDate:'',
            currentTime: '',

            isFetching: false, 
            fetchError: null,
            token: localStorage.getItem("RegistrationToken"),
            asOf: new Date(),
            value: 1000,
            days:1,
            displaySteps:false,
            totalAmountwithIva:0,

            paymentday:0,
            paymentAmount:0,
            remainingDays:0,
            balanceAmount:0,
        };
      }
    
    
      setCurrentTime(){
        this.setState({
          currentTime: new Date().toLocaleTimeString('en-US', { hour12: false })
        });
      }
    
    onChange = date => this.setState({asOf: date});

    
  getNetAmount(amount, days){
    let p = amount;
    let n = 1; // no. of compoundings per day (1%)
    let t = days; // no. of days
    let r = 1.8; //rate 1%
    let A = (p* Math.pow((1 + (r/(n*100))), (n*t)));
    let netTotal=0;
    let remainingDays=0;
    let paymentAmount=this.state.paymentAmount; 
    let paymentday=this.state.paymentday;

    //if(paymentday>1 && paymentAmount>0)
    {
        //days=paymentday;
        amount=paymentAmount;

        t=paymentday
        // remainingDays = days-t;
        remainingDays = days-paymentday;
        A = (p* Math.pow((1 + (r/(n*100))), (n*t)))-paymentAmount;
        // this.calculate(A, remainingDays, 0, 0)
        netTotal=A;
    this.setState({
        //totalAmountwithIva: netTotal
        balanceAmount:A,
        remainingDays,
      })

    }/* 
    else{
        //No middle payments
        A = (p* Math.pow((1 + (r/(n*100))), (n*t)));
    } */

    // "days = ", days)
    // "Balance = ", this.state.balanceAmount)
    return netTotal;
  }

  calculate(amount, days, paymentAmount, paymentday) {
    let p = amount;
    let n = 1; // no. of compoundings per day (1%)
    let t = days; // Loan Term: no. of days
    let r = 1.8; //rate 1.8%
    let remainingDays=0;
    // result = document.getElementById("result");
    // The equation is A = p * [[1 + (r/n)] ^ nt]
    let A = 0; //(p* Math.pow((1 + (r/(n*100))), (n*t)))-paymentAmount;
    if(paymentday>1 && paymentAmount>0){
        //days=paymentday;
        amount=paymentAmount;
        t=paymentday
        // remainingDays = days-t;
        remainingDays = days-paymentday;
        A = (p* Math.pow((1 + (r/(n*100))), (n*t)))-paymentAmount;        
        // this.calculate(A, remainingDays, 0, 0)
    }
    else{
        //No middle payments
        A = (p* Math.pow((1 + (r/(n*100))), (n*t)))-paymentAmount;
    }
    return (<div>
        The total amount + interest is <b>${A.toFixed(2)}</b>
        <br />
        {/* The interest + IVA is <b>${((A.toFixed(2) - p)+(A.toFixed(2) - p)*0.16).toFixed(2)}</b>
        <br/>
        16% IVA is ${((A.toFixed(2) - p)*0.16).toFixed(2)}
        <br/>
        The interest is ${((A.toFixed(2) - p)).toFixed(2)} */}
        {/* <br />
        Net:  <b>${((A)+(A.toFixed(2) - p)*0.16).toFixed(2)}</b> */}
        <hr/>
        <div hidden={(paymentday<=0 && paymentAmount<=0)}>
        Payment day: {paymentday}
        <br/>
        Remaining Days: {remainingDays>0? remainingDays: ''}
        <br/>
        Payment Amount: {paymentAmount}
        <br/>
        Balance Amount: {this.state.balanceAmount.toFixed(2)}
        </div>
    </div>
    );
  
  }

  render(){
    return (
        <div id="container">
        <div id="header">
        <SystemHeader systemtoken={localStorage.getItem("SystemRegistrationToken")} />
        </div>
        <div id="row">
        <div className="col">
        <h1>Payments calculator</h1>
        <div className="container calculator-container">
              <span>
                <div style={this.state.displaySteps?{display:'none'}:{display:''}}>
                <div className="row" style={{'padding': '20px'}}>
                <div className="col-md-4 col-lg-4 col-xl-4 col-sm-5 col">
                  How much $$?
                </div>
                  <div className="col-md-4 col-lg-4 col-xl-4 col-sm-7 col">
                  <InputRange 
                    step={100}
                    formatLabel={value => `$${value}`}
                    maxValue={10000}
                    minValue={10}
                    value={this.state.value}
                    onChange={value => {
                        this.setState({ value });
                        this.getNetAmount(value,this.state.days)
                    }} />

                  </div>
                </div>
                <div className="row" style={{'padding': '20px'}}>
                <div className="col-md-4 col-lg-4 col-xl-4 col-sm-5 col">
                  How many days
                </div>
                  <div className="col-md-4 col-lg-4 col-xl-4 col-sm-7 col">
                  <InputRange 
                    step={1}
                    formatLabel={days => `${days}`}
                    maxValue={15}
                    minValue={1}
                    value={this.state.days}
                    onChange={days => {
                        this.setState({ days });
                        this.getNetAmount(this.state.value,days)
                        }} />  
                    </div> 
                    </div>

                    <div className="row" style={{'padding': '20px'}}>
                <div className="col-md-4 col-lg-4 col-xl-4 col-sm-5 col">
                  Payment day
                </div>
                    <div className="col-md-4 col-lg-4 col-xl-4 col-sm-7 col">
                  <InputRange 
                    step={1}
                    formatLabel={paymentday => `${paymentday}`}
                    maxValue={15}
                    minValue={0}
                    value={this.state.paymentday}
                    onChange={paymentday => {
                        this.setState({ paymentday });
                        // this.getNetAmount(this.state.value, paymentday)
                        // this.getNetAmount(this.state.value, this.state.days)
                        setTimeout(() => {                          
                          this.getNetAmount(this.state.value, this.state.days)
                          this.calculate(this.state.balanceAmount,this.state.days, this.state.paymentAmount, this.state.remainingDays)
                        }, 500);
                        }} /> 
                    <br/> 
                    <input type="text" placeholder="Payment Amount" value={this.state.paymentAmount} 
                    onChange={e=>{
                        this.setState({ 
                            paymentAmount:e.target.value,
                            remainingDays : this.state.days-this.state.paymentday,
                         });
                        //  this.getNetAmount(e.target.value, this.state.days)
                        setTimeout(() => {                          
                          this.getNetAmount(this.state.value, this.state.days)
                          this.calculate(this.state.balanceAmount,this.state.days, this.state.paymentAmount, this.state.remainingDays)
                        }, 500);
                      }}></input>
                    </div> 
                </div>
                <div className="row" style={{'padding': '20px'}}>
                <div className="col-md-8 col-lg-8 col-xl-8">
                <button onClick={()=>{
                    // alert('saq');
                    // this.state.balanceAmount,this.state.days, this.state.paymentAmount, this.state.remainingDays)
                    // this.getNetAmount(this.state.value, this.state.days));
                    this.getNetAmount(this.state.value, this.state.days)
                    this.calculate(this.state.balanceAmount,this.state.days, this.state.paymentAmount, this.state.remainingDays)
                }
                }>Recalculate</button>
                </div></div>
                </div>
                <div className="row" style={{'padding': '20px'}}>
                <div className="col-md-8 col-lg-8 col-xl-8">
                  {this.calculate(this.state.value, this.state.days, this.state.paymentAmount, this.state.paymentday)}
                  <br/>
                  {/*this.calculate(this.state.balanceAmount, this.state.remainingDays, 0, 0)*/}
                  {/* Balance >>>> {this.state.balanceAmount}<br/>
                  Value, days>>>>>{this.state.value},{this.state.days} */}
                  {
                      
                  (this.state.paymentAmount>0 && this.state.paymentday>0)?
                  this.calculate(this.state.balanceAmount, this.state.remainingDays, 0, 0): ''
                }
                </div>
                </div>
              </span>


              <div className="row" style={this.state.displaySteps?{display:'', 'padding': '20px'}:{display:'none'}}>
              <div className="col-md-12 col-lg-12 col-xl-12" style={{textAlign:'left'}}>
               
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
        <div id="footer">
        <Footer />
        </div>
        </div>

  );
  }


}

export default SystemCalculator;

