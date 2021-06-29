import React, { useState } from 'react';
// import Header from '../../Header/header';
import HourGlass from '../Common/hourGlass';
import Moment from 'react-moment';
import moment from 'moment';
// import './style.css';
import './statement-table.scss';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
// import NumberFormat from 'react-number-format';
// import SystemHeader from '../SystemUser/Header/header';


class StatementTable extends React.Component {
    
    constructor(props) {
      super(props);
      this.state = {
        isFetching: false, 
        fetchError: null,
        item: this.props.item,
        numberOfDays:0,

        token: localStorage.getItem("RegistrationToken"),
        asOf: new Date(),
        value: 1000,
        days:1,
        displaySteps:false,
        totalAmountwithIva:0,

        paymentday:0,
        paymentAmount:0,
        paymentStatus:'',
        remainingDays:0,
        balanceAmount:0,
        
        activateRenewFee:false,
        newStartBalance:0,
        newInterest:0,

        startingBalance:0,
        endingBalance:0,
        todayEndingBalance:0,

        Payments:[],

        processedDate:[],
        processedAmount:0.00,
      }
      
    }

    calculate(amount, days, paymentAmount, paymentday, loanRenewalFee=0) {
        let p = amount;
        let n = 1; // no. of compoundings per day (1%)
        let t = days; // Loan Term: no. of days
        let r = this.state.item.InterestRate; //rate 1.8%
        let remainingDays=0;
        
        if(!this.state.activateRenewFee){
            loanRenewalFee=0;
        }
        else{
            //loanRenewalFee=(loanRenewalFee* Math.pow((1 + (r/(n*100))), (n*t)));
            // "loan fee included = ", loanRenewalFee, t)
        }
        
        // result = document.getElementById("result");
        // The equation is A = p * [[1 + (r/n)] ^ nt]
        let A = 0; //(p* Math.pow((1 + (r/(n*100))), (n*t)))-paymentAmount;
        if(paymentday>1 && paymentAmount>0){
            //days=paymentday;
            amount=paymentAmount;
    
            t=paymentday
            // remainingDays = days-t;
            remainingDays = days-paymentday;
            A = (p* Math.pow((1 + (r/(n*100))), (n*t))+loanRenewalFee)-paymentAmount;
            
            // this.calculate(A, remainingDays, 0, 0)
        }
        else{
            //No middle payments
            A = (p* Math.pow((1 + (r/(n*100))), (n*t))+loanRenewalFee)-paymentAmount;
            // A = A+loanRenewalFee;
        }


        /* if(t>=this.state.item.OrderTerm+1){
            this.state.newStartBalance=A.toFixed(2);
            "this.state.newStartBalance = ", this.state.newStartBalance);
            // let balance=this.calculate(this.state.item.OrderAmount, t,0,0, this.state.item.LoanRenewalFee);
            // let interest=(balance*(this.state.item.InterestRate/100)).toFixed(2);
            "INTEREST = ", this.state.newInterest)
        } */
        return((A).toFixed(2))
      
      }

    componentDidMount(){
        document.getElementById("test-table-xls-button").innerHTML=`
        <svg xmlns="http://www.w3.org/2000/svg" fill="white" width="24" height="24" viewBox="0 0 24 24"><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/></svg> 
        Save xls`;

        let item = this.state.item;
        let numberOfDays;
        // var day = moment(item.OrderDateTime).format("MM/DD/YYYY");
        var day = moment(item.ApprovalDateTime).format("MM/DD/YYYY");
        var paymentday = moment(item.PaymentDateTime).format("MM/DD/YYYY");
        var dayNow = moment(Date()).format("MM/DD/YYYY");
        numberOfDays = datediff(parseDate(day), parseDate(dayNow))+1;
        this.setState({
            numberOfDays,
            paymentday: datediff(parseDate(day), parseDate(paymentday)),
            paymentAmount: item.Payment,
            Payments: JSON.parse(item.Payments),
        });


    }
    calculateWithFee(amount, days, paymentAmount, paymentday, loanRenewalFee=0) {
        // amount, days, paymentAmount, paymentday, loanRenewalFee);
        let p = amount;
        let n = 1; // no. of compoundings per day (1%)
        let t = days; // Loan Term: no. of days
        let r = this.state.item.InterestRate; //rate 1.8%
        // if(paymentAmount>0){
            this.state.startingBalance = (p* Math.pow((1 + (r/(n*100))), (n*t))+loanRenewalFee).toFixed(2);
            /* this.setState({
                startingBalance: (p* Math.pow((1 + (r/(n*100))), (n*t))+loanRenewalFee).toFixed(2)
            }) */
        // }
        let A = (p* Math.pow((1 + (r/(n*100))), (n*t))+loanRenewalFee)-paymentAmount;
        this.state.newStartBalance = amount;
        this.state.endingBalance = A.toFixed(2);
        // ">>>>>>>>>", days);
        // "this.state.newStartBalance = ", this.state.newStartBalance);
        // "this.state.endingBalance = ", this.state.endingBalance)
        return this.state.endingBalance;      
    }

    render(){
        const { history } = this.props;
        if (this.state.isFetching === true) 
        {
            return <div><HourGlass /></div>;
        }

        return(
            <div className="container">
                
                <div className="row">
                <div className="col-6">
                    <button className="pull-left" 
                        onClick={()=>{
                            window.location.href="/SystemUser/home";                            
                        }}
                    >Back</button>
                </div>
                    <div className="col-6">                        
                        <ReactHTMLTableToExcel
                            id="test-table-xls-button"
                            className="pull-right download-table-xls-button"
                            table="table-to-xls"
                            filename={`Statement_${this.state.item.OrderId}`}
                            sheet={`Sheet_${this.state.item.OrderId}`}
                            buttonText={"Excel"}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">  
                            <div className="xtable-wrapper">
                                <table style={{border:'1px solid silver',width:'100%', textAlign:'right'}} 
                                    className="fixed-header-table table customers" id="table-to-xls">
                                <thead>
                                <tr>
                                <td colSpan="10" rowSpan="6"></td>
                                        {/* <td colSpan="8"></td> */}
                                        <th colSpan="2">
                                        {/* Loan Amount: */}
                                        Balance:
                                        </th>
                                        <td colSpan="2" >
                                            <span id="todayBalance">
                                                {/* this.state.endingBalance */}
                                                {/* this.state.isBalanceLoading?'...': this.state.endingBalance */}
                                            {this.state.item.OrderAmount}
                                            </span>
                                            <span id="payTodayBalance">
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        {/* <td colSpan="10" rowSpan="6"></td> */}
                                        <th colSpan="2">
                                        Order Id:
                                        </th>
                                        <td colSpan="2">
                                        {this.state.item.OrderId}
                                        </td>
                                    </tr>
                                    <tr>
                                        {/* <td colSpan="8" rowSpan="6"></td> */}
                                        <th colSpan="2">
                                        Loan Order Terms:
                                        </th>
                                        <td colSpan="2">
                                        {this.state.item.OrderTerm}
                                        </td>
                                    </tr>

                                    <tr>
                                        {/* <td colSpan="8"></td> */}
                                        <th colSpan="2">
                                        Loan Request Status:
                                        </th>
                                        <td colSpan="2">
                                        {this.props.item.OrderStatus}
                                        </td>
                                    </tr>
                                    <tr>
                                        {/* <td colSpan="8"></td> */}
                                        <th colSpan="2">
                                        Grant Date:
                                        </th>
                                        <td colSpan="2">
                                            {this.props.item.OrderStatus==='Approved'?
                                            <div>

                                                <Moment local format="ddd, MMM DD, YYYY @ HH:mm:ss">{this.props.item.ApprovalDateTime}</Moment>
                                                <br/>(<Moment fromNow>{this.props.item.ApprovalDateTime}</Moment>)  

                                            </div>
                                                :
                                                <div>
                                                    <Moment local format="ddd, MMM DD, YYYY @ HH:mm:ss">{this.props.item.OrderDateTime}</Moment>
                                                    <br/>(<Moment fromNow>{this.props.item.OrderDateTime}</Moment>)  
                                                </div>
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                       {/*  <td colSpan="8"></td> */}
                                        <th colSpan="2">
                                        Requester:
                                        </th>
                                        <td colSpan="2">
                                        {this.props.item.FirstName + ' ' + this.props.item.LastName}
                                        </td>
                                    </tr>
                                    <tr>
                                    {/* <td colSpan="8"></td> */}
                                    <td colSpan="10"></td>
                                        <th colSpan="2">
                                        Address:
                                        </th>
                                        <td colSpan="2">
                                        {this.props.item.Street}, {this.props.item.ExteriorNumber}/{this.props.item.InteriorNumber}, 
                                            <br/>{this.props.item.Colony}, {this.props.item.City}, {this.props.item.Country} {this.props.item.Zip}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="12">
                                        &nbsp;
                                        </td>
                                    </tr>
                                    <tr>
                                    <th scope="col" style={{minWidth:'25px', textAlign:'center'}}>
                                        #
                                        </th>
                                        <th scope="col" style={{minWidth:'125px', textAlign:'center'}}>
                                        Days
                                        </th>
                                        <th scope="col">
                                        Principal Balance
                                        </th>
                                        <th scope="col">
                                        Instrest
                                        </th>
                                        <th scope="col">
                                        Fees
                                        </th>
                                        {/* <th scope="col">
                                        Credit
                                        </th> */}
                                        <th scope="col">
                                        Total Intrest and Fees Balance
                                        </th>
                                        <th scope="col">
                                        Balance
                                        </th>
                                        <th scope="col">
                                        Total Payment
                                        </th>
                                        <th scope="col">
                                            {this.state.item.Iva}% IVA
                                        </th>
                                        <th scope="col">
                                        Payment
                                        </th>
                                        <th scope="col">
                                        Payment Towards Principal
                                        </th>
                                        <th scope="col">
                                        Paymant towards Interests
                                        </th>
                                        
                                        <th scope="col">
                                        OUTSTANDING BALANCE AFTER PAYMENT
                                        </th>

                                        <th scope="col">
                                        Payment Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        //this.createTable(this.state.item.OrderTerm+1)
                                    
                                    }
                                    {
                                        this.createTableWithFee(this.state.numberOfDays)
                                    }
                                </tbody>
                                </table>
                            </div>
                    </div>
                </div>
            </div>
        )

    }

    createTableWithFee = (numberOfDays) => {
        
        var amount=this.state.item.OrderAmount, days=1, paymentAmount=0, paymentday=0, loanRenewalFee=0, val=0
        let table = [];
        // Outer loop to create parent
        for (let i = 0; i < numberOfDays; i++) {
            let children = [];
            // ">>>>>>>>>>>>>>> this.state.Payments = ", this.state.Payments);
            if(this.state.Payments){
                // let orderday = moment(this.state.item.OrderDateTime).add(i,"day").format("MM/DD/YYYY");
                let orderday = moment(this.state.item.ApprovalDateTime).add(i,"day").format("MM/DD/YYYY");
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
                
                table.push(<tr key={`tr${i+1}`}>{children}</tr>)
                children.push(
                    <td style={{textAlign:'center'}} colSpan="14" key={`tdEndOfLoan_${i}`}>
                        END OF STATEMENT
                    </td>) 
                    if(document.getElementById("todayBalance")){
                        document.getElementById("todayBalance").innerText = `${currencyFormat(this.state.endingBalance)}`;
                    }
                    if(document.getElementById("payTodayBalance")){
                        document.getElementById("payTodayBalance").innerHTML = ` <br/> <a href='/SystemUser/payments/${this.state.item.OrderId}/${this.props.item.CustomerId}' className='pull-right'>Make Payment</a>`;
                        // document.getElementById("payTodayBalance").innerHTML += ` | <a href='/SystemUser/refund/${this.state.item.OrderId}/${this.props.item.CustomerId}' className='pull-right'>Refund</a>`;
                                    }
            
                return table;
            }
            
            if(this.state.endingBalance===0){
             this.state.endingBalance = this.state.item.OrderAmount;
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
                val = (paymentAmount-(paymentAmount / (1 + 1/(this.state.item.Iva/100)))).toFixed(2);
                // "val = ", val)
                //Iva has to be calculated on interest amount
                // iva = (paymentAmount / (1 + 1/(this.state.item.Iva/100))).toFixed(2);
                // "Iva = ", iva)
                /* let paymentInterest = (paymentAmount-totalInterestFee).toFixed(2);
                iva = (paymentInterest / (1 + 1/(this.state.item.Iva/100))).toFixed(2);
                "Iva = ", iva) */
            }
            else if(i===this.state.item.LoanTerms){
                // "Charging fee with loan terms")
                 loanRenewalFee=this.state.item.LoanRenewalFee;
                 val = this.calculateWithFee(amount, days, paymentAmount, paymentday, loanRenewalFee);

            }
            else if(i===15+this.state.item.LoanTerms){
                // "Charging fee after 14 days")
                 loanRenewalFee=this.state.item.LoanRenewalFee;
                 val = this.calculateWithFee(amount, days, paymentAmount, paymentday, loanRenewalFee);
             }
             else if(i===30+this.state.item.LoanTerms){
                // "Charging fee after 30 days")
                 loanRenewalFee=this.state.item.LoanRenewalFee;
                 val = this.calculateWithFee(amount, days, paymentAmount, paymentday, loanRenewalFee);
             }
             else if(i===45+this.state.item.LoanTerms){
                // "Charging fee after 30 days")
                 loanRenewalFee=this.state.item.LoanRenewalFee;
                 val = this.calculateWithFee(amount, days, paymentAmount, paymentday, loanRenewalFee);
             }
             else{
                // "ELSE Charging fee after 14 days")
                 val = this.calculateWithFee(amount, days, paymentAmount, paymentday, loanRenewalFee);
            }
            
            var interest = (this.state.newStartBalance*this.state.item.InterestRate/100).toFixed(2);
            // "Current val2 = ", val);
            // "Current Interest = ", interest);
            var totalInterestFee=0;
            totalInterestFee=(this.state.startingBalance-this.state.item.OrderAmount).toFixed(2);
            // "this.state.startingBalance = ", this.state.startingBalance);
            // "this.state.item.OrderAmount = ", this.state.item.OrderAmount);
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
                    // paymentTowardsInterest = (paymentTowardsInterest-(paymentTowardsInterest / (1 + 1/(this.state.item.Iva/100)))).toFixed(2);
                }
                else{
                    // "paymentTowardsInterest---1>>>", paymentTowardsInterest, totalInterestFee)
                    /* if(this.state.paymentAmount){
                        
                    } */
                    paymentTowardsInterest = totalInterestFee;
                    paymentTowardsPrincipal = (this.state.paymentAmount-totalInterestFee).toFixed(2);
                    // this.state.item.OrderAmount = this.state.item.OrderAmount-paymentTowardsPrincipal;
                }
                // paymentTowardsInterest = (paymentTowardsInterest-(paymentTowardsInterest / (1 + 1/(this.state.item.Iva/100)))).toFixed(2);
                //Iva has to be calculated on interest amount
                
                iva = (paymentTowardsInterest * this.state.item.Iva/100).toFixed(2);
                // iva = (paymentTowardsInterest / (1 + 1/(this.state.item.Iva/100))).toFixed(2);
                // "Iva = ", iva);
                // paymentTowardsInterest = paymentTowardsInterest-iva;
                
                if(paymentTowardsPrincipal>0){
                    paymentTowardsPrincipal = paymentTowardsPrincipal-iva;
                    iva = (paymentTowardsInterest * this.state.item.Iva/100).toFixed(2);
                    // "paymentTowardsInterest---22>>>", paymentTowardsInterest, iva)
                }
                else{
                    
                    paymentTowardsPrincipal = 0;
                    // iva = (paymentTowardsInterest / (1 + 1/(this.state.item.Iva/100))).toFixed(2);
                    paymentTowardsInterest = (paymentTowardsInterest-(paymentTowardsInterest / (1 + 1/(this.state.item.Iva/100)))).toFixed(2);
                    iva = (paymentTowardsInterest * this.state.item.Iva/100).toFixed(2);
                    
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
                    this.state.item.OrderAmount = endingBal;
                }
            }
            //Inner loop to create children
          for (let j = 0; j < 12; j++) {
            switch (j) {
                case 0:
                    children.push(<td key={`tdSerial${j}_${i}`}>{i+1}</td>)
                    children.push(
                       
                    <td key={`tdDay${j}_${i}`} style={{textAlign:'left'}}>
                        {moment(this.state.item.ApprovalDateTime).add(i,"day").format("ddd, MMM DD, YYYY")}
                        
                    </td>)                          
                break;
                case 1:
                    children.push(<td key={`tdPrincipalBalance${j}_${i}`}>
                        {/* {this.state.item.OrderAmount}<br/> */}
                        {
                        (paymentTowardsPrincipal>0&&iva>0)?
                        currencyFormat(parseFloat(this.state.item.OrderAmount)+parseFloat(paymentTowardsPrincipal)):
                        currencyFormat(this.state.item.OrderAmount)
                        }
                        {/* <br/>
                        {this.state.newStartBalance} /  {this.state.startingBalance} /{paymentTowardsPrincipal} */}
                        </td>)                         
                break;
                case 2:
                    /* "INTEREST: ",
                        currencyFormat(interest)
                       )  */
                    children.push(<td key={`tdInterest${j+1}_${i+1}`}>
                        {currencyFormat(interest)}
                        {/* `${interest}` */}
                        </td>)                         
                break;
                case 3:
                    children.push(<td key={`tdFee${j+1}_${i+1}`}>
                        {loanRenewalFee>0?currencyFormat(loanRenewalFee.toFixed(2)):'-'}
                        {/* `${loanRenewalFee>0?loanRenewalFee:'-'}` */}                        
                        </td>)

                    /* if(i===this.state.paymentday && i>=0){
                        children.push(<td key={`tdCredit${j+1}_${i+1}`}>
                            {currencyFormat(this.state.paymentAmount)}
                        </td>) 
                    }
                    else{
                        children.push(<td key={`tdCreditPayment${j+1}_${i+1}`}>-</td>)  
                    }
 */
                        
                break;
                case 4:
                    // "INTEREST+FEE: ",currencyFormat(totalInterestFee))
                    children.push(<td key={`tdFeeInterest${j+1}_${i+1}`}>
                        {currencyFormat(totalInterestFee)}
                        {/* `${totalInterestFee}` */}
                        </td>)
                break;
                case 5:
                    children.push(<td key={`tdFee${j+1}_${i+1}`}>
                        {currencyFormat(this.state.startingBalance)}
                        {/* `${this.state.startingBalance}` */}
                    </td>)
                break;
                case 6:
                    if(i===this.state.paymentday && i>=0){
                        children.push(<td key={`tdTotalPayment${j+1}_${i+1}`}>
                            {currencyFormat(this.state.paymentAmount)}
                            
                            </td>)                         
                    }
                    else{
                        children.push(<td key={`tdTotalPayment${j+1}_${i+1}`}>-</td>)  
                    }
                break;
                case 7:
                    children.push(<td key={`tdiva${j+1}_${i+1}`}>
                        {`${iva>0?currencyFormat(iva):'-'}`}</td>)
                break;
                
                case 8:
                    if(i===this.state.paymentday && i>0)
                    {
                        children.push(<td key={`tdPayment${j+1}_${i+1}`}>
                            {currencyFormat(val)}
                            </td>)                         
                    }
                    else{
                        children.push(<td key={`tdPayment${j+1}_${i+1}`}>
                            -</td>)
                    }
                break;
                case 9:
                    children.push(<td key={`tdFee${j+1}_${i+1}`}>
                        {`${paymentTowardsPrincipal>0?currencyFormat(paymentTowardsPrincipal):'-'}`}</td>)                         
                break;
                case 10:
                    if(paymentTowardsInterest>val)
                    {
                        children.push(<td key={`tdFee${j+1}_${i+1}`}>
                        {`${val>0?currencyFormat(val):'-'}`}</td>) 
                    }
                    else{
                    children.push(<td key={`tdFee${j+1}_${i+1}`}>
                        {`${paymentTowardsInterest>0?currencyFormat(paymentTowardsInterest):'-'}`}</td>)                         
                    }
                break;
                case 11:
                    children.push(<td key={`tdFee${j+1}_${i+1}`}>
                        {/* {i}///{numberOfDays}/// */}
                        {`${currencyFormat(this.state.endingBalance)}`}</td>)
                        if(i===this.state.paymentday && i>=0 && this.state.paymentAmount>0){

                        children.push(<td key={`tdPaymentStatus${j+1}_${i+1}`}>
                        {this.state.paymentStatus}
                        </td>)
                        }
                        else{
                            children.push(<td className="text-center" key={`tdPaymentStatus${j+1}_${i+1}`}>
                        -
                        </td>)
                        }
                        
                        
                break;
                default:
                    children.push(<td key={`td${j}_${i}`}></td>)
                break;
              }
            //children.push(<td key={`td${j+1}_${i+1}`}>{`Column ${j + 1}`}</td>)
            
          }
          //Create the parent and add the children
          table.push(<tr key={`tr${i+1}`}>{children}</tr>)
          /* if(i===numberOfDays && i>0){
            "////////////////////////", this.state.endingBalance, i);
          } */
        }

        
        table.push(<tr key={`trEnd`}>
            <td style={{textAlign:'center'}} colSpan="14" key={`tdEndOfLoan`}>
                END OF STATEMENT
            </td>
        </tr>)
        // "SAQ", this.state.endingBalance);
        // setTimeout(() => {
            
            if(document.getElementById("todayBalance")){
                document.getElementById("todayBalance").innerText = `${currencyFormat(this.state.endingBalance)}`;
            }
            if(document.getElementById("payTodayBalance")){
                document.getElementById("payTodayBalance").innerHTML = ` <br/> <a href='/SystemUser/payments/${this.state.item.OrderId}/${this.props.item.CustomerId}' className='pull-right'>Make Payment</a>`;
                //document.getElementById("payTodayBalance").innerHTML += ` | <a href='/SystemUser/refund/${this.state.item.OrderId}/${this.props.item.CustomerId}' className='pull-right'>Refund</a>`;
            }
    
        // }, 1000);
        return table
      }

      
            

    createTable = (numberOfDays) => {
        let table = []
    
        // Outer loop to create parent
        for (let i = 0; i <= numberOfDays; i++) {
        let children = []
        if(i>this.state.item.LoanTerms){
            this.state.activateRenewFee=true;
            
        }
        //Inner loop to create children
        for (let j = 0; j < 12; j++) {
            if(j===0)
            {
                children.push(<td key={`tdDay${j+1}_${i+1}`}>
                    {`${i+1}-${moment(this.state.item.ApprovalDateTime).add(i,"day").format("MM/DD/YYYY")}`}</td>)
            }
            else if(j===1)
            {
                children.push(<td key={`tdPrincipalBal${j+1}_${i+1}`}>
                    {`${this.state.item.OrderAmount}`}</td>)
            }
            else if(j===2)
            {
                if(i%(this.state.item.LoanTerms+2)===0 && i>=1){
                    // this.state.item.OrderAmount=this.state.item.OrderAmount+ this.state.item.LoanRenewalFee;
                // if(i>=this.state.item.LoanTerms){
                    let balance=this.calculate(this.state.item.OrderAmount, i-1,0,0, this.state.item.LoanRenewalFee);
                    let interest=(balance*(this.state.item.InterestRate/100)).toFixed(2);
                    this.state.newInterest = interest;
                    children.push(<td key={`tdInstrest${j+1}_${i+1}`}>X
                    {`${interest}`}</td>)

                }
                else if(i>0) 
                {
                    let interest=(this.calculate(this.state.item.OrderAmount, i-1,0,0,0)*this.state.item.InterestRate/100).toFixed(2);
                    let interest2=(this.calculate(this.state.item.OrderAmount, i+1,0,0,0)*this.state.item.InterestRate/100).toFixed(2);
                    this.state.newInterest = interest2;
                    children.push(<td key={`tdInstrest${j+1}_${i+1}`}>                
                    {`${interest}`}</td>)
                }
                else{
                    children.push(<td key={`tdInstrest${j+1}_${i+1}`}>
                        0.00
                    </td>)
                }
            }
            else if(j===3 && i%(this.state.item.LoanTerms+1)===0 && i>=1)
            {
                if(i>this.state.item.LoanTerms*this.state.item.LoanRenewalTimesLimit){
                    //children.push(<td key={`tdFee${j+1}_${i+1}`}>{this.state.item.LoanRenewalFee}</td>);
                }
                else{
                    children.push(<td key={`tdFee${j+1}_${i+1}`}>{this.state.item.LoanRenewalFee}</td>);
                }
            }
            else if(j===4)
            {
                if(i>this.state.item.LoanTerms){
                    //   this.state.activateRenewFee=true;
                    children.push(
                    <td key={`tdInstrestnFee${j+1}_${i+1}`}>
                        {
                        `${(this.calculate(this.state.item.OrderAmount, i, 0, 0,this.state.item.LoanRenewalFee)-this.state.item.OrderAmount).toFixed(2)}`
                        }
                    </td>)                  
                }
                else
                if(i%(this.state.item.LoanTerms)===0 && i>=1){
                // if(i>=this.state.item.LoanTerms){
                    children.push(<td key={`tdInstrestnFee${j+1}_${i+1}`}>
                    {`${(this.calculate(this.state.item.OrderAmount, i, 0, 0,this.state.item.LoanRenewalFee)-this.state.item.OrderAmount).toFixed(2)}`}</td>)
            }
                else{
                    children.push(<td key={`tdInstrestnFee${j+1}_${i+1}`}>
                        {`${(this.calculate(this.state.item.OrderAmount, i, 0, 0,this.state.item.LoanRenewalFee)-this.state.item.OrderAmount).toFixed(2)}`}</td>)
                }
            }
            else if(j===5)
            {
                if(i%(this.state.item.LoanTerms)===0 && i>=1){
                // if(i>=this.state.item.LoanTerms){
                    children.push(<td key={`tdBalance${j+1}_${i+1}`}>
                    {`${(this.calculate(this.state.item.OrderAmount, i,0,0,this.state.item.LoanRenewalFee))}`}
                    </td>)
                    
                    }
                else{
                    children.push(<td key={`tdBalance${j+1}_${i+1}`}>
                    {this.calculate(this.state.item.OrderAmount, i,0,0,this.state.item.LoanRenewalFee)}
                </td>)                    
                }
            }
            else if(j===6)
            {            
            children.push(<td key={`tdPayment${j+1}_${i+1}`}>
                0.00
            </td>)
            }
            else if(j===9)
            {            
            children.push(<td key={`tdIVA${j+1}_${i+1}`}>
                {/*((this.calculate(this.state.item.OrderAmount, i,0,0)-this.state.item.OrderAmount)*this.state.item.Iva/100).toFixed(2)*/}
            </td>)
            }
            else{
                children.push(<td key={`td${j+1}_${i+1}`}></td>)
            }
            //children.push(<td key={`td${j+1}_${i+1}`}>{`Column ${j + 1}`}</td>)
        }
        //Create the parent and add the children
        table.push(<tr key={`tr${i+1}`}>{children}</tr>)
        }
        return table
    }

}  

export default StatementTable;



function parseDate(str) {
    var mdy = str.split('/');
    return new Date(mdy[2], mdy[0]-1, mdy[1]);
}

function datediff(first, second) {
    // Take the difference between the dates and divide by milliseconds per day.
    // Round to nearest whole number to deal with DST.
    return Math.round((second-first)/(1000*60*60*24));
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