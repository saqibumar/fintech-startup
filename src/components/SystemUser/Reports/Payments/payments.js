import React, { Component } from 'react';
import HourGlass from '../../../Common/hourGlass';
import DataGrid from './data-grid';
import DataTable from './data-table';
import MuiDataTable from './mui-dt';
import { connect } from 'react-redux';
//import {orderProcessAction, saveValuesAction, getOrderAction} from '../../../redux/actions/order-process/order-process-action'
import { saveValuesAction, getPaymentReportAction} from '../../../redux/actions/Reports/paymentProcessReport'

class Payments extends Component{
  constructor (props) {
    super (props);
    this.state = {
        asOf: new Date(),
        systemtoken: localStorage.getItem("SystemRegistrationToken"),
        payments: this.props.payments || [],
        isFetching: this.props.loading, //false,
        fetchError: null,
        
        paymentProcessReportData: this.props.data || [],
    };
    this.saveValues = this.saveValues.bind(this);
    this.getPaymentReport = this.getPaymentReport.bind(this);
}
    componentWillMount(){
    }
    saveValues(key, value) {
    this.props.saveValuesAction(key, value);
    }
    componentWillUnmount(){
    }

    getPaymentReport(){

    this.props.saveValues("isFetching", true);
    this.props.saveValues("startDate", this.props.startDate);
    this.props.saveValues("endDate", this.props.endDate);
    this.setState({
        isFetching: true
    })
    // return;
    //   return new Promise((resolve, reject) => {
            this.props.getPaymentReportAction()
            .then(res=>{
                //("RES = ", res)
            //   this.props.saveValues("isFetching", false)
                this.setState({
                    isFetching: false,
                    // orders:this.props.orderProcessData,
                    // orderData:this.props.orderProcessData,
                })
                // resolve();
                //("RESOLVED", this.props);
            })
    //   });

    }

    componentDidMount(){
    if(this.state.systemtoken && this.props.startDate && this.props.endDate){
        this.getPaymentReport()
    }

    }

render(){
    
    return (this.props.loading /* || this.state.isFetching */)? <div><HourGlass /></div>:
    (

        <div className="col-12">
            {/* <ToastContainer  /> */}
            <div hidden={!this.state.fetchError}>
                Operation failed - {this.state.fetchError}
            </div>
            <div hidden={this.state.fetchError}>
               Found {this.props.data.length} approved orders payments
               <MuiDataTable data={this.props.data?this.props.data:[]} systemtoken={this.state.systemtoken} xlsFilename={this.props.xlsFilename} />
               
            </div>
        </div>
    )
}

}

// export default OrdersPending;

function mapStateToProps(state) {
    return {
        paymentProcessReportData: state.paymentProcessReport.payments,
        isFetching: state.paymentProcessReport.isFetching,
        loading: state.paymentProcessReport.loading,
    }
  }
  
  const mapDispatchToProps = {
    getPaymentReportAction: getPaymentReportAction,
    saveValues: saveValuesAction,
    }
  export default connect(mapStateToProps, mapDispatchToProps)(Payments)

