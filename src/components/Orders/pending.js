import React, { Component } from 'react';
import HourGlass from '../Common/hourGlass';
import DataGrid from './data-grid';
import DataTable from './data-table';
import MuiDataTable from './mui-dt';
import { connect } from 'react-redux';
import {orderProcessAction, saveValuesAction, getOrderAction} from './../redux/actions/order-process/order-process-action'
import { toast, ToastContainer } from 'react-toastify';

class OrdersPending extends Component{
  constructor (props) {
    super (props);
    this.state = {
        asOf: new Date(),
        systemtoken: localStorage.getItem("SystemRegistrationToken"),
        orders: this.props.orderProcessData || [],
        isFetching: this.props.loading, //false,
        fetchError: null,

        orderData: this.props.orderProcessData || [],
    };
    this.saveValues = this.saveValues.bind(this);
    this.getOrders = this.getOrders.bind(this);

}

saveValues(key, value) {
    this.props.saveValuesAction(key, value);
  }
  componentWillUnmount(){
    }
getOrders(){
    this.props.saveValues("isFetching", true)
    this.setState({
        isFetching: true
    })
    //"getOrders PROMISE", this.props);
    //   return new Promise((resolve, reject) => {
          this.props.getOrderAction()
          .then(res=>{
              //"RES = ", res)
              //"this.props>>> = ", this.props.orderProcessData);
            //   this.props.saveValues("isFetching", false)
              this.setState({
                    isFetching: false,
                    // orders:this.props.orderProcessData,
                    // orderData:this.props.orderProcessData,
                })
                // resolve();
                //"RESOLVED", this.props);
          })
    //   });
    
  }
componentDidUpdate(){
    //"componentDidUpdate");
}
componentWillMount(){
    //"componentWillMount");
    /* .then( res => {
        //"RESOLVED", res)
    }) */
    
}
componentDidMount(){
    //"componentDidMount");
    /* this.setState({
        isFetching: true
    }) */
    if(this.state.systemtoken){
        this.getOrders()
    }

    

    /* var config = require('../../Config/config.json');
    this.setState({isFetching:true})
        fetch(config.apiUrl + "orders/pending/get", {
            method: 'GET', 
            headers: {
                Accept: 'application/json', 
                'Content-Type': 'application/json', 
                //Authorization: this.props.token
            }, 
            //body: JSON.stringify(request)
        })
        .then(response => response.json())
        .then(result => {
            //setTimeout(() => {
                
                // result.recordset.push({systemtoken:this.state.systemtoken})
                //"result = ", result);
                this.setState({orders: result.recordset});
                if(result.error){
                    throw new Error("Unauthorized user");
                }
                
                this.setState ({
                    isFetching: false,
                    fetchError: null,
                    isLoginFailed: false,
                });
                //this.forceUpdate();
            //}, 3000);
            this.props.saveValues("orderProcessData", this.state.orders);

        })
        .catch(e => {
            // //e); 
            this.setState({
                isFetching: false, 
                fetchError: e.message,
                isLoginFailed: true,
            });
        }); */
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
               Found {this.props.orderProcessData.length} pending orders
               <MuiDataTable data={this.props.orderProcessData?this.props.orderProcessData:[]} systemtoken={this.state.systemtoken} />
               {/* <MuiDataTable data={this.state.orders?this.state.orders:[]} systemtoken={this.state.systemtoken} /> */}
                {/* <DataTable data={this.state.orders?this.state.orders:[]}/>
                <br></br>
                <DataGrid data={this.state.orders?this.state.orders:[]} isFetching={this.state.isFetching}/>
                 */}
            </div>
        </div>
    )
}

}

// export default OrdersPending;

function mapStateToProps(state) {
    //"state = ",state)
    return {
        orderProcessData: state.orderProcess.orders,
        isFetching: state.orderProcess.isFetching,
        loading: state.orderProcess.loading,
    }
  }
  
  const mapDispatchToProps = {
    orderProcessAction: orderProcessAction,
    saveValues: saveValuesAction,
    getOrderAction: getOrderAction,
    }
  export default connect(mapStateToProps, mapDispatchToProps)(OrdersPending)

