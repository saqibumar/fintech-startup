import React from 'react';
import { connect } from 'react-redux';
import {FormErrors} from './FormErros';
import Popup from "reactjs-popup";
import NumberFormat from 'react-number-format';
import HourGlass from '../../../Common/hourGlass';
import { registerAction } from '../../../redux/actions/registrationActions'

// import { customerContactAction } from '../../../redux/actions/customerContactActions'
import {  Redirect} from 'react-router-dom';
import { deviceDetect } from 'react-device-detect';

// import ContactInfo from './ContactInfo';

class AccountFields extends React.Component {
  constructor(props) {
    
    super(props)

    this.state = {
      name: this.props.form.name,
      middleName: this.props.form.middleName,
      lastName: this.props.form.lastName,
      phone: this.props.form.phone,
      password: this.props.form.password,
      email: this.props.form.email,
      gender:this.props.form.gender,

      CustomerId: this.props.form.CustomerId,
      Zip: this.props.form.Zip,
      Country:this.props.form.Country,
      State:this.props.form.State,
      Town: this.props.form.Town,
      City: this.props.form.City,
      Colony: this.props.form.Colony,
      InteriorNumber: this.props.form.InteriorNumber,
      ExteriorNumber: this.props.form.ExteriorNumber,
      Street: this.props.form.Street,
      FixedPhone: this.props.form.FixedPhone,
      MobilePhone: this.props.form.MobilePhone,
      
      formErrors: {
        name:'', 
        lastName: '', 
        phone:'', 
        email: '', 
        password: '',

        Country: '',
        State: '',
        Town: '',
        City: '',
        Colony: '',
        InteriorNumber: '',
        ExteriorNumber: '',
        Street: '',
        FixedPhone: '',
        Zip: '',
      },
      emailValid: false,
      nameValid: false,
      lastNameValid: false,
      phoneValid: false,
      passwordValid: false,
      
      mobilePhoneValid: false,
      fixedPhoneValid: false,
      
      formValid: this.props.form.formValid,
      isFetching: false, 
      userInput: '',
      token: localStorage.getItem("RegistrationToken"),
      deviceInfo: deviceDetect(),
    };

    this.previousStep = this.props.previousStep;
    this.nextStep = this.props.nextStep;
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.register = this.props.register;
    // this.customerContactAction = this.props.customerContactAction;

  }

  componentDidMount(){
    this.setState({
      deviceInfo: deviceDetect()
    });
    
    this.props.saveValues("deviceInfo",  JSON.stringify(this.state.deviceInfo));
    this.props.saveValues("Country", "Mexico");

    if(this.props.form.from>0 && this.props.form.from>this.props.form.to)
    {
      this.setState({
        formValid:true,
        emailValid: true,
        nameValid: true,
        lastNameValid: true,
        phoneValid: true,
        passwordValid: true,

        //mobilePhoneValid: true,
        fixedPhoneValid: true,
      });
   }

  }

  onChange(e) {
    this.props.saveValues(e.target.name, e.target.value);
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value},
        () => { this.validateField(name, value) });
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let nameValid = this.state.nameValid;
    let lastNameValid = this.state.lastNameValid;
    let phoneValid = this.state.phoneValid;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;

    //let mobilePhoneValid = this.state.mobilePhoneValid;
    let fixedPhoneValid = this.state.fixedPhoneValid;


    switch(fieldName) {
      case 'name':
        if(value.trim()===''){
          nameValid=false;
          fieldValidationErrors.name = nameValid ? '': ' es requerido';
        }
        else{
          nameValid = value.trim().length >= 1;
          fieldValidationErrors.name = nameValid ? '': ' is too short';
        }
        this.setState({nameValid: nameValid});
          break;

      case 'lastName':
        if(value.trim()===''){
          lastNameValid=false;
          fieldValidationErrors.lastName = lastNameValid ? '': ' es requerido';
        }
        else{
          lastNameValid = value.trim().length >= 1;
          fieldValidationErrors.lastName = lastNameValid ? '': ' is too short';
        }
        this.setState({lastNameValid: lastNameValid})
      break;
      case 'phone':
        if(value.trim()===''){
          phoneValid = false;
          fieldValidationErrors.phone = phoneValid ? '': ' es requerido';
        }
        else{
          // ("value = ", value.length);
          phoneValid = (value.trim().length <= 10 && value.trim().length >= 10);
          fieldValidationErrors.phone = phoneValid ? '': ' es inválido';
        }
        this.setState({phoneValid: phoneValid})
      break;

        case 'email':
          if(!this.state.token){
            if(value===''){
              fieldValidationErrors.email = emailValid ? '': ' es requerido';
            }
            else{    
              emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
              fieldValidationErrors.email = emailValid ? '' : ' es inválido';
            }
            this.setState({emailValid: emailValid})
          }
          break;
        case 'password':
            if(!this.state.token){
              if(value.trim()===''){
                fieldValidationErrors.password = passwordValid ? '': ' es requerido';
              }
              else{    
                passwordValid = value.length >= 1;
                fieldValidationErrors.password = passwordValid ? '': ' is too short';
              }
              this.setState({passwordValid: passwordValid})
            }
        break;
        case 'Street':
            this.state.formErrors.Street ='';
            if(value.trim()===''){
              fieldValidationErrors.Street = ' es requerido';
            }
        break;
        case 'ExteriorNumber':
            this.state.formErrors.ExteriorNumber ='';
          if(value.trim()===''){
            fieldValidationErrors.ExteriorNumber = ' es requerido';
          }
        break;
        case 'Colony':
            this.state.formErrors.Colony ='';
          if(value.trim()===''){
            fieldValidationErrors.Colony = ' es requerido';
          }
        break;
        case 'Town':
            this.state.formErrors.Town ='';
          if(value.trim()===''){
            fieldValidationErrors.Town = ' es requerido';
          }
          break;
        case 'City':
            this.state.formErrors.City ='';
          if(value.trim()===''){
            fieldValidationErrors.City = ' es requerido';
          }
        break;
        case 'State':
            this.state.formErrors.State ='';
            if(value.trim()===''){
              fieldValidationErrors.State = ' es requerido';
            }
          break;
                                                        
         case 'Zip':
            this.state.formErrors.Zip ='';
          if(value.trim()===''){
            fieldValidationErrors.Zip = ' es requerido';
          }
        break;
        case 'FixedPhone':
            this.state.formErrors.FixedPhone ='';
          this.setState({fixedPhoneValid: true})
          if(value.trim()){
            fixedPhoneValid = false;
            // ("value = ", value.length);
            fixedPhoneValid = (value.trim().length <= 10 && value.trim().length >= 10);
            fieldValidationErrors.FixedPhone = fixedPhoneValid ? '': ' es inválido';
            this.setState({fixedPhoneValid: fixedPhoneValid})
          }
          
        break;

        default:
        break;
    }

    if(this.state.token)
    {
      this.setState({formErrors: fieldValidationErrors,
        nameValid: nameValid,
        lastNameValid: lastNameValid,
        phoneValid: phoneValid,

        // mobilePhoneValid: mobilePhoneValid,
        fixedPhoneValid: fixedPhoneValid,

        }, this.validateForm);
    }
    else
    {
      this.setState({formErrors: fieldValidationErrors,
                      nameValid: nameValid,
                      lastNameValid: lastNameValid,
                      phoneValid: phoneValid,
                      emailValid: emailValid,
                      passwordValid: passwordValid,
                      // mobilePhoneValid: mobilePhoneValid,
                      fixedPhoneValid: fixedPhoneValid,
                      }, this.validateForm);
    }
    }

  validateForm() {
    ("this.state = ", this.state);
    if(this.state.token)
    {
      this.setState(
        {formValid: 
          (this.state.name && this.state.name.trim() && this.state.nameValid) && 
          (this.state.lastName && this.state.lastName.trim() && this.state.lastNameValid) && 
          (this.state.phone && this.state.phone.trim() && this.state.phoneValid) /* && 
          (this.state.MobilePhone && this.state.MobilePhone.trim() && this.state.fixedPhoneValid) */
      });
      // this.props.saveValues("formValid", this.state.formValid);
    }
    else
    {
      this.setState({formValid: (this.state.name.trim() && this.state.nameValid) && 
                                (this.state.lastName.trim() && this.state.lastNameValid) && 
                                (this.state.phone.trim() && this.state.phoneValid) && 
                                (this.state.email.trim() && this.state.emailValid) && 
                                (this.state.password.trim() && this.state.passwordValid) /* && 
                                (this.state.MobilePhone.trim() && this.state.mobilePhoneValid) */
      });
    }



      
  }
  errorClass(error) {
    return(error.length === 0 ? '' : 'error');
  }  
  displayErrorClass(error) {
    return(error.length === 0 ? 'error-message': 'error-message__visible');
  }  

  render() {
    const loggedinUser = this.state.token;

    if(localStorage.getItem("RegistrationToken")===null){
      return (
       <Redirect to='/customer/home' />
     ) 
    }
    if (this.props.form.loading) {
      return <div style={{textAlign: 'center'}}><HourGlass /></div>;
    }

    return (
      <div>    
        <form id="formReg">
          <h2>Personal Information</h2>
          <div className="row form-fields">
          <div className="col-md-6 col-lg-6 col-xl-6 col-sm-12 col-xs-12" style={loggedinUser? stylesHide:stylesShow}>
              <label>Email *</label>
              <input type="email" name="email" placeholder="Email" value={this.props.form.email} 
                required={!loggedinUser} autoComplete="on"
                className={this.errorClass(this.state.formErrors.email)}
                onBlur={this.onChange}
                onChange={this.onChange} />
              <p className={this.displayErrorClass(this.state.formErrors.email)}>
                {this.displayError('email')}
              </p>
            </div>
            <div className="col-md-6 col-lg-6 col-xl-6 col-sm-12 col-xs-12" style={loggedinUser? stylesHide:stylesShow}>
              <label>Password *</label>
              <input type="password" name="password" placeholder="Password" autoComplete="on"
              className={this.errorClass(this.state.formErrors.password)}
              required={!loggedinUser}
              value={this.props.form.password} onChange={this.onChange} onBlur={this.onChange} />
              <p className={this.displayErrorClass(this.state.formErrors.password)}>
                {this.displayError('password')}
              </p>
            </div>

            <div className="col-md-6 col-lg-6 col-xl-4 col-sm-12 col-xs-12">
                <label>First Name *</label>
                <input name="name" placeholder="First Name" value={this.props.form.name} 
                required autoComplete="on"
                className={this.errorClass(this.state.formErrors.name)}
                onBlur={this.onChange}
                onChange={this.onChange} />
                <p className={this.displayErrorClass(this.state.formErrors.name)}>
                  {this.displayError('name')}
                </p>
              </div>
            <div className="col-md-6 col-lg-6 col-xl-4 col-sm-12 col-xs-12">
              <label>Middle Name</label>
              <input name="middleName" placeholder="Middle Name" value={this.props.form.middleName} 
              autoComplete="on"
              onBlur={this.onChange}
              onChange={this.onChange} />
            </div>
            <div className="col-md-6 col-lg-6 col-xl-4 col-sm-12 col-xs-12">
              <label>Last Name *</label>
              <input name="lastName" placeholder="Last Name" value={this.props.form.lastName} 
              required autoComplete="on"
              className={this.errorClass(this.state.formErrors.lastName)}
              onBlur={this.onChange}
              onChange={this.onChange} />
              <p className={this.displayErrorClass(this.state.formErrors.lastName)}>
                {this.displayError('lastName')}
              </p>
            </div>
            <div className="col-md-6 col-lg-6 col-xl-4 col-sm-12 col-xs-12" id="phone">
              <label>Mobile Phone *
              <Popup trigger={<i style={{color:'blue'}}> ?</i>} position="left bottom"
                keepTooltipInside="#formReg" closeOnDocumentClick>
                <div style={{backgroundColor: 'lightyellow',color: 'blue'}}>Phone format: +52xxxxxxxxxx</div>
              </Popup>
              </label>
              <input name="phone" placeholder="Mobile phone number" value={this.props.form.phone} 
              required autoComplete="on" type="number"
              className={this.errorClass(this.state.formErrors.phone)}
              onBlur={this.onChange}
              onChange={this.onChange} />
              <p className={this.displayErrorClass(this.state.formErrors.phone)}>
                {this.displayError('phone')}
              </p>
            </div>        
            <div className="col-md-6 col-lg-6 col-xl-4 col-sm-12 col-xs-12">
              <label>Gender</label>
              <div className="col-12">
              <label style={{width:'150px'}}>
                <input name="gender" type="radio" placeholder="Gender" value="Male" style={{width:'100px'}}
                  required checked={this.props.form.gender==="Male"}
                  onBlur={this.onChange}
                  onChange={this.onChange} /> 
                  Male
              </label>
              </div>
              <div className="col-md-6 col-lg-6 col-xl-4 col-sm-12 col-xs-12">
              <label style={{width:'150px'}}>
                <input name="gender" type="radio" placeholder="Gender" value="Female" style={{width:'100px'}}
                required checked={this.props.form.gender==="Female"}
                onBlur={this.onChange}
                onChange={this.onChange} />
                Female
              </label>
              </div>
            </div>
            </div>
            <hr/>
          <div className="row form-fields">
          <div className="col-md-6 col-lg-6 col-xl-6 col-sm-12 col-xs-12">
              <label>Street</label>
              <input type="text" name="Street" placeholder="Street" value={this.props.form.Street} 
                 autoComplete="on"
                className={this.errorClass(this.state.formErrors.Street)}
                onBlur={this.onChange}
                onChange={this.onChange} />
              <p className={this.displayErrorClass(this.state.formErrors.Street)}>
                {this.displayError('Street')}
              </p>
            </div>
            <div className="col-md-3 col-lg-3 col-xl-3 col-sm-6 col-xs-6">
              <label>Exterior Number</label>
              <NumberFormat format="#######" name="ExteriorNumber" placeholder="Exterior Number" value={this.props.form.ExteriorNumber} 
                 autoComplete="on"
                className={this.errorClass(this.state.formErrors.ExteriorNumber)}
                onBlur={this.onChange}
                /* onChange={this.onChange} */ />
              <p className={this.displayErrorClass(this.state.formErrors.ExteriorNumber)}>
                {this.displayError('ExteriorNumber')}
              </p>
            </div>
            <div className="col-md-3 col-lg-3 col-xl-3 col-sm-6 col-xs-6">
              <label>Interior Number</label>
              <NumberFormat format="#######" name="InteriorNumber" placeholder="Interior Number" value={this.props.form.InteriorNumber} 
                 autoComplete="on"
                className={this.errorClass(this.state.formErrors.InteriorNumber)}
                onBlur={this.onChange}
                /* onChange={this.onChange} */ />
              <p className={this.displayErrorClass(this.state.formErrors.InteriorNumber)}>
                {this.displayError('InteriorNumber')}
              </p>
            </div>
            <div className="col-md-4 col-lg-4 col-xl-4 col-sm-12 col-xs-12">
              <label>Colony</label>
              <input type="text" name="Colony" placeholder="Colony" value={this.props.form.Colony} 
                 autoComplete="on"
                className={this.errorClass(this.state.formErrors.Colony)}
                onBlur={this.onChange}
                onChange={this.onChange} />
              <p className={this.displayErrorClass(this.state.formErrors.Colony)}>
                {this.displayError('Colony')}
              </p>
            </div>
            <div className="col-md-4 col-lg-4 col-xl-4 col-sm-12 col-xs-12">
              <label>Town</label>
              <input type="text" name="Town" placeholder="Town" value={this.props.form.Town} 
                 autoComplete="on"
                className={this.errorClass(this.state.formErrors.Town)}
                onBlur={this.onChange}
                onChange={this.onChange} />
              <p className={this.displayErrorClass(this.state.formErrors.Town)}>
                {this.displayError('Town')}
              </p>
            </div>
            <div className="col-md-4 col-lg-4 col-xl-4 col-sm-12 col-xs-12">
              <label>City</label>
              <input type="text" name="City" placeholder="City" value={this.props.form.City} 
                 autoComplete="on"
                className={this.errorClass(this.state.formErrors.City)}
                onBlur={this.onChange}
                onChange={this.onChange} />
              <p className={this.displayErrorClass(this.state.formErrors.City)}>
                {this.displayError('City')}
              </p>
            </div>
            <div className="col-md-6 col-lg-6 col-xl-6 col-sm-12 col-xs-12">
              <label>State</label>
              <input type="text" name="State" placeholder="State" value={this.props.form.State} 
                 autoComplete="on"
                className={this.errorClass(this.state.formErrors.State)}
                onBlur={this.onChange}
                onChange={this.onChange} />
              <p className={this.displayErrorClass(this.state.formErrors.State)}>
                {this.displayError('State')}
              </p>
            </div>
            <div className="col-md-6 col-lg-6 col-xl-6 col-sm-12 col-xs-12">
              <label>Country</label>
              <input readOnly type="text" name="Country" placeholder="Country" value={this.props.form.Country} 
                 autoComplete="on"
                className={this.errorClass(this.state.formErrors.Country)}
                onBlur={this.onChange}
                onChange={this.onChange} />
              <p className={this.displayErrorClass(this.state.formErrors.Country)}>
                {this.displayError('Country')}
              </p>
            </div>            
            <div className="col-md-6 col-lg-6 col-xl-6 col-sm-12 col-xs-12">
              <label>Zip</label>
              <NumberFormat format="#####"
                name="Zip" placeholder="Zip" value={this.props.form.Zip} 
                autoComplete="on" 
               className={this.errorClass(this.state.formErrors.Zip)}
               onBlur={this.onChange} />
              {/* <input type="number" name="Zip" placeholder="Zip" value={this.props.form.Zip} 
                 autoComplete="on" 
                className={this.errorClass(this.state.formErrors.Zip)}
                onBlur={this.onChange}
                onChange={this.onChange} /> */}
              <p className={this.displayErrorClass(this.state.formErrors.Zip)}>
                {this.displayError('Zip')}
              </p>
            </div>


          <div className="col-md-6 col-lg-6 col-xl-6 col-sm-12 col-xs-12">
              <label>Fixed Phone </label>
              <NumberFormat format="##########" name="FixedPhone" placeholder="Fixed Phone" value={this.props.form.FixedPhone} 
                autoComplete="on"
                className={this.errorClass(this.state.formErrors.FixedPhone)}
                onBlur={this.onChange}
                /* onChange={this.onChange} */ />
              <p className={this.displayErrorClass(this.state.formErrors.FixedPhone)}>
                {this.displayError('FixedPhone')}
              </p>
            </div>
          </div>

              {/* <ContactInfo shareMethods={this.acceptMethods.bind(this)}
                  validateContactInfo={this.validateContactInfo.bind(this)}
                  saveValues={this.props.saveValues.bind(this)}/> */}
          <div className="row">
            <div className="col-12 form-footer">
              <div className="row">
                <div className="col-12">
                  <button className="btn -default pull-left"
                    onClick={()=>{
                      this.props.saveValues("formValid", this.state.formValid);                  
                      this.props.previousStep();
                      }} >Back</button>
                  <button className="btn-normal pull-right" /* disabled={(!this.state.formValid)} */
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
      case "name":
          newFieldName = "First Name";
        break;
      case "lastName":
          newFieldName = "Last Name";
        break;
      case "phone":
          newFieldName = "Phone number";
        break;
      case "Zip":
          newFieldName = "Zip number";
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

    //()=>{
      this.props.saveValues("formValid", this.state.formValid);
      (this.state);
      var elements = document.getElementById("formReg").elements;
      for (var i = 0, element; element = elements[i++];) {
        if(!this.props.form.formValid && this.state.token && (element.type !== "email" && element.type !== "password" && element.type !== "submit")){
          this.validateField(element.name, element.value);
        }                          
      }
        if(!(this.state.formErrors.name || 
            this.state.formErrors.lastName || 
            this.state.formErrors.phone ||
            this.state.formErrors.FixedPhone)){
        
        this.setState({ submitted: true });
        const { data } = this.props.form;
        // if(this.validateContactForm()){
          this.props.register(data);
          // this.saveContactInfo();
        // }
        // this.props.customerContactAction(this.props.formCustomerContact);

        // this.props.nextStep();
        // this.nextStep();
      }
      else{
        return;
      }
     // }


  }

  
  nextStep(e) {
    e.preventDefault()
    this.props.nextStep()
  }
}

const mapDispatchToProps = {
  // getPosts: fetchPosts,
  register: registerAction,
  // customerContactAction: customerContactAction,
}


function mapStateToProps(state) {
  return {
    form: {
      name: state.form.name,
      middleName: state.form.middleName,
      lastName: state.form.lastName,
      phone: state.form.phone,
      gender: state.form.gender,
      password: state.form.password,
      email: state.form.email,
      from:state.form.from,
      to:state.form.to,
      formValid: state.form.formValid,
      data: state.form,
      loading: state.form.loading,
      deviceInfo: state.form.deviceInfo,
      Country: state.form.Country,

      CustomerContactId: state.form.CustomerContactId,
      CustomerId: state.form.CustomerId,
      //Country:state.form.Country,
      State:state.form.State,
      Town: state.form.Town,
      City: state.form.City,
      Colony: state.form.Colony,
      Street: state.form.Street,
      Zip: state.form.Zip,
      ExteriorNumber: state.form.ExteriorNumber,
      InteriorNumber: state.form.InteriorNumber,
      FixedPhone: state.form.FixedPhone,
      MobilePhone: state.form.phone,
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountFields)



const stylesHide={
  display: 'none'
}
const stylesShow={
 display: 'block',
}