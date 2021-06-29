import React, { Component } from 'react';
import LoanCalculator from './LoanCalculator';
import PersonalInfo from './PersonalInfo'
import WorkData from './WorkData'

// import AccountFields from './AccountFields'
import Confirmation from './Confirmation'
import Success from './Success'
// import SurveyFields from './SurveyFields'
import Agreement from './Agreement';
import { connect } from 'react-redux';
import { previousStepAction, nextStepAction, saveValuesAction, 
  registerAction, 
  getPersonalInfo} 
  from '../../../redux/actions/registrationActions';

  /* import { registerWorkDataAction } 
    from '../../../redux/actions/registerWorkDataActions'; */
  
import './style.scss';
import ProgressBar from 'react-bootstrap/ProgressBar'
import UploadDocs from './UploadDocs';
import CustomerAccount from './CustomerAccount';

const fieldValues = {
  name: null,
  email: null,
  password: null,
  age: null,
}

class Main extends Component {

  constructor(props) {

    super(props)
    this.state = {
      value: '',
      ChosenAmount: this.props.form.ChosenAmount,
      ChosenDays: this.props.form.ChosenDays,
    };
    
    this.nextStep = this.nextStep.bind(this)
    this.previousStep = this.previousStep.bind(this)
    this.saveValues = this.saveValues.bind(this)
    //Todo move below to PersonalInfo component
    this.register = this.register.bind(this);
    this.getPersonalInfo = this.getPersonalInfo.bind(this);
  }

  componentDidMount(){
    this.getPersonalInfo();
  }

  nextStep() {
    this.props.dispatch(nextStepAction())
  }

  previousStep() {
    this.props.dispatch(previousStepAction())
  }

  saveValues(key, value) {
    this.props.dispatch(saveValuesAction(key, value))
  }

  register(data) {
    // ("dispatching registerAction...")
    this.props.dispatch(registerAction(data))
  }

  getPersonalInfo() {
    this.props.dispatch(getPersonalInfo())
    .then((result) => {
      if(result && result.length>0){
        this.saveValues("PendingStepNumber", result[0].PendingStepNumber);
        this.saveValues("ChosenAmount", result[0].ChosenAmount);
        this.saveValues("ChosenDays", result[0].ChosenDays);

        this.saveValues("name", result[0].FirstName || '');
        this.saveValues("middleName", result[0].MiddleName || '')
        this.saveValues("lastName", result[0].LastName || '')
        this.saveValues("phone", result[0].MobilePhone)
        this.saveValues("password", result[0].password)
        this.saveValues("email", result[0].Email)
        this.saveValues("gender", result[0].Gender)

        this.saveValues("City", result[0].City);
        this.saveValues("Colony", result[0].Colony);
        this.saveValues("Country", result[0].Country);
        this.saveValues("CustomerId", result[0].CustomerId);
        this.saveValues("ExteriorNumber", result[0].ExteriorNumber || '');
        this.saveValues("FixedPhone", result[0].FixedPhone);
        this.saveValues("InteriorNumber", result[0].InteriorNumber);
        this.saveValues("MobilePhone", result[0].MobilePhone);
        this.saveValues("State", result[0].State);
        this.saveValues("Street", result[0].Street);
        this.saveValues("Town", result[0].Town);
        this.saveValues("Zip", result[0].Zip);

        this.saveValues("CompanyName", result[0].CompanyName)
        this.saveValues("WorkingPeriod", result[0].WorkingPeriod)
        this.saveValues("WorkPhone", result[0].WorkPhone)
        this.saveValues("Salary", result[0].Salary)
        this.saveValues("PaymentFrequency", result[0].PaymentFrequency)

        this.saveValues("rfirstName", result[0].rFirstName);
        this.saveValues("rmiddleName", result[0].rMiddleName);
        this.saveValues("rlastName", result[0].rLastName);
        this.saveValues("relationship", result[0].Relationship);
        this.saveValues("rphone", result[0].TelephoneNumber);

        this.saveValues("RFC", result[0].RFC);
        this.saveValues("CURP", result[0].CURP);
        this.saveValues("BankAccountNumber", result[0].BankAccountNumber);

        if(result[0].PendingStepNumber>0){
          for(var i=0;i<result[0].PendingStepNumber-1;i++){
            this.nextStep();
          }
        }
      }
    });
  }
  
  showStep() {
    switch (this.props.form.step) {

      case 1:
        return <LoanCalculator fieldValues={fieldValues} nextStep={this.nextStep} 
                saveValues={this.saveValues} />
      case 2:
        return <PersonalInfo fieldValues={fieldValues} nextStep={this.nextStep} 
                previousStep={this.previousStep} saveValues={this.saveValues} />
      case 3:
        return <WorkData fieldValues={fieldValues} nextStep={this.nextStep} 
                previousStep={this.previousStep} saveValues={this.saveValues} />
      case 4:
        return <CustomerAccount fieldValues={fieldValues} nextStep={this.nextStep} 
                saveValues={this.saveValues} />          
      case 5:
        return <UploadDocs fieldValues={fieldValues} nextStep={this.nextStep} 
                saveValues={this.saveValues} />          
      case 6:
        return <Confirmation fieldValues={fieldValues} nextStep={this.nextStep} 
                previousStep={this.previousStep} saveValues={this.saveValues} />
      case 7:
        return <Agreement fieldValues={fieldValues} /* register={this.register} */
                nextStep={this.nextStep} 
                previousStep={this.previousStep} saveValues={this.saveValues} />
      case 8:
        return <Success />
      default:
        break;
    }
  }

  
  render() {
    let totalSteps = 8;
    let percentage = (this.props.form.step*100)/totalSteps;
    return (
      <main>
        <span className="progress-step">Step {this.props.form.step} / {totalSteps}
         {/* renderSteps() */}
        </span>
        <ProgressBar striped now={percentage} label={`${percentage.toFixed(0)}%`} />
        {this.showStep()}
      </main>
    )
  }

}


function mapStateToProps(state) {

  return {
    form: {
      step: state.form.step,
      /* loanAmount:state.form.loanAmount,
      loanPeriod:state.form.loanPeriod,
      loanWithIva:state.form.loanWithIva, */
      ChosenAmount: state.form.ChosenAmount,
      ChosenDays: state.form.loanPeriod,

    }

  }

}
export default connect(mapStateToProps)(Main)