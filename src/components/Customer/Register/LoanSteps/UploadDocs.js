import React, { Component } from 'react';
import { connect } from 'react-redux';
import {FormErrors} from './FormErros';
import Popup from "reactjs-popup";
import HourGlass from '../../../Common/hourGlass';
import {  Redirect} from 'react-router-dom';
import { previousStepAction, nextStepAction, saveValuesAction, uploadDocsDataAction } from '../../../redux/actions/uploadDocsActions'

import FileUpload from '../../FileUpload/FileUpload';
import CustomerCamera from '../../FileUpload/Camera/camera';
import { toast } from 'react-toastify';

class UploadDocs extends Component {
    constructor(props) {    
        super(props)
        this.state = {
          formValid: this.props.formValid,    
          isFetching: false, 
          RegistrationToken: localStorage.getItem("RegistrationToken"),
          files: this.props.formUploadDocsData.files,
          docCategoryVal: this.props.docCategoryVal,
          isFinishedUploading: this.props.isFinishedUploading,
        };
    
        this.handleSubmit = this.handleSubmit.bind(this);
        this.saveValues = this.saveValues.bind(this);
        this.nextStep = this.nextStep.bind(this)
        this.previousStep = this.previousStep.bind(this)
        this.change = this.change.bind(this);
      }

      change(e){
        this.setState({
          docCategoryVal: e.target.value
        })
        this.props.saveValues("docCategoryVal", e.target.value);
      }

      setDocCategoryVal(val){
        this.setState({
          docCategoryVal: val
        })
        this.props.saveValues("docCategoryVal", val);
      }

    renderUploadControls(){
      //(this.state.docCategoryVal);
      /* if(!this.state.docCategoryVal || this.state.docCategoryVal==='' || this.state.docCategoryVal === 'select')
      {
        return (
          <div>
            Select a document to upload
          </div>
        )
      }
      else */
      {
        return(
          <div className="xrow">
          {/* <CustomerCamera docCategoryVal={this.state.docCategoryVal} /> */}
          <FileUpload docCategoryVal={this.state.docCategoryVal} />
         {/*  <div className="col-12" onClick={()=>{
            
            this.props.saveValues("docCategoryVal", "1");
          }}>
          <CustomerCamera docCategoryVal="1" />
          <FileUpload docCategoryVal="1" uploadTitle="1- Upload Passport" />
          </div>

          <div className="col-12" onClick={()=>{
            
            this.props.saveValues("docCategoryVal", "2");
          }}>
          <CustomerCamera docCategoryVal="2" />
          <FileUpload docCategoryVal="2" uploadTitle="2- Upload IFE" />
          </div>

          <div className="col-12" onClick={()=>{
            
            this.props.saveValues("docCategoryVal", "3");
          }}>
          <CustomerCamera docCategoryVal="3" />
          <FileUpload docCategoryVal="3" uploadTitle="3- Upload Bank Statements" />
          </div> */}

        </div>
        )
      }
    }
    renderHourGlass(){
      return(
        <div style={{textAlign: 'center'}}><HourGlass /></div>
      )
    }
    componentDidMount(){
      this.props.saveValues("PendingStepNumber", 6);
    }
    componentDidUpdate(){
    }

    
    
    render(){
      /* var test=
        {
          "allProps":{
             "allState":{
                "form":{
                   "formValid":"",
                   "step":4,
                   "from":3,
                   "to":4,
                   "loading":false,
                   "loanAmount":1000,
                   "loanPeriod":1,
                   "loanWithIva":0,
                   "email":"",
                   "password":"",
                   "name":"Saqib",
                   "middleName":"",
                   "lastName":"Umar",
                   "phone":"3317236231",
                   "gender":"",
                   "age":"",
                   "didAgree":false,
                   "deviceInfo":"{\"isBrowser\":true,\"browserMajorVersion\":\"77\",\"browserFullVersion\":\"77.0.3865.120\",\"browserName\":\"Chrome\",\"engineName\":\"Blink\",\"engineVersion\":\"none\",\"osName\":\"Windows\",\"osVersion\":\"10\",\"userAgent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36\"}",
                   "CustomerContactId":37,
                   "CustomerId":1137,
                   "Country":"Mexico",
                   "State":"Mexico",
                   "Town":"Tlalpan",
                   "City":"Tlalpan",
                   "Colony":"sa",
                   "Street":"valle de bravo 24",
                   "Zip":"14340",
                   "ExteriorNumber":"1",
                   "InteriorNumber":"",
                   "FixedPhone":"3317236231",
                   "MobilePhone":"",
                   "docCategoryVal":"1",
                   "isFinishedUploading":true,
                   "json":[
                      {
                         "CustomerReferenceId":1,
                         "CustomerId":1137
                      }
                   ],
                   "CompanyName":"test",
                   "Salary":"12000",
                   "PaymentFrequency":"biweekly",
                   "WorkingPeriod":"12",
                   "WorkPhone":"3317236231",
                   "firstName":"Saqib",
                   "relationship":"big brother"
                },
                "registrationWorkData":{
                   "formValid":"",
                   "step":4,
                   "from":3,
                   "to":4,
                   "loading":false,
                   "CompanyName":"test",
                   "WorkingPeriod":"12",
                   "WorkPhone":"3317236231",
                   "Salary":"12000",
                   "PaymentFrequency":"biweekly",
                   "firstName":"Saqib",
                   "middleName":"",
                   "lastName":"Umar",
                   "phone":"3317236231",
                   "relationship":"big brother",
                   "docCategoryVal":"1",
                   "isFinishedUploading":true,
                   "json":[
                      {
                         "CustomerReferenceId":1,
                         "CustomerId":1137
                      }
                   ],
                   "deviceInfo":"{\"isBrowser\":true,\"browserMajorVersion\":\"77\",\"browserFullVersion\":\"77.0.3865.120\",\"browserName\":\"Chrome\",\"engineName\":\"Blink\",\"engineVersion\":\"none\",\"osName\":\"Windows\",\"osVersion\":\"10\",\"userAgent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36\"}",
                   "Country":"Mexico",
                   "name":"Saqib",
                   "Street":"valle de bravo 24",
                   "Town":"Tlalpan",
                   "City":"Tlalpan",
                   "State":"Mexico",
                   "Zip":"14340",
                   "FixedPhone":"3317236231",
                   "Colony":"sa",
                   "ExteriorNumber":"1",
                   "CustomerContactId":37,
                   "CustomerId":1137
                },
             }
          },
       } */

       

        if(localStorage.getItem("RegistrationToken")===null){
            return (
             <Redirect to='/customer/home' />
           ) 
          }
        return(
            <div className="xrow">
              {
                /* Object.entries(test.allProps.allState.form).filter(item=>{
                  // ("ITEM = ",item[0])
                  var filteredBy = item[0] != "formValid" && item[0] != "step" && item[0] != "from" && item[0] != "to"
                  && item[0] != "loading" && item[0] != "deviceInfo" && item[0] != "json" && item[0] != "isFinishedUploading"
                  && item[0] != "CustomerId" && item[0] != "didAgree" && item[0] != "CustomerContactId" 
                  return filteredBy
                }).map(([key,value])=>{
                  return (
                    <div key={key} className="col-3"><strong>{key} : </strong>{value.toString()}</div>
                  );
                  }) */
              }
              {
                /* Object.entries(test.allProps.allState.form).map(([key,value])=>{
                  return (
                    <div key={key} className="col-3"><strong>{key} : </strong>{value.toString()}</div>
                  );
                  }) */
              }
              
              <h2>
                Documents upload
              </h2>
                {/* <select id="docCategoryVal" onChange={this.change} value={this.state.docCategoryVal}>
                <option value="select">Select the document you are uploading</option>
                <option value="1">Passport/IFE</option>
                <option value="2">IFE</option>
                <option value="3">Bank statement</option>
              </select> */}
              {/* <p>{this.state.docCategoryVal}</p> */}
              {this.renderUploadControls()}
                <div className="row">
              <div className="col-12 form-footer">
                <div className="row">
                  <div className="col-12">
                    <button className="btn-normal pull-left" type="button"
                      onClick={()=>{
                        this.props.saveValues("formValid", this.state.formValid);                  
                        this.props.previousStep();
                        }} ><span>Atras</span></button>
                    <button className="btn-normal pull-right" type="submit" /* disabled={!this.props.formValid} */
                      onClick={this.handleSubmit}><span>
                        Continue
                      </span></button>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <span style={{color:'red'}}>
                    {this.props.formUploadDocsData.formValid?'':'Please make sure to upload all the required documents'}<br></br>
                    {(this.props.formUploadDocsData.formValid&&!this.props.formUploadDocsData.isFinishedUploading)?'You haven\'t uploaded yet. Click on upload button':''}
                    {/* <FormErrors formErrors={this.state.formErrors} /> */}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            </div>
        )
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ submitted: true });
        const { data } = this.props.uploadDocsData;
        if(!this.props.formUploadDocsData.formValid){
          toast.error("Can not continue without required documents");
        }
        else if(this.props.formUploadDocsData.formValid&&!this.props.formUploadDocsData.isFinishedUploading){
          toast.warn("You haven't uploaded yet. Click on upload button");
        }
        
          this.props.uploadDocsData(data);
          if(this.props.formUploadDocsData.formValid && this.props.formUploadDocsData.isFinishedUploading){
            this.updateStepsProgress()
                    .then((res)=>{
                      // this.nextStep();
                      this.props.nextStep();
                    })
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
          PendingStepNumber: this.props.formUploadDocsData.data.PendingStepNumber,
          ChosenAmount: this.props.formUploadDocsData.data.ChosenAmount,
          ChosenDays: this.props.formUploadDocsData.data.ChosenDays,
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
  
  uploadDocsData(data) {
    ("this.registerWorkData")
    //botho f the following  work
    // this.props.dispatch(registerWorkDataAction(data))
    this.props.uploadDocsDataAction(data);
  }

  saveValues(key, value) {
    ("this.saveValues")
    //botho f the following  work
    // this.props.dispatch(saveValuesAction(key, value))
    this.props.saveValuesAction(key, value);
  }
  
}


const mapDispatchToProps = {
    uploadDocsData: uploadDocsDataAction,
    saveValues: saveValuesAction,
    nextStep: nextStepAction,
    previousStep: previousStepAction,
  }

  function mapStateToProps(state) {
    return {
      formUploadDocsData: {
        from:state.uploadDocsData.from,
        to:state.uploadDocsData.to,
        formValid: state.uploadDocsData.formValid,
        data: state.uploadDocsData,
        loading: state.uploadDocsData.loading,
        files: state.uploadDocsData.files,  
        docCategoryVal: state.uploadDocsData.docCategoryVal,
        isFinishedUploading: state.uploadDocsData.isFinishedUploading,
      }
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(UploadDocs)
