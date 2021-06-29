import React, { Component } from "react";
import Dropzone from "../dropzone/Dropzone";
import "./Upload.css";
import Progress from "../progress/Progress";
// import CustomerCamera from '../Camera/camera'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import { connect } from "react-redux";
import { previousStepAction, nextStepAction, 
  saveValuesAction, saveUploadedDocsAction, removeUploadedDocsAction } from '../../../redux/actions/uploadDocsActions'

  // import CustomerCamera from '../../../../FileUpload/Camera/camera';
import CustomerCamera from '../Camera/camera'
import ImagePreview from '../Camera/ImagePreview';


class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: this.props.files || [],
      uploading: false,
      uploadProgress: {},
      successfullUploaded: false,
      docCategoryVal:this.props.docCategoryVal,
      formValid: this.props.formValid,
      isFinishedUploading: this.props.isFinishedUploading,
    };

    this.onFilesAdded = this.onFilesAdded.bind(this);
    this.uploadFiles = this.uploadFiles.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
    this.renderActions = this.renderActions.bind(this);

  }


  onFilesAdded(files) {
    this.setState(prevState => ({
      files: prevState.files.concat(files)
    }));
    files.forEach(file => {
      Object.assign(file, {docCategoryVal: this.props.docCategoryVal});      
    });
    // Object.assign(files[0], {docCategoryVal: this.props.docCategoryVal});

    this.props.saveUploadedDocsAction(files);

  }

 /*  saveUploadedDocs(data) {
    ("this.registerWorkData")
    //botho f the following  work
    // this.props.dispatch(registerWorkDataAction(data))
    this.props.saveUploadedDocsAction(data);
  } */

  async uploadFiles() {
    this.setState({ uploadProgress: {}, uploading: true });
    const promises = [];
    this.props.files.forEach(file => {
      if(file.dataUri){
        promises.push(this.sendImageUploadRequest(file));
      }
      else{
        promises.push(this.sendRequest(file));
      }
    });
    try {
      await Promise.all(promises);

      this.setState({ successfullUploaded: true, uploading: false });
      toast.success('Upload success');
      this.props.saveValues('isFinishedUploading',true);

    } catch (e) {
      // Not Production ready! Do some error handling here instead...
      // alert();
      toast.error("Failed to upload")
      this.setState({ successfullUploaded: true, uploading: false });
    }
  }
  
  sendImageUploadRequest(file){
    return new Promise((resolve, reject) => {
      // var base64 = require('base-64');

      let jwt = localStorage.getItem("jwt");
      const request={
        customerDocuments:{
          RegistrationToken: localStorage.getItem("RegistrationToken"),
          DocName: file.docCategoryVal,
          DocMedia: file.dataUri.substring(file.dataUri.indexOf(',') + 1),
          DocType: file.dataUri.split(",")[0],
        }
      }
      // return;

      var config = require('../../../../Config/config.json');
      fetch(config.apiUrl + "uploadImage", {
        method: 'POST', 
        headers: {
            Accept: 'application/json', 
            'Content-Type': 'application/json', 
            Authorization: `Bearer ${jwt}`
        }, 
        body: JSON.stringify(request)
    })
    .then(
      response => response.json(),
      error => {
        reject("Unable to process request", error);
      },
    )
    .then((result) => {
      if(result){
        const copy = { ...this.state.uploadProgress };
        copy[file.docCategoryVal+'_'+file.imgPreviewIndex] = { state: "done", percentage: 100 };
        this.setState({ uploadProgress: copy });
        resolve("result = ", result)
      }
    },
  );
    });
  }

  sendRequest(file) {
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();

      req.upload.addEventListener("progress", event => {
        if (event.lengthComputable) {
          const copy = { ...this.state.uploadProgress };
          copy[file.name] = {
            state: "pending",
            percentage: (event.loaded / event.total) * 100
          };
          this.setState({ uploadProgress: copy });
        }
      });

      req.upload.addEventListener("load", event => {
        const copy = { ...this.state.uploadProgress };
        copy[file.name] = { state: "done", percentage: 100 };
        this.setState({ uploadProgress: copy });
        resolve(req.response);
      });

      req.upload.addEventListener("error", event => {
        const copy = { ...this.state.uploadProgress };
        copy[file.name] = { state: "error", percentage: 0 };
        this.setState({ uploadProgress: copy });
        reject(req.response);
      });

      const formData = new FormData();
      // formData.append("docCategoryVal", file.docCategoryVal);
      formData.append("RegistrationToken", localStorage.getItem("RegistrationToken"))
      let ext = file.name.split('.')[1];
      formData.append("file", file, file.docCategoryVal+'.'+ext);
      //formData.append("file", file, file.name);

      var config = require('../../../../Config/config.json');
      req.open("POST", config.apiUrl + "upload");
      req.send(formData);
    });
  }

  renderProgress(file) {
    let fileName = file.name || file.docCategoryVal+'_'+file.imgPreviewIndex;
    const uploadProgress = this.state.uploadProgress[fileName];
    if (this.state.uploading || this.state.successfullUploaded) {
      return (
        <div className="ProgressWrapper">
          <Progress progress={uploadProgress ? uploadProgress.percentage : 0} />
          <img
            className="CheckIcon"
            alt="done"
            src="/images/baseline-check_circle_outline-24px.svg"
            style={{
              opacity:
                uploadProgress && uploadProgress.state === "done" ? 0.5 : 0
            }}
          />
        </div>
      );
    }
  }

  renderActions() {
    if (this.state.successfullUploaded) {
      return (
        <button
          onClick={() =>{
            this.setState({ files: [], successfullUploaded: false })
            this.props.saveValues('files', [])
          }
          }
        >
          Clear
        </button>
      );
    } else {
      var isCategory1Loaded=false;
      var isCategory2Loaded=false;
      var isCategory3Loaded=false;
      this.props.files.forEach(file => {
        switch (file.docCategoryVal) {
          case "1":
            isCategory1Loaded=true;
          break;
          case "2":
            isCategory2Loaded=true;
          break;
          case "3":
            isCategory3Loaded=true;
          break;
                    
          default:
            break;
        }
      });
      var isAllLoaded = (isCategory1Loaded && isCategory2Loaded && isCategory3Loaded);
      
      this.props.saveValues('formValid', isAllLoaded);
      return (
        <div>
        <button
          disabled={!isAllLoaded || this.props.files.length <= 0 || this.state.uploading}
          onClick={this.uploadFiles}
        >
          Upload
        </button>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="Upload">
        {/* <ToastContainer />
        <span className="Title">Upload Documents</span> */}
        {/* <div className="Content"> */}
          <div className="row">
          <div className="col-lg-4 col-md-12 col-sm-12" onClick={()=>{            
            this.props.saveValues("docCategoryVal", "1");
          }}>
            Passport
          <Dropzone
              onFilesAdded={this.onFilesAdded}
              disabled={this.state.uploading || this.state.successfullUploaded}
            />
          <CustomerCamera docCategoryVal={this.state.docCategoryVal} />
          </div>
          <div className="col-lg-4 col-md-12 col-sm-12" onClick={()=>{            
            this.props.saveValues("docCategoryVal", "2");
          }}>
            IFE
          <Dropzone
              onFilesAdded={this.onFilesAdded}
              disabled={this.state.uploading || this.state.successfullUploaded}
            />
        <CustomerCamera docCategoryVal={this.state.docCategoryVal} />
          </div>
          <div className="col-lg-4 col-md-12 col-sm-12" onClick={()=>{
            
            this.props.saveValues("docCategoryVal", "3");
          }}>
            Statements
          <Dropzone
              onFilesAdded={this.onFilesAdded}
              disabled={this.state.uploading || this.state.successfullUploaded}
            />
           <CustomerCamera docCategoryVal={this.state.docCategoryVal} /> 
          </div>
          </div>
          <div className="FilesDoc">
 

            {this.props.files.map((file,index) => {
              return (
                
                <div key={file.docCategoryVal+'_'+file.name +'_'+ index} className="row Row" /* style={file.name?{display:''}:{display:'none'}} */>
                  <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                  {file.docCategoryVal==="1"?"Passport":file.docCategoryVal==="2"?"IFE":file.docCategoryVal==="3"?"Bank Statement":''} 
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                  {file.imgPreviewIndex>0?
                  (<div>
                    
                    <ImagePreview 
                      key={file.imgPreviewIndex+'-'+file.docCategoryVal}
                      dataUri={file.dataUri} 
                      style={(file.docCategoryVal===this.props.docCategoryVal)?{display:'block'}:{display:'none'}}
                      />
                  </div>)
                  :
                  (<span className="Filename">{file.name}
                  </span>)
            }
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                  {file.imgPreviewIndex>0?
                  (<div>
                  <button className="pull-right" key={`btn-${file.imgPreviewIndex}-${file.docCategoryVal}`}
                      onClick={()=>{
                              var updatedItems = this.props.files.filter(item => {
                              return (!(file.docCategoryVal===item.docCategoryVal && item.imgPreviewIndex === file.imgPreviewIndex));
                          });
                          this.props.removeUploadedDocsAction(updatedItems);

                      }}
                  xstyle={{marginLeft: '25%', position: 'absolute', zIndex: '99'}}>Remove {/* {file.docCategoryVal}-{file.imgPreviewIndex}-{index+1} */}</button>

                  </div>):
                  (<div>
                  <button className="pull-right" key={`btn-${file.name +'_'+ index}`}
                    onClick={()=>{
                      // this.props.saveUploadedDocsAction([]);
                        var updatedItems = this.props.files.filter(item => {
                            return item.name !== file.name;
                        });
                        
                        this.setState(prevState => ({
                          files: [].concat(updatedItems),
                        }));
                        this.props.removeUploadedDocsAction(updatedItems);

                        if(index===0){
                            this.setState({
                                files:updatedItems,//[],
                            });
                        }
                    }}
                    style={{zIndex: '99'}}>Remove {/*file.name +'_'+ index}-{index+1*/}</button>

                  </div>)}
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">                    
                    {this.renderProgress(file)}
                  </div>
                </div>
              );
            })}
          </div>
        {/* </div> */}
        <div className="row">
        <div className="col-12">
          <div className="Actions">{this.renderActions()}</div>
        </div>
        </div>
      </div>
    );
  }

  
}

/* const Greet = ({ name }) => <div>Hello {name}</div>
    
function showMessage() {
    toast(<Greet name="John" />);
} */

function mapStateToProps(state) {
  return {
    files: state.uploadDocsData.files,
    /* saveValues: saveValuesAction,
    nextStep: nextStepAction,
    previousStep: previousStepAction, */
    docCategoryVal: state.uploadDocsData.docCategoryVal,
    formValid: state.uploadDocsData.formValid,
    isFinishedUploading: state.uploadDocsData.isFinishedUploading,
    }
}

const mapDispatchToProps = {
  removeUploadedDocsAction: removeUploadedDocsAction,
  saveUploadedDocsAction: saveUploadedDocsAction,
  saveValues: saveValuesAction,
  nextStep: nextStepAction,
  previousStep: previousStepAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(Upload);

