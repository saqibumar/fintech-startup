import React, { Component } from "react";
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import ImagePreview from './ImagePreview';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'; 
import './camera.css';

import { connect } from "react-redux";
import { previousStepAction, nextStepAction, removeUploadedDocsAction,
    saveValuesAction, saveUploadedDocsAction } from '../../../redux/actions/uploadDocsActions'
import Progress from "../progress/Progress";

class CustomerCamera extends Component {
    constructor(props) {
      super(props);
      this.state = {
        dataUri: [],
        imgItem:[],
        imgPreviewIndex:0,
        isCameraPermissionGranted: false,
        isCameraOn: false,

        files: this.props.files || [],
        uploading: false,
        uploadProgress: {},
        successfullUploaded: false,
        docCategoryVal:this.props.docCategoryVal,
        formValid: this.props.formValid,
        isFinishedUploading: this.props.isFinishedUploading,
        
      };

      this.onTakePhotoAnimationDone = this.onTakePhotoAnimationDone.bind(this);
      this.toggleCameraStatus = this.toggleCameraStatus.bind(this);
    }
componentDidMount(){
    console.clear();
    var image = {imgPreviewIndex: 1, dataUri: "", docCategoryVal: "1"};
    var test=Array(5);
        test[0]= {imgPreviewIndex: 1, dataUri: "", docCategoryVal: "1"};
        test[1]= {imgPreviewIndex: 1, dataUri: "", docCategoryVal: "2"};
        test[2]= {imgPreviewIndex: 1, dataUri: "", docCategoryVal: "3"};
        test[3]= {imgPreviewIndex: 2, dataUri: "", docCategoryVal: "3"};
        test[4]= {imgPreviewIndex: 2, dataUri: "", docCategoryVal: "1"};
        
        var updatedItems = test.filter(item => {
            return (!(image.docCategoryVal===item.docCategoryVal && item.imgPreviewIndex === image.imgPreviewIndex));
        });
        

        updatedItems.map(item => {
            if(item.docCategoryVal==="1"){

            }
        })

}
    render(){
        
        return(
            <div className="row">
                <div className="col-12">
                    <div className="xMain">
                        <div className="xCard">
                            <div className="Upload">
                                <ToastContainer />
                                <span className="Title">
                                    {/* Upload documents using the camera */}
                                    {this.props.uploadTitle}
                                {/*  Camera enabled: {this.state.isCameraOn? 'Yes': 'No'} */}
                                </span>
                                <div className="XContent">
                                    <label>
                                        {/* Camera permission {this.state.isCameraPermissionGranted?'yes': 'not granted'} */}
                                        Camera {this.state.isCameraOn?'On': 'Off'}
                                        <input defaultChecked={ this.state.isCameraOn && this.state.isCameraPermissionGranted } 
                                            onChange={ this.toggleCameraStatus } 
                                            className="switch" /* disabled={!this.state.isCameraPermissionGranted} */
                                            type="checkbox" />
                                    </label>
                                    { 
                                        this.state.isCameraOn ? 
                                        <Camera className="camera"
                                        isImageMirror={false}
                                        isSilentMode = {true}
                                        /* isDisplayStartCameraError = {true} */
                                        style={this.state.isCameraPermissionGranted?{display:''}:{display:'none'}}
                                        onTakePhoto = { (dataUri) => { this.onTakePhoto(dataUri); } }
                                        onCameraError = { (error) => { this.onCameraError(error); } }
                                        onTakePhotoAnimationDone = { (dataUri) => { this.onTakePhotoAnimationDone(dataUri); } }
                                        />
                                        :
                                        <div>
                                            
                                        </div>
                                    }
                                <div className="Files row">
                                        {this.state.imgItem.map((image, index) => {
                                            return (
                                                <div key={`div-${image.imgPreviewIndex}-${image.docCategoryVal}`} className="col-12">
                                                    <button className="btn-normal pull-right" key={`btn-${image.imgPreviewIndex}-${image.docCategoryVal}`}
                                                        onClick={()=>{
                                                                var updatedItems = this.props.files.filter(item => {
                                                                return (!(image.docCategoryVal===item.docCategoryVal && item.imgPreviewIndex === image.imgPreviewIndex));
                                                            });
                                                            /* this.setState(prevState => ({
                                                                imgItem: [].concat(updatedItems),
                                                            })); */
                                                            
                                                            this.props.removeUploadedDocsAction(updatedItems);
                                                        }}
                                                    style={{marginLeft: '25%', position: 'absolute', zIndex: '99'}}>
                                                        <span>
                                                        Remove {image.docCategoryVal}-{image.imgPreviewIndex}-{index+1}
                                                        </span>
                                                        </button>

                                                    {/* <ImagePreview 
                                                        key={image.imgPreviewIndex+'-'+image.docCategoryVal}
                                                        dataUri={image.dataUri} 
                                                        style={(image.imgPreviewIndex===index+1&&image.docCategoryVal===this.props.docCategoryVal)?{display:'none'}:{display:'block'}}
                                                        /> */}
                                                        {/* this.renderProgress(image) */}
                                                </div>
                                            );
                                        })
                                        
                                        }


                                </div>
                                </div>
                            </div>

                        </div>
                        </div>
                </div>
            </div>

        )
    }
    
    renderProgress(file) {
        const uploadProgress = this.state.uploadProgress[file.imgPreviewIndex];
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
      
    toggleCameraStatus(e){
        // if(this.state.isCameraPermissionGranted){
            this.setState(prevState => ({
                isCameraOn: !prevState.isCameraOn
              }));
        /* }
        else{
            setTimeout(() => {
                
                this.setState({
                    isCameraOn: false
                  });
            }, 200);
        } */

}
    onTakePhoto (dataUri) {
        // Do stuff with the dataUri photo...
        // ('takePhoto', dataUri);
        this.setState({ uploadProgress: {}, uploading: true });
      }
    
    onCameraError (error) {
        toast.dismiss();
        toast.error("Need camera permission to access the camera");
        console.error('onCameraError', error);
      }

    onTakePhotoAnimationDone (dataUri) {
        // ('takePhoto', dataUri);
        var newItem = {
            imgPreviewIndex: this.state.imgPreviewIndex+1,
            dataUri,
        }
        // this.props.saveUploadedDocsAction(newItem);
        Object.assign(newItem, {docCategoryVal: this.props.docCategoryVal});
        this.setState(prevState => ({
            imgItem: prevState.imgItem.concat(newItem),
            imgPreviewIndex: prevState.imgPreviewIndex+1,
        }));
        // this.props.saveUploadedDocsAction(this.state.imgItem);
        this.props.saveUploadedDocsAction(newItem);
        /* this.setState({
            imgItem:this.props.files
        })
        ("this.state.imgItem = ", this.state.imgItem) */
    }
    
   
}  

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
    removeUploadedDocsAction:removeUploadedDocsAction,
    saveUploadedDocsAction: saveUploadedDocsAction,
    saveValues: saveValuesAction,
    nextStep: nextStepAction,
    previousStep: previousStepAction,
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(CustomerCamera);
  
  