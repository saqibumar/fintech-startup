import React from 'react';
import { connect } from 'react-redux';
import {FormErrors} from './FormErros';
import Popup from "reactjs-popup";
import HourGlass from '../../../Common/hourGlass';
//import { registerWorkDataAction } from '../../../redux/actions/registrationActions'
import {  Redirect} from 'react-router-dom';
import { previousStepAction, nextStepAction, saveValuesAction, registerWorkDataAction } from '../../../redux/actions/registerWorkDataActions'


class WorkData extends React.Component {
  constructor(props) {    
    super(props)
    this.state = {
      CompanyName: this.props.formWorkData.CompanyName || '',
      WorkingPeriod: this.props.formWorkData.WorkingPeriod || '',
      WorkPhone: this.props.formWorkData.WorkPhone || '',
      Salary: this.props.formWorkData.Salary || '',
      PaymentFrequency: this.props.formWorkData.PaymentFrequency || '',
      formErrors: {
        CompanyName: '',
        WorkingPeriod: '',
        WorkPhone: '',
        Salary: '',
        PaymentFrequency: '',
      },

      isCompanyNameValid: false,
      workPhoneValid: false,
      workingPeriodValid: false,
      salaryValid: false,
      paymentFrequencyValid: false, 

      CustomerReferences:{
        rfirstName: this.props.formWorkData.CustomerReferences.rfirstName,
        rmiddleName: this.props.formWorkData.CustomerReferences.rmiddleName,
        rlastName: this.props.formWorkData.CustomerReferences.rlastName,
        rphone: this.props.formWorkData.CustomerReferences.rphone,
        relationship: this.props.formWorkData.CustomerReferences.relationship,
        formErrors: {
          rfirstName:'', 
          rlastName: '', 
          rphone:'', 
          relationship:'',
        },
        firstNameValid: false,
        lastNameValid: false,
        phoneValid: false,
        relationshipValid: false,
      },

      formValid: false,

      isFetching: false, 
      token: localStorage.getItem("RegistrationToken"),
      RegistrationToken: localStorage.getItem("RegistrationToken"),
    };

    this.previousStep = this.props.previousStep;
    this.nextStep = this.props.nextStep;
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.registerWorkData = this.props.registerWorkData.bind(this);
    // this.registerWorkData = this.registerWorkData.bind(this);
    this.saveValues = this.saveValues.bind(this);
    this.nextStep = this.nextStep.bind(this)
    this.previousStep = this.previousStep.bind(this)



  }


  componentDidMount(){    
    if(this.props.formWorkData.from>0 && this.props.formWorkData.from>this.props.formWorkData.to)
    {
      this.setState({
        formValid:true,
        isCompanyNameValid: true,
        workPhoneValid: true,
        workingPeriodValid: true,
        salaryValid: true,
        paymentFrequencyValid: true,
      });
   }

  }

    numericOnly(event){  
        let value = event.target.value;
        if(isNaN(value.trim())){
            // event.target.value=value.substring(0, value.length-1);
            value = value.replace(/\D/g,'');
            event.target.value=value;
        }
    }

    textOnly(event){  
        let value = event.target.value;
        let regex = /^[a-zA-Z]+$/;
        // ("isValid is null? ", regex.test(value.trim()));
        if(!isNaN(value.trim()) || !regex.test(value.trim())){
            event.target.value=value.substring(0, value.length-1);
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
    let isCompanyNameValid = this.state.isCompanyNameValid;
    let workPhoneValid = this.state.WorkPhone;
    let workingPeriodValid = this.state.WorkingPeriod;
    let salaryValid = this.state.Salary;
    let paymentFrequencyValid = this.state.PaymentFrequency;

    let referencesValidationErrors = this.state.CustomerReferences.formErrors;
    let firstNameValid = this.state.CustomerReferences.firstNameValid;
    let lastNameValid = this.state.CustomerReferences.lastNameValid;
    let phoneValid = this.state.CustomerReferences.phoneValid;
    let relationshipValid = this.state.CustomerReferences.relationshipValid;

    switch(fieldName) {
      case 'CompanyName':
          fieldValidationErrors.CompanyName ='';
          isCompanyNameValid=true;
          if(value.trim()===''){
            fieldValidationErrors.CompanyName = ' es requerido';
            isCompanyNameValid=false;
          }
      break;
      case 'WorkPhone':
          fieldValidationErrors.WorkPhone ='';
          if(value.trim()===''){
            fieldValidationErrors.WorkPhone = ' es requerido';
            workPhoneValid=false;
          }
          else{
            // ("value = ", value.length);
            workPhoneValid = (value.trim().length <= 10 && value.trim().length >= 10);
            fieldValidationErrors.workPhoneValid = workPhoneValid ? '': ' es inválido';
          }
          this.setState({workPhoneValid})
      break;
      case 'WorkingPeriod':
          fieldValidationErrors.WorkingPeriod ='';
          if(value.trim()===''){
            fieldValidationErrors.WorkingPeriod = ' es requerido';
            workingPeriodValid=false;
          }
      break;
      case 'Salary':
          fieldValidationErrors.Salary ='';
          if(value.trim()===''){
            fieldValidationErrors.Salary = ' es requerido';
            salaryValid=false;
          }
      break;
      case 'PaymentFrequency':
          fieldValidationErrors.PaymentFrequency ='';
          if(value.trim()===''){
            fieldValidationErrors.PaymentFrequency = ' es requerido';
            paymentFrequencyValid=false;
          }
      break;
//references form starts here
      case 'rfirstName':
        if(value.trim()===''){
          firstNameValid=false;
          referencesValidationErrors.rfirstName = firstNameValid ? '': ' es requerido';
        }
        else{
          firstNameValid = value.trim().length >= 1;
          referencesValidationErrors.rfirstName = firstNameValid ? '': ' is too short';
        }
        this.setState({firstNameValid: firstNameValid});
          break;

      case 'rlastName':
        if(value.trim()===''){
          lastNameValid=false;
          referencesValidationErrors.rlastName = lastNameValid ? '': ' es requerido';
        }
        else{
          lastNameValid = value.trim().length >= 1;
          referencesValidationErrors.rlastName = lastNameValid ? '': ' is too short';
        }
        this.setState({lastNameValid: lastNameValid})
      break;
      case 'rphone':
        if(value.trim()===''){
          phoneValid = false;
          referencesValidationErrors.rphone = phoneValid ? '': ' es requerido';
        }
        else{
          // ("value = ", value.length);
          phoneValid = (value.trim().length <= 10 && value.trim().length >= 10);
          referencesValidationErrors.rphone = phoneValid ? '': ' es inválido';
        }
        this.setState({phoneValid: phoneValid})
      break;
      case 'relationship':
        if(value.trim()===''){
          relationshipValid = false;
          referencesValidationErrors.relationship = relationshipValid ? '': ' es requerido';
        }
        else{
          // ("value = ", value.length);
          relationshipValid = (value.trim().length > 0);
          referencesValidationErrors.relationship = relationshipValid ? '': ' es inválido';
        }
        this.setState({relationshipValid: relationshipValid})
      break;

      default:
      break;
    }

    if(this.state.token)
    {
      
      this.setState({formErrors: fieldValidationErrors,
        isCompanyNameValid: isCompanyNameValid,
        workPhoneValid,
        workingPeriodValid,
        salaryValid,
        paymentFrequencyValid,   
        }, this.validateForm);

        this.setState({referencesValidationErrors,
          firstNameValid,
          lastNameValid,
          phoneValid,
          relationshipValid,
          }, this.validateForm);
    }
    
  }

  validateForm() {
    // ("this.state = ", this.state);
    if(this.state.token)
    {
      this.setState(
        {
          formValid: (this.state.isCompanyNameValid) &&
          (this.state.CustomerReferences.rfirstName && this.state.CustomerReferences.rfirstName.trim() && this.state.CustomerReferences.firstNameValid) && 
          (this.state.CustomerReferences.rlastName && this.state.CustomerReferences.rlastName.trim() && this.state.CustomerReferences.lastNameValid) && 
          (this.state.CustomerReferences.rphone && this.state.CustomerReferences.rphone.trim() && this.state.CustomerReferences.phoneValid) &&
          (this.state.CustomerReferences.relationship && this.state.CustomerReferences.relationship.trim() && this.state.CustomerReferences.relationshipValid),
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
    // const loggedinUser = this.state.token;

    if(localStorage.getItem("RegistrationToken")===null){
      return (
       <Redirect to='/customer/home' />
     ) 
    }
    if (this.props.formWorkData.loading) {
      return <div style={{textAlign: 'center'}}><HourGlass /></div>;
    }

    return (
      <div>
        <form id="formReg">
          <h2>Employment Work Info</h2>
          <div className="row form-fields">
            <div className="col-md-6 col-lg-6 col-xl-4 col-sm-12 col-xs-12">
              <label>Company Name *</label>
                <input type="text" name="CompanyName" placeholder="Company Name" defaultValue={this.props.formWorkData.CompanyName} 
                    autoComplete="on"
                  className={this.errorClass(this.state.formErrors.CompanyName)}
                  onBlur={this.onChange}
                  onChange={this.onChange} />
                <p className={this.displayErrorClass(this.state.formErrors.CompanyName)}>
                  {this.displayError('CompanyName')}
                </p>
            </div>
            <div className="col-md-6 col-lg-6 col-xl-4 col-sm-12 col-xs-12">
              <label>Salary *</label>
                <input type="text" name="Salary" placeholder="Salary" defaultValue={this.props.formWorkData.Salary} 
                    autoComplete="on"
                  className={this.errorClass(this.state.formErrors.Salary)}
                  onBlur={this.onChange}
                  onChange={this.onChange} />
                <p className={this.displayErrorClass(this.state.formErrors.Salary)}>
                  {this.displayError('Salary')}
                </p>
            </div>             
            <div className="col-md-6 col-lg-6 col-xl-4 col-sm-12 col-xs-12">
              <label>Payment Frequency *</label>
                <select onChange={this.onChange}
                  defaultValue={this.props.formWorkData.PaymentFrequency===''?"Biweekly":this.props.formWorkData.PaymentFrequency} name="PaymentFrequency">
                  <option value="Weekly">Weekly</option>
                  <option value="Biweekly">Biweekly</option>
                  <option value="Monthly">Monthly</option>
                </select>
                <input type="hidden" name="PaymentFrequency2" placeholder="Payment Frequency" defaultValue={this.props.formWorkData.PaymentFrequency} 
                    autoComplete="on"
                  className={this.errorClass(this.state.formErrors.PaymentFrequency)}
                  onBlur={this.onChange}
                  onChange={this.onChange} />
                <p className={this.displayErrorClass(this.state.formErrors.PaymentFrequency)}>
                  {this.displayError('PaymentFrequency')}
                </p>
            </div>             

            <div className="col-md-6 col-lg-6 col-xl-4 col-sm-12 col-xs-12">
              <label>Working Period *</label>
                <input type="text" name="WorkingPeriod" placeholder="Working Period" defaultValue={this.props.formWorkData.WorkingPeriod} 
                    autoComplete="on"
                  className={this.errorClass(this.state.formErrors.WorkingPeriod)}
                  onBlur={this.onChange}
                  onChange={this.onChange} />
                <p className={this.displayErrorClass(this.state.formErrors.WorkingPeriod)}>
                  {this.displayError('WorkingPeriod')}
                </p>
            </div>            
            <div className="col-md-6 col-lg-6 col-xl-4 col-sm-12 col-xs-12">
              <label>Work Phone *
              <Popup trigger={<i style={{color:'blue'}}> ?</i>} position="left bottom"
                keepTooltipInside="#formReg" closeOnDocumentClick>
                <div style={{backgroundColor: 'lightyellow',color: 'blue'}}>Phone format: xxxxxxxxxx</div>
              </Popup>
              </label>
              <input name="WorkPhone" placeholder="Work Phone number" defaultValue={this.props.formWorkData.WorkPhone} 
              required autoComplete="on" type="text" maxLength="10"
              className={this.errorClass(this.state.formErrors.WorkPhone)}
              onBlur={this.onChange} 
              onInput={this.numericOnly}
              onChange={this.onChange} />
              <p className={this.displayErrorClass(this.state.formErrors.WorkPhone)}>
                {this.displayError('WorkPhone')}
              </p>
            </div>        

          </div>
          <hr/>
          <h2>References</h2>
          <div className="row form-fields">
            <div className="col-md-6 col-lg-6 col-xl-4 col-sm-12 col-xs-12">
                <label>First Name *</label>
                <input name="rfirstName" placeholder="First Name" defaultValue={this.props.formWorkData.CustomerReferences.rfirstName} 
                required autoComplete="on"
                className={this.errorClass(this.state.CustomerReferences.formErrors.rfirstName)}
                onBlur={this.onChange}
                onInput={this.textOnly}
                onChange={this.onChange} />
                <p className={this.displayErrorClass(this.state.CustomerReferences.formErrors.rfirstName)}>
                  {this.displayError('rfirstName')}
                </p>
              </div>
             <div className="col-md-6 col-lg-6 col-xl-4 col-sm-12 col-xs-12">
              <label>Middle Name</label>
              <input name="rmiddleName" placeholder="Middle Name" defaultValue={this.props.formWorkData.CustomerReferences.rmiddleName} 
              autoComplete="on"
              onBlur={this.onChange}
              onInput={this.textOnly}
              onChange={this.onChange} />
            </div>
            <div className="col-md-6 col-lg-6 col-xl-4 col-sm-12 col-xs-12">
              <label>Last Name *</label>
              <input name="rlastName" placeholder="Last Name" defaultValue={this.props.formWorkData.CustomerReferences.rlastName} 
              required autoComplete="on"
              className={this.errorClass(this.state.CustomerReferences.formErrors.rlastName)}
              onBlur={this.onChange}
              onInput={this.textOnly}
              onChange={this.onChange} />
              <p className={this.displayErrorClass(this.state.CustomerReferences.formErrors.rlastName)}>
                {this.displayError('rlastName')}
              </p>
            </div>
            <div className="col-md-6 col-lg-6 col-xl-4 col-sm-12 col-xs-12" id="rphone">
              <label>Mobile Phone *
              <Popup trigger={<i style={{color:'blue'}}> ?</i>} position="left bottom"
                keepTooltipInside="#formReg" closeOnDocumentClick>
                <div style={{backgroundColor: 'lightyellow',color: 'blue'}}>Phone format: xxxxxxxxxx</div>
              </Popup>
              </label>
              <input name="rphone" placeholder="Mobile phone number" defaultValue={this.props.formWorkData.CustomerReferences.rphone} 
              required autoComplete="on" type="text" maxLength="10"
              className={this.errorClass(this.state.CustomerReferences.formErrors.rphone)}
              onBlur={this.onChange} 
              onInput={this.numericOnly}
              onChange={this.onChange} />
              <p className={this.displayErrorClass(this.state.CustomerReferences.formErrors.rphone)}>
                {this.displayError('rphone')}
              </p>
            </div> 
            <div className="col-md-6 col-lg-6 col-xl-4 col-sm-12 col-xs-12" id="rphone">
              <label>Relationship *
              
              </label>
              <input name="relationship" placeholder="Your relationship with the person" defaultValue={this.props.formWorkData.CustomerReferences.relationship} 
              required autoComplete="on" type="text" 
              className={this.errorClass(this.state.CustomerReferences.formErrors.relationship)}
              onBlur={this.onChange} 
              onChange={this.onChange} />
              <p className={this.displayErrorClass(this.state.CustomerReferences.formErrors.relationship)}>
                {this.displayError('relationship')}
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
                        <span>Save &amp; Continue</span>
                      </button>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">          
                    {/* <FormErrors formErrors={this.state.formErrors} /> */}
                    <FormErrors formErrors={this.state.CustomerReferences.formErrors} />
                  </div>
                </div>
              </div>
            </div>
        </form>
      </div>    )
  }
  
  displayError(field) {
    // (this.props.formErrors, ">>>>>>", this.state.formErrors[field]);
    //const { required, valid } = this.state.formErrors;
    let newFieldName=field;
    switch (field) {
      case "CompanyName":
          newFieldName = "Company Name";
        break;
      case "PaymentFrequency":
          newFieldName = "Payment Frequency";
        break;
      case "WorkingPeriod":
          newFieldName = "Working Period";
        break;
      case "WorkPhone":
          newFieldName = "Work Phone";
      break;
      case "rfirstName":
          newFieldName = "First Name";
      break;
      case "rlastName":
          newFieldName = "Last Name";
      break;
      case "rphone":
        newFieldName = "Phone number";
      break;
      case "relationship":
        newFieldName = "Relationship";
      break;
    
      default:
        break;
    }

    const errorMessage = `Field ${newFieldName} `;

    if (this.state.formErrors[field]) {
      return `${errorMessage} ${this.state.formErrors[field]}`;
    }
    else if (this.state.CustomerReferences.formErrors[field]) {
      return `${errorMessage} ${this.state.CustomerReferences.formErrors[field]}`;
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
        if(/* !this.props.formWorkData.formValid && this.state.token && */ (element.type !== "email" && element.type !== "password" && element.type !== "submit")){
          this.validateField(element.name, element.value);
        }
        element = elements[i++];
      }

      /* for (var i = 0, element; element = elements[i++];) {
        if(!this.props.formWorkData.formValid && this.state.token && (element.type !== "email" && element.type !== "password" && element.type !== "submit")){
          this.validateField(element.name, element.value);
        }                          
      } */
      //if(this.state.formValid)
      if(!(this.state.formErrors.CompanyName || 
        this.state.formErrors.PaymentFrequency || 
        this.state.formErrors.Salary ||
        this.state.formErrors.WorkPhone ||
        this.state.formErrors.WorkingPeriod ||
        this.state.CustomerReferences.formErrors.rfirstName ||
        this.state.CustomerReferences.formErrors.rlastName ||
        this.state.CustomerReferences.formErrors.rphone ||
        this.state.CustomerReferences.formErrors.relationship
      ))
      {
        this.setState({ submitted: true });
        const { data } = this.props.formWorkData;
        // ("THIS DATA CAN NOT BE UNDEFINED", data);
        this.props.registerWorkData(data)
        .then(()=>{
          this.props.saveValues("PendingStepNumber", 4);
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
  
  /* nextStep(e) {
    e.preventDefault()
    this.props.nextStep()
  } */
  async updateStepsProgress(){
    return new Promise((resolve, reject) => {

      this.setState ({
        isFetching: true,
        fetchError: null,
      });
      // (this.state.totalAmountwithIva, this.props.form.ChosenAmount);
      const request = {
        RegistrationToken: localStorage.getItem("RegistrationToken"),
        PendingStepNumber: this.props.formWorkData.data.PendingStepNumber,
        ChosenAmount: this.props.formWorkData.data.ChosenAmount,
        ChosenDays: this.props.formWorkData.data.ChosenDays,
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
    //botho f the following  work
    // this.props.dispatch(registerWorkDataAction(data))
    this.props.registerWorkDataAction(data);
  }

  saveValues(key, value) {
    //botho f the following  work
    // this.props.dispatch(saveValuesAction(key, value))
    this.props.saveValuesAction(key, value);
  }


}

const mapDispatchToProps = {
  registerWorkData: registerWorkDataAction,
  saveValues: saveValuesAction,
  nextStep: nextStepAction,
  previousStep: previousStepAction,
}


function mapStateToProps(state) {
  return {
    formWorkData: {
      CustomerId: state.registrationWorkData.CustomerId,
      CompanyName: state.registrationWorkData.CompanyName, 
      WorkingPeriod: state.registrationWorkData.WorkingPeriod, 
      WorkPhone: state.registrationWorkData.WorkPhone, 
      Salary: state.registrationWorkData.Salary, 
      PaymentFrequency: state.registrationWorkData.PaymentFrequency, 
      
      from:state.registrationWorkData.from,
      to:state.registrationWorkData.to,
      formValid: state.registrationWorkData.formValid,
      data: state.registrationWorkData,
      loading: state.registrationWorkData.loading,

      CustomerReferences:{
        rfirstName: state.registrationWorkData.rfirstName,
        rmiddleName: state.registrationWorkData.rmiddleName,
        rlastName: state.registrationWorkData.rlastName,
        rphone: state.registrationWorkData.rphone,

        /* rfirstName: state.registrationWorkData.rfirstName,
        rmiddleName: state.registrationWorkData.rmiddleName,
        rlastName: state.registrationWorkData.rlastName,
        rphone: state.registrationWorkData.rphone, */
        relationship: state.registrationWorkData.relationship,
      }

    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkData)
