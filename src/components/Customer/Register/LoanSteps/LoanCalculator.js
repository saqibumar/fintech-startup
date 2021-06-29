import React from 'react';
import { connect } from 'react-redux';
import InputRange from 'react-input-range';
import HourGlass from '../../../Common/hourGlass.js';

class LoanCalculator extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
        formValid: true,
        isFetching: false, 
        fetchError: null,
        asOf: new Date(),
        value: this.props.form.loanAmount,
        days:this.props.form.loanPeriod,
        displaySteps:false,
        totalAmountwithIva:0,
        totalDays:0,

        loanAmount: this.props.form.loanAmount,
        loanPeriod:this.props.form.loanPeriod,
        loanWithIva:this.props.form.loanWithIva,

        ChosenAmount: this.props.form.ChosenAmount,
        ChosenDays: this.props.form.ChosenDays,
        PendingStepNumber: this.props.form.PendingStepNumber,

        Salary: this.props.form.Salary,

        formErrors: {          
          Salary: '',          
        },
        salaryValid:false,
  
        maxValue:10000,
        minValue:100,
    };

    this.nextStep = this.props.nextStep;
    this.onChange = this.onChange.bind(this);
  }
/* componentDidUpdate(){
  ("DIDUPDATE()", this.state);
} */
  getNetAmount(amount, days){
    let p = amount;
    let n = 1; // no. of compoundings per day (1%)
    let t = days; // no. of days
    let r = 1; //rate 1%
    let A = (p* Math.pow((1 + (r/(n*100))), (n*t)));
    let netTotal = (A+((A - p)*0.16)).toFixed(2);
    this.setState({
      totalAmountwithIva: amount, //netTotal,
      totalDays:days,
    })
    return netTotal;
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
    
    return (<div>
      The total amount + interest is <b>${A.toFixed(2)}</b>
      {/* <br />
      The interest + IVA is <b>${((A.toFixed(2) - p)+(A.toFixed(2) - p)*0.16).toFixed(2)}</b>
      <br/>
      16% IVA is ${((A.toFixed(2) - p)*0.16).toFixed(2)}
      <br/>
      Net total is is <b>${netTotal}</b> */}
    </div>
    );
  
  }
 
  componentDidMount(){
    this.props.saveValues("PendingStepNumber", 2);
    if(this.props.form.Salary>0){
      this.setState({
        formValid:true,
        salaryValid:true,
      })
      this.props.saveValues("formValid", true);

      let percent25OfSalary = 25*this.state.Salary/100
      this.setState({
        maxValue: percent25OfSalary,
        minValue: percent25OfSalary<1000?0:1000
      })

    }
    if(this.props.form.ChosenAmount>0){
      this.setState({
          value: this.props.form.ChosenAmount,
          days: this.props.form.ChosenDays,
      })
      this.props.saveValues("loanAmount", this.props.form.ChosenAmount);
      this.props.saveValues("loanPeriod", this.props.form.ChosenDays);
    }
  }

  /* onChange(e) {
    ("e.target", e.name);
    this.props.saveValues(e.target.name, e.target.value);
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
        [name]: value},
        //() => { this.validateField(name, value)}
        );
  } */

  errorClass(error) {
    return(error.length === 0 ? '' : 'error');
  }  
  displayErrorClass(error) {
    return(error.length === 0 ? 'error-message': 'error-message__visible');
  }
  displayError(field) {
    // (this.props.formErrors, ">>>>>>", this.state.formErrors[field]);
    //const { required, valid } = this.state.formErrors;
    let newFieldName=field;
    switch (field) {
      case "Salary":
          newFieldName = "Monthly Salary";
        break;
    
      default:
        break;
    }

    const errorMessage = `Field ${newFieldName} `;

    if (this.state.formErrors[field]) {
      return `${errorMessage} ${this.state.formErrors[field]}`;
    }

   
  }

  render() {
    if (this.state.isFetching === true) {
      return <div><HourGlass /></div>;
  }
    return (<div>
      <h2>Calcula tu prestamo</h2>
      <ul className="form-fields">
          <li>
          <div className="container calculator-container">
        <span>
          <div style={this.state.displaySteps?{display:'none'}:{display:''}}>
          <div className="row" style={{'padding': '20px'}}>
          <div className="col-md-4 col-lg-4 col-xl-4 col-sm-5 col">
            
          </div>
            <div className="col-md-4 col-lg-4 col-xl-4 col-sm-7 col">
              <label>
                Your monthly salary *
              </label>
              <input type="text" 
                name="Salary" placeholder="Your monthly salary" 
                defaultValue={this.props.form.Salary} 
                autoComplete="on" maxLength="8"
                className={this.errorClass(this.state.formErrors.Salary)}
                onBlur={this.onChange}
                onInput={this.numericOnly}
                onChange={this.onChange} />
              <p className={this.displayErrorClass(this.state.formErrors.Salary)}>
                {this.displayError('Salary')}
              </p>
              </div>
            </div>
          <div className="row" style={{'padding': '20px'}}>
          <div className="col-md-4 col-lg-4 col-xl-4 col-sm-5 col">
            How much $$?
          </div>
            <div className="col-md-4 col-lg-4 col-xl-4 col-sm-7 col">
            <InputRange name="loanAmount"
              step={100}
              formatLabel={value => `$${value<this.state.maxValue?value:this.state.maxValue}`}
              maxValue={this.state.maxValue}
              minValue={this.state.minValue}
              value={this.props.form.loanAmount<this.state.maxValue?this.props.form.loanAmount:this.state.maxValue}
              onChange={value => {
                this.props.saveValues("loanAmount", value);
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
            <InputRange name="loanPeriod"
              step={1}
              formatLabel={days => `${days}`}
              maxValue={15}
              minValue={1}
              /* value={this.state.days} */
              value={this.props.form.loanPeriod}
              onChange={days => {
                this.props.saveValues("loanPeriod", days);
                this.setState({ days });
                this.getNetAmount(this.state.value,days)
                }} />  
              </div>              

          </div>
          <div className="row" style={{'padding': '20px'}}>
          <div className="col-md-8 col-lg-8 col-xl-8">
            {this.calculate(this.state.value, this.state.days)}
          </div>
          </div>
          </div>
        </span>
      </div>

          </li>
        <li className="form-footer">
          <button className="btn-normal pull-right" disabled={(!this.state.formValid)}
            onClick={()=>{
              if(!this.props.form.formValid)
                {
                  return;
                }
              this.setState(
                {
                  displaySteps: true
                }
              )
              localStorage.setItem(
                'totalAmountwithIva', this.state.totalAmountwithIva,
                'totalDays', this.state.totalDays,
              )
              this.props.saveValues("PendingStepNumber", 2);
              
              this.props.saveValues("ChosenAmount", this.state.totalAmountwithIva);
              this.props.saveValues("ChosenDays", this.state.totalDays);
              

                setTimeout(() => {
                  if(this.props.form.ChosenAmount<=0 && this.props.form.ChosenDays<=0){
                    this.props.saveValues("ChosenAmount", this.props.form.loanAmount);
                    this.props.saveValues("ChosenDays", this.props.form.loanPeriod);
                  }
                  else if(this.props.form.ChosenAmount<=0 && (localStorage.getItem("totalAmountwithIva")<=0 || this.state.totalAmountwithIva<=0)){
                      this.setState({
                        totalAmountwithIva: this.getNetAmount(this.props.form.loanAmount, this.props.form.loanPeriod),
                        totalDays: this.props.form.loanPeriod,
                      });
                      this.props.saveValues("ChosenAmount", this.state.totalAmountwithIva);
                      this.props.saveValues("ChosenDays", this.state.totalDays);
                    }
                    // ("ChosenAmount = ", this.props.form);
                    this.updateStepsProgress()
                    .then((res)=>{
                      this.nextStep();
                    })
                });
            }}
            >
              <span>
Continue
</span>
</button>
        </li>
      </ul>
    </div>)
  }

  onChange(e) {
    this.props.saveValues(e.target.name, e.target.value);
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value},
        () => { this.validateField(name, value) });
    
    if(name==="Salary"){
      if(value>0){
        let percent25OfSalary = 25*value/100;
        this.setState({
          maxValue: percent25OfSalary<=10000?percent25OfSalary:10000,
          minValue: percent25OfSalary<1000?0:100,
        })
      }
    }
  }
  validateField(fieldName, value) {
  let fieldValidationErrors = this.state.formErrors;
  
  let salaryValid = this.state.salaryValid;


  switch(fieldName) {
       case 'Salary':
          fieldValidationErrors.Salary ='';
        if(value.trim()===''){
          fieldValidationErrors.Salary = ' es requerido';
          this.props.saveValues("formValid", false);
        }
        else{
          this.props.saveValues("formValid", true);
        }
      break;
      default:
      break;
  }

  if(this.state.token)
  {
    this.setState({formErrors: fieldValidationErrors,
      salaryValid: salaryValid,
      }, this.validateForm);
  }
  else
  {
    this.setState({formErrors: fieldValidationErrors,
                    salaryValid: salaryValid,
                    }, this.validateForm);
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

  async updateStepsProgress(){
    return new Promise((resolve, reject) => {

      this.setState ({
        isFetching: true,
        fetchError: null,
      });
      // (this.state.totalAmountwithIva, this.props.form.ChosenAmount);
      const request = {
        RegistrationToken: localStorage.getItem("RegistrationToken"),
        PendingStepNumber: 2,
        ChosenAmount: this.props.form.ChosenAmount,
        ChosenDays: this.props.form.ChosenDays,
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


  /* nextStep(e) {
     
    e.preventDefault()
    this.props.nextStep()
  } */
}

function mapStateToProps(state) {
  return {
    form: {
      loanAmount:state.form.loanAmount,
      loanPeriod:state.form.loanPeriod,
      loanWithIva:state.form.loanWithIva,
      ChosenAmount: state.form.ChosenAmount,
      ChosenDays: state.form.ChosenDays,
      PendingStepNumber: state.form.PendingStepNumber,
      Salary: state.form.Salary,
      formValid: state.form.formValid,

    },
  }
}
export default connect(mapStateToProps)(LoanCalculator)
