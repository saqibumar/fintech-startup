import React from 'react';
import Header from '../../SystemUser/Header/header';
import HourGlass from '../../Common/hourGlass';
import OPay from "../../Customer/Payment/opay";
import OPayData from "../../Customer/Payment/opay-data";
import "./payment.css";
import { toast, ToastContainer } from 'react-toastify';
import {Redirect} from 'react-router-dom';
import moment from 'moment';
import SystemHeader from '../../SystemUser/Header/header';

class CustomerPayment extends React.Component {
    
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false, 
      fetchError: null,
      sessionId: undefined,
      /* iframeSrc: '/Customer/Payment/test.html', */
      RegistrationToken: localStorage.getItem("SystemRegistrationToken"),
      cardToken:undefined,

      holderName:'',
      cardNumber: '',
      expirationYear: '',
      expirationMonth: '',
      cvv2:'',

      amount:this.props.match.params.amount || 0,
      orderId:this.props.match.params.orderId || 0,
      customerId:this.props.match.params.customerId || 0,

      form:{},

      didFail:false,
      order_data:null,
      data:null,

    }
    this.onChange = this.onChange.bind(this);
  }
  getSessoinId(){
    var iframe = document.getElementById('iframeId');
    var innerDoc = iframe.document || iframe.contentDocument || iframe.contentWindow.document;
    var elmnt = innerDoc.getElementById("deviceId");
 
    this.setState({
        sessionId:elmnt.innerText,
    })
  }

  chargeCardWithToken(SourceId){
    return new Promise((resolve, reject) => {
        this.setState({
          isFetching: true,
        });
        const DeviceSessionId = this.state.sessionId;
        var config = require('../../../Config/config.json');
        const request = {
          orderId: this.state.orderId,
          RegistrationToken: this.state.RegistrationToken,
          DeviceSessionId,
          SourceId,
          amount: this.state.amount,
          isAdmin:true,
          customerId:this.state.customerId,
          /* holderName:this.state.holderName || document.getElementById("holderName").defaultValue,
          cardNumber:this.state.cardNumber || document.getElementById("cardNumber").defaultValue,
          expirationYear:this.state.expirationYear || document.getElementById("expirationYear").defaultValue,
          expirationMonth:this.state.expirationMonth || document.getElementById("expirationMonth").defaultValue,
          cvv2:this.state.cvv2 || document.getElementById("cvv2").defaultValue, */
      };
      // "request>>>>>>",request)
        fetch(config.apiUrl + "openpay/chargeByAdmin", {
          method: 'POST', 
          headers: {
              'Content-Type': 'application/json', 
          }, 
          body: JSON.stringify(request)
      })
      .then(response => response.json())
      .then(result => {
        // "result = ", result)
        if(result.error_code){
          this.setState ({
            isFetching: false, 
            fetchError: result.description, 
            didFail:true,
        });
        reject(result.description)
            throw new Error(result.description);
        }
        else{
          this.setState ({
              isFetching: false, 
              fetchError: null,   
              cardToken: result.id,
          });
          resolve(result);
        this.chargeFees(result.fee);
        }
      })
      .catch(e => {
          /* this.setState({
              isFetching: false, 
              fetchError: e,
              didFail:true,
          }); */
          reject(e)
          setTimeout(() => {      
            toast.error(e+'');
          }, 200);
          // this.state.fetchError); 

      });
    });
    
  }

  chargeFees(fee){
    this.setState({
      isFetching: true,
    })
    var config = require('../../../Config/config.json');
    let amount = fee.amount+fee.tax
    const request = {
      RegistrationToken: this.state.RegistrationToken,      
      amount: amount.toFixed(2),
      isAdmin:true,
      customerId: this.state.customerId,
    };

    fetch(config.apiUrl + "openpay/feeByAdmin", {
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
        cardToken: result.id,
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
      setTimeout(() => {      
        toast.error("Error. Something went wrong.");
      }, 200);
  });

  }
  makePayment(orderId){
    
   /*  alert(this.state.holderName || document.getElementById("holderName").defaultValue);
    return; */
    this.setState({
      isFetching: true,
  })
    // const deviceSessionId = this.state.sessionId;
    var config = require('../../../Config/config.json');
    const request = {
      RegistrationToken: this.state.RegistrationToken,
      holderName:this.state.holderName || document.getElementById("holderName").defaultValue,
      cardNumber:this.state.cardNumber || document.getElementById("cardNumber").defaultValue,
      expirationYear:this.state.expirationYear || document.getElementById("expirationYear").defaultValue,
      expirationMonth:this.state.expirationMonth || document.getElementById("expirationMonth").defaultValue,
      cvv2:this.state.cvv2 || document.getElementById("cvv2").defaultValue,
      amount: this.state.amount,
  };

    fetch(config.apiUrl + "openpay/token", {
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
        cardToken: result.id,
        orderId: orderId,
    });
    this.chargeCardWithToken(result.id)
    .then(()=>{
      this.setState({
        isFetching: false,
    });
    });
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
      this.setState({name: value}/* ,
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
       OrderId: this.state.orderId,
       isAdmin: true,
       customerId: this.state.customerId,
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
    //   this.getCustomerOrder();
    }
    // setSandboxMode(true)
    //SAQIB: dev var opay = new OPay("mtrgpaj7xbtr9cay4nk1", 'pk_04db228e11544f3fb4d61d5d2bb98042', true);
    var opay = new OPay("mckbj4o6bt9ropbxwiuu", 'pk_1533fe6be4e146659f2dc9f89842f74a', true);
    /* opay.getId());
    opay.getKey());
    opay.getSandboxMode());
    opay.setId('mtrgpaj7xbtr9cay4nk1'));
    opay.getId());
    opay.getHostname()); */
    var opayData = new OPayData();
    // "OPayData");
    //opayData.test();
    // opayData.getDeviceDataId());

    opayData._deviceDataId = opayData.getDeviceDataId();

    var deviceDataId = opayData.deviceDataSetup("openpayForm", "deviceIdField");
    this.setState({sessionId:deviceDataId});
    /* opay.create({
      "card_number":"4111111111111111",
      "holder_name":"Juan Perez Ramirez",
      "expiration_year":"20",
      "expiration_month":"12",
      "cvv2":"110",
      "address":{
         "city":"Querétaro",
         "line3":"Queretaro",
         "postal_code":"76900",
         "line1":"Av 5 de Febrero",
         "line2":"Roble 207",
         "state":"Queretaro",
         "country_code":"MX"
      }
    }, onSuccess => {
      "SUCCESS token created ->")

    }, onError=>{
      "ERROR token create")
    }); */
    // this.state)
    // this.props)
    // setTimeout(() => {
      // if(this.state.orderId===0){
        /* this.setState({
          orderId:this.refs.orderId, //?this.refs.orderId.value:'X',
        }) */
      // }
      // this.refs.orderId?this.refs.orderId.value:'X')
    // }, 3000);

  }

  successCard(_responseData) {
	};
	errorCard(_errorResponseData){
	};

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
       isAdmin:true,
       customerId: this.state.customerId,
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
          <div className="xcontainer" >
            <ToastContainer/>
            <div id="header">
            <SystemHeader systemtoken={localStorage.getItem("SystemRegistrationToken")} />
            </div>
        {this.state.fetchError?
        (<div>
          <div style={{color:'red'}}>{this.state.fetchError}</div>
          <a href='/customer/payments/' className="backLink">Back</a>
        </div>)
        :(
            <div className="container">
             <div className="row">
             <div className="col reset-box">
            <div className="content table" style={{maxWidth:'800px'}}>
              <h2>Card Information</h2>
              <div style={{color:'red'}} hidden={!this.state.didFail}>
                  Operation failed - {this.state.fetchError+''}
              </div>
                  <form id="processCard">
                  <div className="tableRow">
                      <div className="tableCell">
                        <p>Order:</p>
                        {this.state.data?this.state.data.OrderId + " - $" + this.state.amount/* this.state.data.OrderAmount */:
                        (<select value={this.state.orderId} ref="orderId" onChange={(e)=>{
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
                        <p>Amount:</p>
                        <input type="text" data-openpay-card="amount" className="inputText disableOnSubmit" id="amount" size="50" name="amount"
                          defaultValue={this.state.amount || "0"} onChange={(e)=>{
                            this.setState({
                              amount:e.target.value
                            })
                          }} />
                      </div>
                    </div>

                    <div className="tableRow">
                      <div className="tableCell">
                        <p>Holder Name:</p>
                        <input type="text" data-openpay-card="holder_name" className="inputText disableOnSubmit" id="holderName" size="50"
                          defaultValue="Juan Perez Ramirez" onChange={this.onChange} />
                      </div>
                      <div className="tableCell">
                        <p>Card number:</p>
                        <input type="text" data-openpay-card="card_number" className="inputText disableOnSubmit" id="cardNumber" name="cardNumber" size="50"
                          defaultValue={this.state.cardNumber || "4111111111111111"} onChange={this.onChange} />
                      </div>
                    </div>
                    <div className="tableRow">
                      <div className="tableCell">
                        <p>Expiration year:</p>
                        <input type="text" data-openpay-card="expiration_year" className="inputText disableOnSubmit" id="expirationYear" size="4"
                         defaultValue="20" onChange={this.onChange} />
                      </div>
                      <div className="tableCell">
                        <p>Expiration month:</p>
                        <input type="text" data-openpay-card="expiration_month" className="inputText disableOnSubmit" id="expirationMonth" size="4"
                          defaultValue="04" onChange={this.onChange} /> 
                      </div>
                    </div>
                    
                    <div className="tableRow">
                      <div className="tableCell">
                        <p>cvv2:</p>
                        <input type="text" data-openpay-card="cvv2" className="inputText disableOnSubmit" id="cvv2" size="5"
                         defaultValue="110" onChange={this.onChange} />
                      </div>
                    </div>
                    
                    <hr/>
                      <legend>Address</legend>
                      <div className="tableRow">
                        <div className="tableCell">
                          <p>Street:</p>
                          <input type="text" data-openpay-card-address="line1" className="inputText disableOnSubmit" id="line1" size="20" defaultValue="Av 5 de febrero" />
                        </div>
                        <div className="tableCell">
                          <p>Number:</p>
                          <input type="text" data-openpay-card-address="line2" className="inputText disableOnSubmit" id="line2" size="20" defaultValue="Roble 207" />
                        </div>
                        <div className="tableCell">
                          <p>References:</p>
                          <input type="text" data-openpay-card-address="line3" className="inputText disableOnSubmit" id="line3" size="20" defaultValue="Queretaro" />
                        </div>
                      </div>
                      <div className="tableRow">
                        <div className="tableCell">
                          <p>Postal code:</p>
                          <input type="text" data-openpay-card-address="postal_code" className="inputText disableOnSubmit" id="postal_code" size="6" defaultValue="76900" />
                        </div>
                        <div className="tableCell">
                          <p>City:</p>
                          <input type="text" data-openpay-card-address="city" className="inputText disableOnSubmit" id="city" size="20" defaultValue="Queretaro" />
                        </div>
                        <div className="tableCell">
                          <p>State:</p>
                          <input type="text" data-openpay-card-address="state" className="inputText disableOnSubmit" id="state" size="20" defaultValue="Queretaro" />
                        </div>
                      </div>
                      <div className="tableRow">
                        <div className="tableCell">
                          <p>Country code:</p>
                          <input type="text" data-openpay-card-address="country_code" className="inputText disableOnSubmit" id="country_code" size="3" defaultValue="MX" />
                        </div>
                      </div>
                  </form>
                  <div className="table">
                    <div className="tableRow">
                      <div className="tableCell">
                        <button className="disableOnSubmit" id="makeRequestCard" style={{width:'100%'}} 
                        onClick={()=>{
                          //SAQIB: dev var opay = new OPay("mtrgpaj7xbtr9cay4nk1", 'pk_04db228e11544f3fb4d61d5d2bb98042', true);
                          var opay = new OPay("mckbj4o6bt9ropbxwiuu", 'pk_1533fe6be4e146659f2dc9f89842f74a', true);
                          opay.extractFormAndCreate('processCard',
                          this.successCard,
                          this.errorCard);
                          this.makePayment(this.state.orderId?this.state.orderId: this.refs.orderId.value);
                        }}>Make Payment</button>
                      </div>
                    </div>
                  </div>

                </div>
                
            
            <hr/>
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
                  
                  {/* mtrgpaj7xbtr9cay4nk1 */}
                  <input type="text" className="inputText disableOnSubmit" id="id" defaultValue="mckbj4o6bt9ropbxwiuu" size="50" />
                </div>
                <div className="tableCell">
                  <p>Request API Key:</p>
                  {/* pk_04db228e11544f3fb4d61d5d2bb98042 */}
                  <input type="text" className="inputText disableOnSubmit" id="apiKey" defaultValue="pk_1533fe6be4e146659f2dc9f89842f74a" size="50" />
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
                    value={this.state.sessionId}/>
                </div>
              </div>
            </fieldset>
            </form>
            </div>
            
            </div>
            </div>
            </div>
        )}
          </div>
  
      )
  }

  
  createTableWithFee = (numberOfDays, row)=> {
            
    var amount=row.CurrentOutstandingBalance, days=1, paymentAmount=0, paymentday=0, loanRenewalFee=0, val=0
    // Outer loop to create parent
    for (let i = 0; i < numberOfDays; i++) {
        // ">>>>>>>>>>>>>>> this.state.Payments = ", this.state.Payments);
        if(this.state.Payments){
            // let orderday = moment(row.OrderDateTime).add(i,"day").format("MM/DD/YYYY");
            let orderday = moment(row.ApprovalDateTime).add(i,"day").format("MM/DD/YYYY");
            // "this.state.Payments = ",this.state.Payments);
            // "orderday = ", orderday);
            this.state.Payments.map((item, index) => {
                let paymentDate = item.PaymentDateTime;
                let paymentStatus= item.PaymentStatus;
                let pAmount = item.Payment;
                paymentDate = moment(paymentDate).format("MM/DD/YYYY");

                let dateDifference = datediff(parseDate(orderday), parseDate(paymentDate));
                // "INDEX================", index);
                if(dateDifference===0){
                    let sameDayAmount = 0;
                    /* if(datediff(parseDate(this.state.processedDate), parseDate(paymentDate)) === 0){
                        // pAmount=pAmount+this.state.paymentAmount;
                        sameDayAmount = pAmount + this.state.processedAmount;
                        "SAME DAY =======", sameDayAmount)
                    } */
                    
                    this.state.paymentday = i;
                    this.state.paymentAmount = pAmount;
                    this.state.paymentStatus = paymentStatus;

                    // this.state.processedDate = orderday;
                    this.state.processedDate.push(orderday);

                    if(this.state.processedDate.length>1){
                        //we have repeated payments in one day
                        // "SAME DAY PAYMENTS",  this.state.processedAmount, this.state.paymentAmount)
                        this.state.processedAmount = this.state.processedAmount+ this.state.paymentAmount
                        this.state.paymentAmount = this.state.processedAmount;
                        // "SAME DAY PAYMENTS2",  this.state.processedAmount, this.state.paymentAmount)
                    }
                    else{
                        this.state.processedAmount = pAmount;
                    }
                    // "PROCESSED DATE =================", this.state.processedDate);
                    // "AMOUNT ====== ", pAmount, this.state.processedAmount);

                }
        })
        this.state.processedDate=[];
        }
        else{
            this.state.paymentAmount=0;

        }

        if(this.state.endingBalance<=0 && i>0)
        {
            /* table.push(<tr key={`tr${i+1}`}>{children}</tr>)
            children.push(
                <td style={{textAlign:'center'}} colSpan="14" key={`tdEndOfLoan_${i}`}>
                    END OF STATEMENT
                </td>) 
            return table; */
        }
        
        if(this.state.endingBalance===0){
        this.state.endingBalance = row.OrderAmount;
        }
        amount=this.state.endingBalance
        days=1
        paymentAmount=0
        paymentday=0
        loanRenewalFee=0;
        var iva=0;
        
        if(i===this.state.paymentday){
            // this.state.paymentAmount=2000;
            loanRenewalFee=0;
            paymentAmount=this.state.paymentAmount;
            paymentday=this.state.paymentday+1;
            // "valAfterpay Pay 2000 on "+paymentday+"th day")
            val = this.calculateWithFee(this.state.endingBalance, days, paymentAmount, paymentday, loanRenewalFee);
            val = (paymentAmount-(paymentAmount / (1 + 1/(row.Iva/100)))).toFixed(2);
            // "val = ", val)
            //Iva has to be calculated on interest amount
            // iva = (paymentAmount / (1 + 1/(row.Iva/100))).toFixed(2);
            // "Iva = ", iva)
            /* let paymentInterest = (paymentAmount-totalInterestFee).toFixed(2);
            iva = (paymentInterest / (1 + 1/(row.Iva/100))).toFixed(2);
            "Iva = ", iva) */
        }
        else if(i===row.LoanTerms){
            // "Charging fee with loan terms")
            loanRenewalFee=row.LoanRenewalFee;
            val = this.calculateWithFee(amount, days, paymentAmount, paymentday, loanRenewalFee);

        }
        else if(i===15+row.LoanTerms){
            // "Charging fee after 14 days")
            loanRenewalFee=row.LoanRenewalFee;
            val = this.calculateWithFee(amount, days, paymentAmount, paymentday, loanRenewalFee);
        }
        else if(i===30+row.LoanTerms){
            // "Charging fee after 30 days")
            loanRenewalFee=row.LoanRenewalFee;
            val = this.calculateWithFee(amount, days, paymentAmount, paymentday, loanRenewalFee);
        }
        else{
            // "ELSE Charging fee after 14 days")
            val = this.calculateWithFee(amount, days, paymentAmount, paymentday, loanRenewalFee);
        }
        
        var interest = (this.state.newStartBalance*row.InterestRate/100).toFixed(2);
        // "Current val2 = ", val);
        // "Current Interest = ", interest);
        var totalInterestFee=0;
        totalInterestFee=(this.state.startingBalance-row.OrderAmount).toFixed(2);
        // "this.state.startingBalance = ", this.state.startingBalance);
        // "row.OrderAmount = ", row.OrderAmount);
        // "totalInterestFee = ", totalInterestFee);
        var paymentTowardsInterest=0;
        var paymentTowardsPrincipal=0;
        
        if(i===this.state.paymentday/*  && this.state.paymentAmount */)
        {
            
            // "this.state.paymentday = ", this.state.paymentday, i);
            // "PAYMENT DAY totalInterestFee>>>", totalInterestFee);
            // "PAYMENT DAY val>>>", val);
            // "PAYMENT DAY paymentAmount>>>", this.state.paymentAmount);
            // "(totalInterestFee > val)", parseFloat(totalInterestFee)>parseFloat(val))
            if(parseFloat(totalInterestFee)>parseFloat(val)/* this.state.paymentAmount */)
            {
                paymentTowardsInterest = this.state.paymentAmount;
                // paymentTowardsInterest = (paymentTowardsInterest-(paymentTowardsInterest / (1 + 1/(row.Iva/100)))).toFixed(2);
            }
            else{
                // "paymentTowardsInterest---1>>>", paymentTowardsInterest, totalInterestFee)
                /* if(this.state.paymentAmount){
                    
                } */
                paymentTowardsInterest = totalInterestFee;
                paymentTowardsPrincipal = (this.state.paymentAmount-totalInterestFee).toFixed(2);
                // row.OrderAmount = row.OrderAmount-paymentTowardsPrincipal;
            }
            // paymentTowardsInterest = (paymentTowardsInterest-(paymentTowardsInterest / (1 + 1/(row.Iva/100)))).toFixed(2);
            //Iva has to be calculated on interest amount
            
            iva = (paymentTowardsInterest * row.Iva/100).toFixed(2);
            // iva = (paymentTowardsInterest / (1 + 1/(row.Iva/100))).toFixed(2);
            // "Iva = ", iva);
            // paymentTowardsInterest = paymentTowardsInterest-iva;
            
            if(paymentTowardsPrincipal>0){
                paymentTowardsPrincipal = paymentTowardsPrincipal-iva;
                iva = (paymentTowardsInterest * row.Iva/100).toFixed(2);
                // "paymentTowardsInterest---22>>>", paymentTowardsInterest, iva)
            }
            else{
                
                paymentTowardsPrincipal = 0;
                // iva = (paymentTowardsInterest / (1 + 1/(row.Iva/100))).toFixed(2);
                paymentTowardsInterest = (paymentTowardsInterest-(paymentTowardsInterest / (1 + 1/(row.Iva/100)))).toFixed(2);
                iva = (paymentTowardsInterest * row.Iva/100).toFixed(2);
                
                // "paymentTowardsInterest---2>>>", paymentTowardsInterest, iva)
            }

            // "interest>>>>>", interest)
            // "iva>>>>>", iva)
            val = parseFloat(paymentTowardsPrincipal)+parseFloat(paymentTowardsInterest);
            // "val>>>>>", val)
            let endingBal=0.00;
            endingBal = parseFloat(this.state.newStartBalance)-parseFloat(val)+parseFloat(interest);
            this.state.endingBalance=endingBal;
            if(paymentTowardsPrincipal>0){
                row.OrderAmount = endingBal;
            }
        }
        //Inner loop to create children
      for (let j = 0; j < 12; j++) {
        switch (j) {
            case 0:
                /* children.push(<td key={`tdSerial${j}_${i}`}>{i+1}</td>)
                children.push(
                  
                <td key={`tdDay${j}_${i}`} style={{textAlign:'left'}}>
                    {moment(row.ApprovalDateTime).add(i,"day").format("ddd, MMM DD, YYYY")}
                    
                </td>)   */                        
            break;
            case 1:
                                    
            break;
            case 2:
            break;
            case 3:
            break;
            case 4:
                // "INTEREST+FEE: ",currencyFormat(totalInterestFee))
            break;
            case 5:
            break;
            case 6:
                if(i===this.state.paymentday && i>=0){
                }
                else{
                    //children.push(<td key={`tdTotalPayment${j+1}_${i+1}`}>-</td>)  
                }
            break;
            case 7:
            break;
            
            case 8:
                if(i===this.state.paymentday && i>0)
                {
                }
                else{
                    // children.push(<td key={`tdPayment${j+1}_${i+1}`}> -</td>)
                }
            break;
            case 9:
            break;
            case 10:
                if(paymentTowardsInterest>val)
                {
                }
                else{
                }
            break;
            case 11:
                    if(i===this.state.paymentday && i>=0 && this.state.paymentAmount>0){

                    }
                    else{
                        /* children.push(<td className="text-center" key={`tdPaymentStatus${j+1}_${i+1}`}>
                    -
                    </td>) */
                    }
                    
                    
            break;
            default:
                //children.push(<td key={`td${j}_${i}`}></td>)
            break;
          }
      }
    }

    
    if(document.getElementById("todayBalance")){
        document.getElementById("todayBalance").innerText = `${currencyFormat(this.state.endingBalance)}`;
    }
    
    // return table
  }

  
}

function currencyFormat(num) {
  let snum = parseFloat(num);
  if(num>999)
  {
      return '$' + snum.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }
  else if(num<1000)
  return '$'+snum.toFixed(2);
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

export default CustomerPayment;