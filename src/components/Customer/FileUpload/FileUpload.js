import React from 'react';
import Upload from "../FileUpload/upload/Upload";
import './FileUpload.css';

class FileUpload extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            title:this.props.uploadTitle,
        }
    }
    
    render(){
        return(
            <div className="row">
                <div className="col-12">
                    <div className="Main">
                        <div className="Card">
                            <Upload docCategoryVal={this.props.docCategoryVal} uploadTitle={this.props.uploadTitle}/>
                        </div>
                        </div>
                </div>
            </div>
        )
    }

}

export default FileUpload;
