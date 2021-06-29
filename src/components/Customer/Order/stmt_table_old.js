import React from 'react';
import Header from '../../Header/header';
import HourGlass from '../../Common/hourGlass';
import Moment from 'react-moment';
import moment from 'moment';
import './style.css';

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
        remainingDays:0,
        balanceAmount:0,
        
        activateRenewFee:false,
        newStartBalance:0,
      }
    }

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

        return((A).toFixed(2))
      
      }

    componentDidMount(){
        let item = this.state.item;
        let numberOfDays;
        item.OrderDateTime)
        var day = moment(item.OrderDateTime).format("MM/DD/YYYY");
        var dayNow = moment(Date()).format("MM/DD/YYYY");
        dayNow)
        numberOfDays = datediff(parseDate(day), parseDate(dayNow));
        numberOfDays);
        this.setState({
            numberOfDays
        })
    }

    render(){
        if (this.state.isFetching === true) 
        {
            return <div><HourGlass /></div>;
        }
        
        return(
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        {/* <Moment fromNow>{this.state.item.OrderDateTime}</Moment> */}
                        Number of days since loan = {this.state.numberOfDays}<br/>
                        OrderTerm = {this.state.item.OrderTerm}<br/>
                        OrderAmount = {this.state.item.OrderAmount}<br/>
                        <table style={{border:'1px solid silver',width:'100%'}} className="table customers">
                        <thead>
                            <tr>
                                <th scope="col">
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
                                <th scope="col">
                                TOTAL Intrest and Fees Balance
                                </th>
                                <th scope="col">
                                Due BALANCE
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
                                    {this.state.item.Iva}% IVA
                                </th>
                                <th scope="col">
                                TOTAL PAYMENT
                                </th>
                                <th scope="col">
                                OUTSTANDING BALANCE AFTER PAYMENT
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.createTable(this.state.numberOfDays)
                            // this.createTable(this.state.item.OrderTerm+1)
                            
                            }
                        </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )

    }


    createTable = (numberOfDays) => {
        let table = []
    
        // Outer loop to create parent
        for (let i = 0; i < numberOfDays; i++) {
        let children = []
        if(i>this.state.item.LoanTerms){
            this.state.activateRenewFee=true;
            
        }
        //Inner loop to create children
        for (let j = 0; j < 12; j++) {
            if(j===0)
            {
                children.push(<td key={`tdDay${j+1}_${i+1}`}>
                    {`${i+1}-${moment(this.state.item.OrderDateTime).add(i,"day").format("MM/DD/YYYY")}`}</td>)
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
                    children.push(<td key={`tdInstrest${j+1}_${i+1}`}>
                    {`${interest}`}</td>)

                }
                else if(i>0) 
                {
                children.push(<td key={`tdInstrest${j+1}_${i+1}`}>
                    {`${(this.calculate(this.state.item.OrderAmount, i-1,0,0,0)*this.state.item.InterestRate/100).toFixed(2)}`}</td>)
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