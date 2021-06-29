import React from 'react';
import { connect } from 'react-redux';
import {FormErrors} from './FormErros';
import Popup from "reactjs-popup";
import HourGlass from '../../../Common/hourGlass';
import {  Redirect} from 'react-router-dom';
import { previousStepAction, nextStepAction, saveValuesAction, customerAccountDataAction } from '../../../redux/actions/customerAccountDataActions'

 class CustomerAccount extends React.Component {
    constructor(props) {    
        super(props)
        this.state = {
            BankAccountNumber: this.props.formCustomerAccountData.BankAccountNumber,
            CURP: this.props.formCustomerAccountData.CURP,
            RFC: this.props.formCustomerAccountData.RFC,
            formErrors: {
                BankAccountNumber: '',
                CURP: '',
                RFC: '',
            },
      
            isBankAccountNumberValid: false,
            CURPValid: false,
            RFCValid: false,

            formValid: false,

            isFetching: false, 
            token: localStorage.getItem("RegistrationToken"),
            RegistrationToken: localStorage.getItem("RegistrationToken"),
      
        }

        this.previousStep = this.props.previousStep;
        this.nextStep = this.props.nextStep;
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.saveValues = this.saveValues.bind(this);
        this.nextStep = this.nextStep.bind(this)
        this.previousStep = this.previousStep.bind(this)
    
    }

    componentDidMount(){    
        if(this.props.formCustomerAccountData.from>0 && this.props.formCustomerAccountData.from>this.props.formCustomerAccountData.to)
        {
          this.setState({
            formValid:true,
            isBankAccountNumberValid: true,
            CURPValid: true,
            RFCValid: true,
          });
       }
    
      }

    onChange(e) {
    // (this.props);
    const name = e.target.name;
    const value = e.target.value;
    this.props.saveValues(name, value);
        this.setState({[name]: value},
            () => { this.validateField(name, value) });
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let isBankAccountNumberValid = this.state.isBankAccountNumberValid;
        let CURPValid = this.state.CURPValid;
        let RFCValid = this.state.RFCValid;
    
        switch(fieldName) {
          case 'BankAccountNumber':
              fieldValidationErrors.BankAccountNumber ='';
              isBankAccountNumberValid=true;
              if(value.trim()===''){
                fieldValidationErrors.BankAccountNumber = ' es requerido';
                isBankAccountNumberValid=false;
              }
          break;
          case 'CURP':
              fieldValidationErrors.CURP ='';
              if(value.trim()===''){
                fieldValidationErrors.CURP = ' es requerido';
                CURPValid=false;
              }
              else{
                // ("value = ", value.length);
                CURPValid = (value.trim().length <= 18 && value.trim().length >= 18);
                fieldValidationErrors.CURPValid = CURPValid ? '': ' es inválido';
              }
              this.setState({CURPValid})
          break;
          case 'RFC':
              fieldValidationErrors.RFC ='';
              if(value.trim()===''){
                fieldValidationErrors.RFC = ' es requerido';
                RFCValid=false;
              }
              else{
                // ("value = ", value.length);
                RFCValid = (value.trim().length <= 13 && value.trim().length >= 13);
                fieldValidationErrors.RFCValid = RFCValid ? '': ' es inválido';
              }
              this.setState({RFCValid})

          break;
    
          default:
          break;
        }
    
        if(this.state.token)
        {
          
          this.setState({formErrors: fieldValidationErrors,
            isBankAccountNumberValid: isBankAccountNumberValid,
            CURPValid,
            RFCValid, 
            }, this.validateForm);
        }
        
      }
    
      validateForm() {
        // ("this.state = ", this.state);
        if(this.state.token)
        {
          this.setState(
            {
              formValid: (this.state.isBankAccountNumberValid),
          });
        }
        this.props.saveValues("formValid", this.state.formValid);
        // ("formValid = ",this.state.formValid, this.props); 
      }
      errorClass(error) {
        return(error.length === 0 ? '' : 'error');
      }  
      displayErrorClass(error) {
        return(error.length === 0 ? 'error-message': 'error-message__visible');
      }  

      render() {
        if(localStorage.getItem("RegistrationToken")===null){
            return (
            <Redirect to='/customer/home' />
          ) 
          }
          if (this.props.formCustomerAccountData.loading) {
            return <div style={{textAlign: 'center'}}><HourGlass /></div>;
          }

        return (
          <div>
            <form id="formReg">
                <h2>Account Info</h2>
                <div className="row form-fields">
                <div className="col-md-6 col-lg-6 col-xl-4 col-sm-12 col-xs-12">
                  <label>Bank account number *
                    <Popup trigger={<i style={{color:'blue'}}> <b>?</b></i>} position="left bottom"
                        keepTooltipInside="#formReg" closeOnDocumentClick>
                        <div style={{backgroundColor: 'lightyellow',color: 'blue'}}>Clabe 18 digitos: 021180000118359717</div>
                    </Popup>
                  </label>
                    <input type="text" name="BankAccountNumber" placeholder="Bank Account Number" defaultValue={this.props.formCustomerAccountData.BankAccountNumber} 
                        autoComplete="on"
                      className={this.errorClass(this.state.formErrors.BankAccountNumber)}
                      onBlur={this.onChange}
                      onChange={this.onChange} />
                    <p className={this.displayErrorClass(this.state.formErrors.BankAccountNumber)}>
                      {this.displayError('BankAccountNumber')}
                    </p>
                </div>
                <div className="col-md-6 col-lg-6 col-xl-4 col-sm-12 col-xs-12">
                  <label>CURP *</label>
                    <input type="text" name="CURP" placeholder="CURP" defaultValue={this.props.formCustomerAccountData.CURP} 
                        autoComplete="on"
                      className={this.errorClass(this.state.formErrors.CURP)}
                      onBlur={this.onChange}
                      onChange={this.onChange} />
                    <p className={this.displayErrorClass(this.state.formErrors.CURP)}>
                      {this.displayError('CURP')}
                    </p>
                </div>
                <div className="col-md-6 col-lg-6 col-xl-4 col-sm-12 col-xs-12">
                  <label>RFC *</label>
                    <input type="text" name="RFC" placeholder="RFC" defaultValue={this.props.formCustomerAccountData.RFC} 
                        autoComplete="on"
                      className={this.errorClass(this.state.formErrors.RFC)}
                      onBlur={this.onChange}
                      onChange={this.onChange} />
                    <p className={this.displayErrorClass(this.state.formErrors.RFC)}>
                      {this.displayError('RFC')}
                    </p>
                </div>

            </div>

            <div className="row">
                  <div className="col-12 form-footer">
                    <div className="row">
                      <div className="col-12">
                        <button className="btn -default pull-left" type="button"
                          onClick={()=>{
                            this.props.saveValues("formValid", this.state.formValid);                  
                            this.props.previousStep();
                            }} >Back</button>
                        <button className="btn-normal pull-right" type="submit"
                          /* disabled={(!this.state.formValid)} */
                          onClick={this.handleSubmit}>
                            <span>

                            Save &amp; Continue
                            </span>
                          </button>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">          
                        <FormErrors formErrors={this.state.formErrors} />
                      </div>
                    </div>
                  </div>
                </div>

            </form>

          </div>
        )
      }

      displayError(field) {
        // (this.props.formErrors, ">>>>>>", this.state.formErrors[field]);
        //const { required, valid } = this.state.formErrors;
        let newFieldName=field;
        switch (field) {
          case "BankAccountNumber":
              newFieldName = "Bank Account Number or Clabe";
            break;
          case "CURP":
              newFieldName = "CURP";
            break;
          case "RFC":
              newFieldName = "RFC";
            break;
        
          default:
            break;
        }

        const errorMessage = `Field ${newFieldName} `;

        if (this.state.formErrors[field]) {
          return `${errorMessage} ${this.state.formErrors[field]}`;
        }

      
      }


      handleSubmit(event) {
        event.preventDefault();
        
        // ('SAQIB = ', this.props);  
        //()=>{
          this.props.saveValues("formValid", this.state.formValid);
          // ("this.props = ", this.state.formValid, this.props.form);
          var elements = document.getElementById("formReg").elements;
          var i=0;
          var element=elements[i];
          while(element) {
            if((element.type !== "email" && element.type !== "password" && element.type !== "submit")){
              this.validateField(element.name, element.value);
            }
            element = elements[i++];
          }

          if(!(this.state.formErrors.RFCValid ||
            this.state.formErrors.CURPValid ||
            this.state.formErrors.BankAccountNumber ||
            this.state.formErrors.RFC ||
            this.state.formErrors.CURP
          ))
          {
            this.setState({ submitted: true });
            const { data } = this.props.formCustomerAccountData;
            // ("THIS DATA CAN NOT BE UNDEFINED", data);
            this.props.customerAccountData(data)
            .then(()=>{
              this.props.saveValues("PendingStepNumber", 5);
              this.updateStepsProgress()
                      .then((res)=>{
                        this.nextStep();
                      })
            });
          }
          else{
            return;
          }
        // }


      }
  
      async updateStepsProgress(){
        return new Promise((resolve, reject) => {
    
          this.setState ({
            isFetching: true,
            fetchError: null,
          });
          // (this.state.totalAmountwithIva, this.props.form.ChosenAmount);
          const request = {
            RegistrationToken: localStorage.getItem("RegistrationToken"),
            PendingStepNumber: this.props.formCustomerAccountData.data.PendingStepNumber,
            ChosenAmount: this.props.formCustomerAccountData.data.ChosenAmount,
            ChosenDays: this.props.formCustomerAccountData.data.ChosenDays,
          };
        var config = require('../../../../Config/config.json');
        fetch(config.apiUrl + "updateStepsProgress", {
            method: 'PUT', 
            headers: {
                Accept: 'application/json', 
                'Content-Type': 'application/json', 
                //Authorization: this.props.token
            }, 
            body: JSON.stringify(request)
        })
        .then(response => response.json())
        .then(result => {
            //setTimeout(() => {
                
                if(result.error){
                  reject("FAILED to update");
                  throw new Error("Failed to update");
                }
                
                this.setState ({
                    isFetching: false,
                    fetchError: null,
                });
                //this.forceUpdate();
            //}, 3000);
            resolve(result);  
        })
        .catch(e => {
            // (e); 
            this.setState({
                isFetching: false, 
                fetchError: e.message,
            });
        });
        }
    
        )}

  // REDUX IMPLEMENTATION 
  nextStep() {
    // this.props.dispatch(nextStepAction())
    this.props.nextStepAction();
  }

  previousStep() {
    // this.props.dispatch(previousStepAction())
    this.props.previousStepAction();
  }
  
  registerWorkData(data) {
    ("this.customerAccountDataAction")
    //botho f the following  work
    // this.props.dispatch(registerWorkDataAction(data))
    this.props.customerAccountDataAction(data);
  }

  saveValues(key, value) {
    ("this.saveValues")
    //botho f the following  work
    // this.props.dispatch(saveValuesAction(key, value))
    this.props.saveValuesAction(key, value);
  }

}
function mapStateToProps(state) {
  return {
    formCustomerAccountData: {
      CustomerId: state.customerAccountData.CustomerId,
      BankAccountNumber: state.customerAccountData.BankAccountNumber,
      CURP: state.customerAccountData.CURP,
      RFC: state.customerAccountData.RFC,

      from:state.customerAccountData.from,
      to:state.customerAccountData.to,
      formValid: state.customerAccountData.formValid,
      data: state.customerAccountData,
      loading: state.customerAccountData.loading,
    }
  }
}

const mapDispatchToProps = {
    customerAccountData: customerAccountDataAction,
    saveValues: saveValuesAction,
    nextStep: nextStepAction,
    previousStep: previousStepAction,
  }
export default connect(mapStateToProps, mapDispatchToProps)(CustomerAccount)
