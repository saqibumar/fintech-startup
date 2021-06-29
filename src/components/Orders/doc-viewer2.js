import React from 'react'
import HourGlass from '../Common/hourGlass';

import FileViewer from 'react-file-viewer';

import Tooltip from '@material-ui/core/Tooltip';
import Delete from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import CheckIcon from '@material-ui/icons/Check';
import { connect } from 'react-redux';
import {orderProcessAction, saveValuesAction, getOrderAction} from './../redux/actions/order-process/order-process-action'
import { toast, ToastContainer } from 'react-toastify';

class DocViewer extends React.Component
{
    constructor(props){
        super(props);
        this.state = {
            isFetching: false, 
            fetchError: null, 
            tokenData: this.props,
            data:{},
            isRejection:false,
            rejectionReason:'',
        }
        this.saveValues = this.saveValues.bind(this);
    }

    saveValues(key, value) {
        "this.saveValues")
        this.props.saveValuesAction(key, value);
      }

    componentDidMount(){
        "props", this.props);
        this.getDocs(this.props);
        if(this.props.data.OrderStatus === "New"){
            this.updateLoanStatus("Pending")
        }
    }

    renderFileViewer(data){
        return(
            data.map((data, index) => {
                var config = require('../../Config/config.json');
                // "SPLITTING", data.DocType)
                let splitDocType;
                if(data.DocType)
                    splitDocType = data.DocType.split("/");
                if(splitDocType && splitDocType[1]){
                    splitDocType = splitDocType[1];
                    splitDocType = splitDocType.split(";")[0]
                }
                let docType = splitDocType; //"png";
                let splitDocPath = data.DocPath.split("./Uploads/");
                let docPath = config.apiUrl + splitDocPath[1];
                
                return (
                <div key={"row"+data.CustomerDocId+index} className="row"> 
                    <div key={"col-"+data.CustomerDocId+index} className="col-lg-12 text-left"> 
                <a href={docPath} target="_new">{data.DocName} - {docPath}</a>
                                
                    {/*  <FileViewer fileType={docType} filePath={docPath}
                            key={"file_"+data.CustomerDocId+index}/> */}
                    </div>
                </div>)
            })
        )
        
    }

    getOrders(){
        this.props.saveValues("isFetching", true)
        this.setState({
            isFetching: true
        })
        "getOrders PROMISE", this.props);
          return new Promise((resolve, reject) => {
              this.props.getOrderAction()
              .then(res=>{
                  "RES = ", res)
                  "this.props>>> = ", this.props.orderProcessData);
                  this.props.saveValues("isFetching", false)
                  this.setState({
                        isFetching: false,
                        orders:this.props.orderProcessData,
                        orderData:this.props.orderProcessData,
                    })
                    resolve();
                    "RESOLVED", this.props);
              })
          });
        
      }

    render(){
        if(this.state.isFetching === true){
            return <HourGlass />
        }
        return(
            <div className="container container_expanded">
            <ToastContainer />
                <div className="row">
                    <strong>Supporting documents</strong>
                </div>
                {(this.state.data && this.state.data.length>0)? this.renderFileViewer(this.state.data):(<HourGlass />)}
                
                 {/* { this.state.data.length>0 && 
                    this.state.data.map((data, index) => {
                        var config = require('../../Config/config.json');
                        "SPLITTING", data.DocType)
                        let splitDocType;
                        if(data.DocType)
                            splitDocType = data.DocType.split("/");
                        if(splitDocType && splitDocType[1]){
                            splitDocType = splitDocType[1];
                            splitDocType = splitDocType.split(";")[0]
                            "splitDocType = ", splitDocType);
                        }
                        // splitDocType = splitDocType.split(";");
                        
                        let docType = splitDocType; //"png";
                        let splitDocPath = data.DocPath.split("./Uploads/");
                        // splitDocPath);
                        let docPath = config.apiUrl + splitDocPath[1];
                        // docPath)
                        return (
                        <div key={data.CustomerDocId+index} className="row"> 
                            <div key={"col-"+data.CustomerDocId+index} className="col">                                 
                                <FileViewer fileType={docType} filePath={docPath}
                                    key={data.CustomerDocId+index}/>
                            </div>
                        </div>)
                    })
                } */}
                <div className="row">
                    <hr style={{width:'100%'}} />
                    <strong>Account info</strong>
                </div>
                <div className="row">                
                    <div className="col-4 text-left">
                    <strong>AccountDesc: </strong> {this.props.data.AccountDesc}
                    </div>
                    <div className="col-4 text-left">
                    <strong>AccountName: </strong> {this.props.data.AccountName}
                    </div>
                    <div className="col-4 text-left">
                    <strong>BankAccountNumber: </strong> {this.props.data.BankAccountNumber}
                    </div>
                    <div className="col-4 text-left">
                        <strong>CURP: </strong> {this.props.data.CURP}
                    </div>
                    <div className="col-4 text-left">
                    <strong>RFC: </strong> {this.props.data.RFC}
                    </div>
                 </div>
                <div className="row">
                    <hr style={{width:'100%'}} />
                    <strong>Work info</strong>
                </div>
                 <div className="row">                
                    <div className="col-4 text-left">
                        <strong>CompanyName: </strong> {this.props.data.CompanyName}
                    </div>
                    <div className="col-4 text-left">
                        <strong>Phone: </strong> {this.props.data.WorkPhone}
                    </div>
                    <div className="col-4 text-left">
                        <strong>Salary: </strong> {this.props.data.Salary}
                    </div>
                    <div className="col-4 text-left">
                    <strong>PaymentFrequency: </strong> {this.props.data.PaymentFrequency}
                    </div>
                    <div className="col-4 text-left">
                    <strong>WorkingPeriod: </strong> {this.props.data.WorkingPeriod}
                    </div>
                </div>

                <div className="row">
                    <hr style={{width:'100%'}} />
                    <strong>Order info</strong>
                </div>
                 <div className="row">    
                    <div className="col-4 text-left">
                        <strong>OrderAmount: </strong> {this.props.data.OrderAmount}
                    </div>
                    <div className="col-4 text-left">
                        <strong>Order Terms: </strong> {this.props.data.OrderTerm}
                    </div>
                    <div className="col-4 text-left">
                        <strong>Justified Order Amount: </strong> {this.props.data.JustifiedOrderAmount}
                    </div>
                </div>

                <div className="row">
                    <hr style={{width:'100%'}} />
                    <strong>Personal info</strong>
                </div>
                 <div className="row">                
                    <div className="col-4 text-left">
                        <strong>Name: </strong> {this.props.data.FirstName} {this.props.data.MiddleName} {this.props.data.LastName}
                    </div>
                    <div className="col-4 text-left">
                        <strong>Gender: </strong> {this.props.data.Gender}
                    </div>
                    <div className="col-4 text-left">
                        <strong>Phone: </strong> {this.props.data.Phone}
                    </div>
                    <div className="col-4 text-left">
                        <strong>Email: </strong> {this.props.data.Email}
                    </div>
                </div>
                <div className="row">
                    <hr style={{width:'100%'}} />
                    <strong>Contact info</strong>
                </div>
                 <div className="row">                
                    <div className="col-4 text-left">
                        <strong>Address: </strong> {this.props.data.Street} No. {this.props.data.ExteriorNumber}/{this.props.data.InteriorNumber},
                        {this.props.data.Colony},  {this.props.data.Town}, {this.props.data.City}, {this.props.data.State} {this.props.data.Country} 
                        {this.props.data.Zip} 
                    </div>
                    <div className="col-4 text-left">
                        <strong>Fixed Phone: </strong> {this.props.data.FixedPhone}
                    </div>
                    <div className="col-4 text-left">
                        <strong>Mobile Phone: </strong> {this.props.data.MobilePhone}
                    </div>
                </div>

                <div className="row">
                    <hr style={{width:'100%'}} />
                    <div className="col-12 text-right">
                        <div style={{color:'red'}} hidden={this.state.rejectionReason || !this.state.isRejection}>This field can not be blank</div>
                        <textarea col="10" rows="5" style={{width: "100%"}} 
                        onChange={(e)=>{
                            let val=e.target.value;
                            this.setState({
                                rejectionReason:val,
                            })
                        }}
                        hidden={!this.state.isRejection} defaultValue={this.state.rejectionReason}
                        placeholder="Reason to disapprove"></textarea>
                    </div>
                    <div className="col-12 text-right">
                    <Tooltip title="Reject">
                        <IconButton
                        color="primary"
                        onClick={this.rejectLoanRequest}>
                        <Delete />
                        </IconButton>
                        </Tooltip>
                        <Tooltip title="Approve">
                        <IconButton aria-label="check" color="primary" 
                        onClick={this.approveLoanRequest}>
                        <CheckIcon />
                        </IconButton>
                    </Tooltip>
                    </div>
                </div>

            </div>
        )
    }

    updateLoanStatus = (orderStatus) => {
        this.props.data.OrderId)
        //if (this.state.rejectionReason && window.confirm(`Are you sure you want to reject order id:\r ${this.props.data.OrderId}?`)) 
        {
            //this.setState(state => ({ toggleCleared: !state.toggleCleared, data: differenceBy(state.data, state.selectedRows, 'name') }));
            this.setState({
                isFetching:true
            })
            var config = require('../../Config/config.json');
            const request = {
                OrderId: this.props.data.OrderId,
                OrderStatus: orderStatus,
                RejectionReason: this.state.rejectionReason,
            };
            fetch(config.apiUrl + "orders/status/update", {
                method: 'PUT', 
                headers: {
                    //Accept: 'application/json', 
                    'Content-Type': 'application/json', 
                    //Authorization: this.props.token
                }, 
                body: JSON.stringify(request)
            })
            .then(response => response.json())
            .then(result => {
                //setTimeout(() => {
                    if(result.error){
                        throw new Error(result.error.message);
                    }
                    this.setState ({
                        isFetching: false, 
                        fetchError: null,       
                    });
                    //toast.success(`Loan Order '${this.props.data.OrderId}' has been rejected`);
                    //setTimeout(() => {
                        //this.getOrders()
                    // }, 1000);
                    //this.forceUpdate();
                //}, 3000);

            })
            .catch(e => {
                e); 
                this.setState({
                    isFetching: false, 
                    fetchError: e.message,
                });
                toast.error("Operation failed with error. ", e.message);
            });
            
          }
    }

    rejectLoanRequest = (e) => {
        this.props.data.OrderId)
        if(!this.state.isRejection){
            this.setState({
                isRejection:true,
            })
        }
        if (this.state.rejectionReason && window.confirm(`Are you sure you want to reject order id:\r ${this.props.data.OrderId}?`)) {
            //this.setState(state => ({ toggleCleared: !state.toggleCleared, data: differenceBy(state.data, state.selectedRows, 'name') }));
            this.setState({
                isFetching:true
            })
            var config = require('../../Config/config.json');
            const request = {
                OrderId: this.props.data.OrderId,
                OrderStatus: "Rejected",
                RejectionReason: this.state.rejectionReason,
            };
            fetch(config.apiUrl + "orders/status/update", {
                method: 'PUT', 
                headers: {
                    //Accept: 'application/json', 
                    'Content-Type': 'application/json', 
                    //Authorization: this.props.token
                }, 
                body: JSON.stringify(request)
            })
            .then(response => response.json())
            .then(result => {
                //setTimeout(() => {
                    if(result.error){
                        throw new Error(result.error.message);
                    }
                    this.setState ({
                        isFetching: false, 
                        fetchError: null,       
                    });
                    this.sendEmail("Rejected")
                    .then(res=>{
                        "Email sent....", res)
                        toast.success(`Email sent to '${this.props.data.Email}'.`);
                        this.getOrders()
                        .then(res2=>{
                            "getOrders....", res2)
                            toast.success(`Loan Order '${this.props.data.OrderId}' has been rejected`);
                        })
                    })
                    
                    // toast.success(`Loan Order '${this.props.data.OrderId}' has been rejected`);
                    // //setTimeout(() => {
                    //     this.getOrders()
                    // }, 1000);
                    //this.forceUpdate();
                //}, 3000);

            })
            .catch(e => {
                e); 
                this.setState({
                    isFetching: false, 
                    fetchError: e.message,
                });
                toast.error("Operation failed with error. ", e);
            });
            
          }

    }

    approveLoanRequest = (e) => {
    this.props.data.OrderId)
    if (window.confirm(`Are you sure you want to approve order number:\r ${this.props.data.OrderId}?`)) {
        //this.setState(state => ({ toggleCleared: !state.toggleCleared, data: differenceBy(state.data, state.selectedRows, 'name') }));
        this.setState({
            isFetching:true
        })
        var config = require('../../Config/config.json');
        const request = {
            OrderId: this.props.data.OrderId,
            OrderStatus: "Approved",
        };
        fetch(config.apiUrl + "orders/status/update", {
            method: 'PUT', 
            headers: {
                //Accept: 'application/json', 
                'Content-Type': 'application/json', 
                //Authorization: this.props.token
            }, 
            body: JSON.stringify(request)
        })
        .then(response => response.json())
        .then(result => {
            //setTimeout(() => {
                if(result.error){
                    throw new Error(result.error.message);
                }
                this.setState ({
                    isFetching: false, 
                    fetchError: null,       
                });
                //this.forceUpdate();
            //}, 3000);
            // setTimeout(() => {
                this.sendEmail("Approved")
                .then(res=>{
                    "Email sent....", res)
                    toast.success(`Email sent to '${this.props.data.Email}'.`);
                    this.getOrders()
                    .then(res2=>{
                        "getOrders....", res2)
                        toast.success(`Loan Order '${this.props.data.OrderId}' has been approved`);
                    })
                })

                
            // }, 1000);
        })
        .catch(e => {
            e); 
            this.setState({
                isFetching: false, 
                fetchError: e.message,
            });
            toast.error("Operation failed with error. ", e);
        });
        }
    }

    getDocs(token){
        token)
        this.setState({
            isFetching:true,
        })
        // return new Promise((resolve, reject) => {
            var config = require('../../Config/config.json');
            const request = {
                CustomerId: token.data.CustomerId
            }
            request);
            var obj={};
                fetch(config.apiUrl + "admin/documents/get", {
                    method: 'POST', 
                    headers: {
                        Accept: 'application/json', 
                        'Content-Type': 'application/json', 
                        // Authorization: token.token
                    }, 
                    body: JSON.stringify(request)
                })
                .then(response => response.json())
                .then(result => {
                    obj = result.recordset;
                    this.setState({
                        data:result.recordset,
                        isFetching:false,
                        fetchError:null
                    })

                //    resolve(obj)
                        if(result.error){
                            // reject("Unable to process request");
                            throw new Error("Unauthorized user");
                        }  
                        
                        "obj = ", obj);
                        return obj;
                        
                                
                })
                .catch(e => {
                    // reject("Unable to process request",e);
                    this.setState({
                        data:null,
                        isFetching:false,
                        fetchError:e
                    })
                    e); 
                    // reject ("ERR")
                });
        // });
    }

    sendEmail = (status) => 
    {
    this.setState({
        isFetching: true,
    })
    
    return new Promise((resolve, reject) => {

        const request = {
            Email: this.props.data.Email
        };
        //TODO: store api URL in a config file
        var config = require('../../Config/config.json');
        var email_endPoint='';
        switch (status) {
            case 'Approved':
                email_endPoint = "orders/emails/emailToCustomer";
                break;
            case 'Rejected':
                email_endPoint = "orders/emails/rejectionEmailToCustomer";
                break;
            case 'Pending':
                email_endPoint = "orders/emails/pendingEmailToCustomer";
                break;
            default:
                email_endPoint = "orders/emails/pendingEmailToCustomer";
                break;
        }

        fetch(config.apiUrl + email_endPoint, {
            method: 'POST', 
            headers: {
                //Accept: 'application/json', 
                'Content-Type': 'application/json', 
                //Authorization: this.props.token
            }, 
            body: JSON.stringify(request)
        })
        //.then(response => response.json())
        .then(result => {
            "RESULT = > ",result)
            //setTimeout(() => {
                if(result.error){
                    toast.error("Operation failed with error. ", result.error);
                    throw new Error(result.error.message);
                }
                this.setState ({
                    isFetching: false, 
                    fetchError: null,       
                });
                resolve("Email sent");
                toast.success("Email sent");
                //this.forceUpdate();
            //}, 3000);
    
        })
        .catch(e => {
            "ERROR=>",e)
            this.setState({
                isFetching: false, 
                fetchError: e.message,
            });
            toast.error("Error in sending email ");
            reject("Error in sending email");
        });
    });        

    }
}

// export default DocViewer;

const mapDispatchToProps = {
    orderProcessData: orderProcessAction,
    saveValues: saveValuesAction,
    getOrderAction: getOrderAction,
}
function mapStateToProps(state) {
    state)
    return {
        orderProcessData: state.orderProcess.orderProcessData
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DocViewer)
