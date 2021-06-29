import React from 'react';
import { connect } from 'react-redux';
import { customerOrderActions } from '../../../redux/actions/customerOrderActions'
import HourGlass from '../../../Common/hourGlass';
import {  Redirect} from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

class Confirmation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
      OrderAmount: this.props.customerOrderData.OrderAmount, 
      OrderStatus: this.props.customerOrderData.OrderStatus, 
      OrderDateTime: this.props.customerOrderData.OrderDateTime, 
      OrderTerm: this.props.customerOrderData.OrderTerm, 

      formValid: false,

      isFetching: false, 
      token: localStorage.getItem("RegistrationToken"),
      RegistrationToken: localStorage.getItem("RegistrationToken"),

    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.saveValues = this.saveValues.bind(this);
  }
  
  customerOrderData(data) {
    //botho f the following  work
    // this.props.dispatch(registerWorkDataAction(data))
    this.props.customerOrderActions(data);
  }

  saveValues(key, value) {
    //botho f the following  work
    // this.props.dispatch(saveValuesAction(key, value))
    this.props.saveValuesAction(key, value);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { data } = this.props.customerOrderData;
    this.props.customerOrder(data)
    .then(result => {
      if(!result){
        toast.error("Operation Failed");
      }
      else{
        this.props.nextStep()
      }
    })

  }

  componentDidMount(){
    this.props.saveValues("OrderAmount", this.props.allProps.allState.form.ChosenAmount);
    this.props.saveValues("OrderStatus", "New");
    this.props.saveValues("OrderDateTime", Date.now());
    this.props.saveValues("OrderTerm", this.props.allProps.allState.form.ChosenDays);
  }

  render() {
    if(localStorage.getItem("RegistrationToken")===null){
      return (
       <Redirect to='/customer/home' />
     ) 
    }
    if (this.props.customerOrderData.loading) {
      return <div style={{textAlign: 'center'}}><HourGlass /></div>;
    }
    return (
      <div>
        <ToastContainer />
        <h2>Confirm Registration</h2>
        {/* <ul>
          <li><b>Name:</b> {this.props.form.name} {this.props.form.middleName} {this.props.form.lastName}</li>
          <li><b>Phone:</b> {this.props.form.phone}</li>
          <li><b>Email:</b> {this.props.form.email}</li>
          <li><b>Age:</b> {this.props.form.age}</li>     
          
        </ul> */}
        <ul>
        {
                Object.entries(this.props.allProps.allState.form).filter(item=>{
                  // ("ITEM = ",item[0])
                  var filteredBy = item[0] !== "formValid" && item[0] !== "step" && item[0] !== "from" && item[0] !== "to"
                  && item[0] !== "loading" && item[0] !== "deviceInfo" && item[0] !== "json" && item[0] !== "isFinishedUploading"
                  && item[0] !== "CustomerId" && item[0] !== "didAgree" && item[0] !== "CustomerContactId" 
                  && item[0] !== "loanAmount" && item[0] !== "loanPeriod" && item[0] !== "OrderDateTime" && item[0] !== "OrderStatus" 
                  && item[0] !== "PendingStepNumber" && item[0] !== "ChosenAmount" && item[0] !== "ChosenDays" 
                  return filteredBy
                }).map(([key,value])=>{
                  /* ("KEY = ", key);
                  ("value = ", value); */
                  if(key && value){
                    key = this.renameKey(key);
                    
                    return (
                      <li key={"lis_"+key}>
                        <div key={"div_"+key} className="col"><strong>{key} : </strong>{value.toString()}</div>
                      </li>
                    );
                  }
                  else
                    return <></>
                  })
              }
        </ul>

        <ul className="form-fields">
          <li className="form-footer">
            <button className="btn -default pull-left" onClick={this.props.previousStep}>Back</button>
            <button className="btn -primary pull-right" 
            onClick={this.handleSubmit}
            /* onClick={this.props.nextStep} */>Review &amp; Submit Registration</button>
          </li>
        </ul>
      </div>
    )
  }

  renameKey(key){
    switch (key) {
      case "name":
        key = "First Name";
        break;
      case "middleName":
        key = "Middle Name";
        break;
      case "lastName":
        key = "Last Name";
        break;
      case "email":
        key = "Email Address";
        break;
      case "phone":
        key = "Phone";
        break;
      case "gender":
        key = "Gender";
        break;
      case "PaymentFrequency":
        key = "Payment Frequency";
        break;
      case "rfirstName":
        key = "Referene First Name";
        break;
      case "rmiddleName":
        key = "Referene Middle Name";
        break;
      case "rlastName":
        key = "Referene Last Name";
        break;
      case "relationship":
        key = "Relationship with provided reference";
        break;
      case "rphone":
        key = "Reference Phone";
        break;
      case "BankAccountNumber":
        key = "Bank Account Number";
        break;
      case "OrderAmount":
        key = "Loan Order Amount (MXN)";
        break;
      case "OrderTerm":
        key = "Order Term (days)";
        break;
      default:
        break;
    }
    return key;
  }
}
const mapDispatchToProps = {
  customerOrder: customerOrderActions
}

function mapStateToProps(state) {
  return {
    allProps:{
      allState: state
    },
    form: {
      name: state.form.name,
      middleName: state.form.middleName,
      lastName: state.form.lastName,
      phone: state.form.phone,
      password: state.form.password,
      email: state.form.email,
      age: state.form.age
    },
    customerOrderData: {
      OrderAmount: state.customerOrder.OrderAmount, 
      OrderStatus: state.customerOrder.OrderStatus, 
      OrderDateTime: state.customerOrder.OrderDateTime, 
      OrderTerm: state.customerOrder.OrderTerm,
      data: state.customerOrder,
      loading: state.customerOrder.loading,
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Confirmation)
