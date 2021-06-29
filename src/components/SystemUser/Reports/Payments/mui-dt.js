import React from 'react';
import styled from 'styled-components';
import DataTable, { memoize } from 'react-data-table-component';
import Tooltip from '@material-ui/core/Tooltip';
import {Checkbox, TextField, Card} from '@material-ui/core';
import Add from '@material-ui/icons/Add';
import Delete from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import FilterListIcon from '@material-ui/icons/FilterList';
import CheckIcon from '@material-ui/icons/Check';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import moment from 'moment';
import "./data-grid.css";
import { connect } from 'react-redux';
import {orderProcessAction, saveValuesAction, getOrderAction} from './../../../redux/actions/order-process/order-process-action'
import { CSVLink } from "react-csv";

const sortIcon = <ArrowDownward />;
const actions = (
    <div>
        {/* <IconButton
            color="primary"
        >
            <Add />
        </IconButton> */}
        <Tooltip title="Filter list">
        <IconButton aria-label="filter list">
            <FilterListIcon />
        </IconButton>
        </Tooltip>
    </div>

);  
const contextActions = memoize((rejectHandler, approveHandler) => (
    <div>
    <Tooltip title="Reject">
    <IconButton
      color="primary"
      onClick={rejectHandler}>
      <Delete />
    </IconButton>
    </Tooltip>
    <Tooltip title="Approve">
    <IconButton aria-label="check" color="primary" onClick={approveHandler}>
      <CheckIcon />
    </IconButton>
  </Tooltip>
    </div>

  ));
  
  class MuiDataTable extends React.Component {
      constructor(props){
          super(props);
          this.state = {
            systemtoken: props.systemtoken,
            toggledClearRows: false,
            columns: [
                { name: 'OrderId', selector: 'OrderId', sortable:true,  right: false, },
                { name: 'PaymentId', selector: 'PaymentId', sortable:true,  right: false, },
                { name: 'Payment', selector: 'Payment', sortable:true,  right: false, },
                { name: 'DateTime', selector: 'PaymentDateTime', sortable:true, format: d => moment.utc(d.PaymentDateTime).format('ll'), },
                { name: 'Status', selector: 'PaymentStatus', sortable:true, right:false},
                { name: 'Interest', selector: 'InterestRate', sortable:true, },
                { name: 'Iva', selector: 'PaymentTowardsIva', sortable:true, },
                { name: 'Towards Interest', selector: 'PaymentTowardsInterest', sortable:true
                },
                { name: 'Towards Loan', selector: 'PaymentTowardsLoan', sortable:true, },
                 {
                  name: 'Statement',
                  button: true,
                  cell: (row) => {
                      //if(row.OrderStatus === 'Approved')
                      {
                        let hlink = "/SystemUser/statement/"+row.OrderId+"/"+row.CustomerId;
                        return <a href={hlink} rel="noopener noreferrer">View {/*row.OrderId*/}</a>
                      }
              }
                },
            ],
            headers: [
              {label: "PaymentId", key: "PaymentId"}, 
              {label: "OrderId", key: "OrderId"}, 
              {label: "PaymentDateTime", key: "PaymentDateTime"}, 
              {label: "Payment", key: "Payment"}, 
              {label: "PaymentStatus", key: "PaymentStatus"}, 
              {label: "PaymentTowardsInterest", key: "PaymentTowardsInterest"}, 
              {label: "PaymentTowardsLoan", key: "PaymentTowardsLoan"}, 
              {label: "PaymentTowardsIva", key: "PaymentTowardsIva"}, 
              {label: "OrderAmount", key: "OrderAmount"}, 
              {label: "CurrentOutstandingBalance", key: "CurrentOutstandingBalance"},
              {label: "ApprovalDateTime", key: "ApprovalDateTime"},

            ],
            data: props.data,
            foundIndex:-1,
            xlsFilename: this.props.xlsFilename,
          }
          
          this.saveValues = this.saveValues.bind(this);
          /* let ddate = '2019-12-06T00:00:00.000Z';
          (
            moment.utc(ddate).format('ll')
          ) */

      }
      

      saveValues(key, value) {
        this.props.saveValuesAction(key, value);
      }

      handleRowClicked = (row, index) => {

      }
      handleRowDoubleClicked = (row)=>{
        // (row)
      }

      componentWillUnmount(){
        ("UNMOUNTING...");
        this.setState({
          systemtoken: '',
            toggledClearRows: true,
            columns: [],
            data: '',
        })
      }
    render() {
      /* if(this.props.data && this.props.data.length>0 && this.state.foundIndex>=0)
        {
          this.props.data[this.state.foundIndex].defaultExpanded = true; //!this.props.data[this.state.foundIndex].defaultExpanded;
          (">>>>> expanded", this.state.foundIndex)
        } */
        let data=this.props.data;
        data = data.map(row => ({...row, PaymentDateTime: moment(row.PaymentDateTime).format("YYYY-MM-DD").toString(), ApprovalDateTime:moment(row.ApprovalDateTime).format("YYYY-MM-DD").toString() }))
        return (

          <div className="row">
            {/* <div className="col-12"> 
<CSVLink data={data} headers={this.state.headers} filename={`PaymentReport_${this.props.xlsFilename}.csv`}
  className="pull-right btn btn-primary csvLink">
  Download Excel ({this.props.xlsFilename})
</CSVLink>
            </div> */}
            <div className="col-12"> 
              <CSVLink data={data} headers={this.state.headers} filename={`PaymentReport_${this.props.xlsFilename}.csv`}
              style={{position:'absolute', right: 0, zIndex:1}}
              className="pull-right btn btn-primary csvLink">
              Download Excel ({this.props.xlsFilename})
              </CSVLink>
            <Card style={{ height: '100%' }}>
                <DataTable
                    title="Payments"
                    columns={this.state.columns}
                    data={this.props.data}
                    defaultSortField="PaymentDateTime"
                    sortIcon={sortIcon}
                    pagination
                    expandOnRowClicked
                    highlightOnHover
                    pointerOnHover
                />
                
            </Card>
            </div>
            {/* <table>
              <tbody>
            {
                //createTableWithFee(this.state.numberOfDays, this.props.data.OrderAmount)
            }
            </tbody>
            </table> */}
          </div>
      )
    }
  };
  

  const darkTheme = {
    title: {
      fontSize: '22px',
      fontColor: '#FFFFFF',
      backgroundColor: '#363640',
    },
    contextMenu: {
      backgroundColor: '#E91E63',
      fontColor: '#FFFFFF',
    },
    header: {
      fontSize: '12px',
      fontColorActive: 'FFFFFF',
      fontColor: '#FFFFFF',
      backgroundColor: 'gray',
      borderColor: 'rgba(255, 255, 255, .12)',
    },
    rows: {
      fontColor: 'black',
      backgroundColor: 'silver',
      borderColor: 'rgba(255, 255, 255, .12)',
      hoverFontColor: 'blue',
      hoverBackgroundColor: 'rgba(0, 0, 0, .24)',
    },
    cells: {
      cellPadding: '48px',
    },
    pagination: {
      fontSize: '13px',
      fontColor: '#FFFFFF',
      backgroundColor: '#363640',
      buttonFontColor: '#FFFFFF',
      buttonHoverBackground: 'rgba(255, 255, 255, .12)',
    },
    expander: {
      fontColor: '#FFFFFF',
      backgroundColor: '#363640',
      expanderColor: '#FFFFFF',
    },
    footer: {
      separatorColor: 'rgba(255, 255, 255, .12)',
    },
  };

  // export default MuiDataTable;

  function mapStateToProps(state) {
    return {
        orderProcessData: state.orderProcess.orderProcessData
    }
  }
  
  const mapDispatchToProps = {
    // orderProcessData: orderProcessAction,
    // saveValues: saveValuesAction,

    orderProcessData: orderProcessAction,
    saveValues: saveValuesAction,
    getOrderAction: getOrderAction,

    }
  export default connect(mapStateToProps, mapDispatchToProps)(MuiDataTable)

  
function parseDate(str) {
  var mdy = str.split('/');
  return new Date(mdy[2], mdy[0]-1, mdy[1]);
}

function datediff(first, second) {
  // Take the difference between the dates and divide by milliseconds per day.
  // Round to nearest whole number to deal with DST.
  return Math.round((second-first)/(1000*60*60*24));
}

function currencyFormat(num) {
  let snum = parseFloat(num);
  if(num>999)
  {
      return '$' + snum.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }
  else if(num<1000)
  return '$'+snum.toFixed(2);
}