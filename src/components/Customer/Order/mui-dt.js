import React from 'react';
import styled from 'styled-components';
import DataTable, { memoize } from 'react-data-table-component';
import Tooltip from '@material-ui/core/Tooltip';
import {Checkbox, TextField, Card, Button} from '@material-ui/core';
import Add from '@material-ui/icons/Add';
import Delete from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import FilterListIcon from '@material-ui/icons/FilterList';
import CheckIcon from '@material-ui/icons/Check';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import moment from 'moment';
import "./grid.css";

const sortIcon = <ArrowDownward />;
const actions = (
    <div>
         {/* <IconButton
            color="primary"
        >
            <Add />
        </IconButton> 
        <Tooltip title="Filter list">
        <IconButton aria-label="filter list">
            <FilterListIcon />
        </IconButton>
        </Tooltip> */}
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
  
  function currencyFormat(num) {
    let snum = parseFloat(num);
    if(num>999)
    {
        return '$' + snum.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
    else if(num<1000)
    return '$'+snum.toFixed(2);
  }

  class MuiDataTable extends React.Component {
      constructor(props){
          super(props);
          this.state = {
            systemtoken: props.systemtoken,
            toggledClearRows: false,
            columns: [
                { 
                  name: 'Id', selector: 'OrderId', sortable:true,  right: true, hide:'lg',
              },
                /* { name: 'CustomerId', selector: 'CustomerId', sortable:true,  right: true, }, */
                /* { name: 'Name', selector: 'FirstName', sortable:false, }, */
                { name: 'Balance Amount', selector: 'OrderAmount', sortable:true,  right: true, format: d => '$ '+d.CurrentOutstandingBalance, 
                cell: row => {
                  return <div>
                    {row.CurrentOutstandingBalance>0?currencyFormat(row.CurrentOutstandingBalance):0}
                  </div>
                }
                },
                { name: 'Order Date', selector: 'OrderDateTime', sortable:true,hide:'md', format: d => moment(d.OrderDateTime).format('ll'), },
                { name: 'Status', selector: 'OrderStatus', sortable:true, hide:'sm',
                  cell: row => {
                    if(row.OrderStatus === 'Rejected' && row.RejectionDateTime!==null){
                      return <div>
                          {row.OrderStatus}
                      </div>
                    }
                    else if(row.OrderStatus === 'Approved' && row.CurrentOutstandingBalance<=0 && row.number_of_payments>0){
                    return <div>Paid</div>
                    }
                    else
                    {
                      return <div>{row.OrderStatus}</div>
                    }
                  }
                 },
                { name: 'Effective on', selector: 'ApprovalDateTime', sortable:true, hide:'sm',  format: d => d.ApprovalDateTime?moment(d.ApprovalDateTime).format('ll'):d.RejectionDateTime?moment(d.RejectionDateTime).format('ll'):'-', },
                //{ name: 'RejectionDateTime', selector: 'RejectionDateTime', sortable:true, format: d => moment(d.RejectionDateTime).format('ll'), },
                { name: 'Term(days)', selector: 'OrderTerm', sortable:true,  right: true, hide:'lg', },
                {
                    name: 'Pay now',
                    button: true,
                    cell: row => {
                      let dateDifference = datediff(parseDate(moment().format('MM/DD/YYYY')), parseDate(moment(row.ApprovalDateTime).format('MM/DD/YYYY')));
                      // dateDifference)
                      if(row.OrderStatus === 'Approved' && dateDifference<0 && row.CurrentOutstandingBalance>0)
                      {
                        
                        let hlink = "/customer/payments/"+row.OrderId+"/"+row.CurrentOutstandingBalance;
                      return <a href={hlink} rel="noopener noreferrer">Pay {/*row.OrderId*/}</a>
                      }
                      return <div>-</div>
                    },
                  },
                  {
                    name: 'Statement',
                    button: true, hide:'md',
                    cell: (row) => {
                        if(row.OrderStatus === 'Approved')
                        {
                          let hlink = "/customer/statement/"+row.OrderId;
                          return <a href={hlink} rel="noopener noreferrer">View {/*row.OrderId*/}</a>
                        }
                        return (
                            <div>                                
                               -
                            </div>)
                }
                  },
            ],
            data: props.data,
            foundIndex:-1,
          }
          
          this.saveValues = this.saveValues.bind(this);
      }
      

      saveValues(key, value) {
        this.props.saveValuesAction(key, value);
      }

      /* handleChange = state => {
        'state', state.selectedRows);
        this.setState({ selectedRows: state.selectedRows });
      } */
      handleRowClicked = (row, index) => {
        if(row.OrderStatus === 'Approved')
                        {
                          let hlink = "/customer/statement/"+row.OrderId;
                          window.location.href=hlink;
                        }
        // row, index);
       /*  if(this.state.data && this.state.data.length>0)
        {
          // this.state.data[1].defaultExpanded = true;
          const data = this.state.data;
          data[1].defaultExpanded = true;
        }
        
        let foundIndex = (this.state.data.findIndex((a, index) => {
          // "index = ", index, a);
          if(this.state.data[index].defaultExpanded)
          {
              // "a = ", a, index);
              "isEqual = ",index, (a.OrderId === row.OrderId))
              // this.state.data[index].defaultExpanded = false;
              // this.state.data[index].defaultExpanded = (a.OrderId === row.OrderId);
          }

          return (a.OrderId === row.OrderId)
        }))
        // this.state.data[foundIndex].defaultExpanded = true;
        "foundIndex ROW = ", foundIndex)
        `${row.OrderId}/${row.CustomerId} was clicked!`);
        this.setState({
          foundIndex
        }) */

      }
      handleRowDoubleClicked = (row)=>{
        // row)
      }

      /* rejectLoanRequest = () => {
        const { selectedRows } = this.state;
        const rows = selectedRows.map(r => r.OrderId);
        // eslint-disable-next-line no-alert
        if (window.confirm(`Are you sure you want to reject:\r ${rows}?`)) {
          //this.setState(state => ({ toggleCleared: !state.toggleCleared, data: differenceBy(state.data, state.selectedRows, 'name') }));
        }
      }
      approveLoanRequest = () => {
        const { selectedRows } = this.state;
        const rows = selectedRows.map(r => r.OrderId);
        // eslint-disable-next-line no-alert
        if (window.confirm(`Are you sure you want to approve:\r ${rows}?`)) {
          //this.setState(state => ({ toggleCleared: !state.toggleCleared, data: differenceBy(state.data, state.selectedRows, 'name') }));
        }
      } */
      componentWillUnmount(){
        this.setState({
          systemtoken: '',
            toggledClearRows: true,
            columns: [],
            data: '',
        })

        
          
      
      }
    render() {
        return (
            <Card style={{ height: '100%' }}>
                <DataTable actions={actions}
                    title="Loan Orders"
                    columns={this.state.columns}
                    /* data={this.state.data} */
                    data={this.props.data}
                    defaultSortField="OrderDateTime"
                    /* onRowSelected={this.handleChange}
                    selectableRows={true}
                    selectOnRowClicked */
                    onRowClicked={this.handleRowClicked}
                    /* onRowDoubleClicked={this.handleRowDoubleClicked} */
                    sortIcon={sortIcon}
                    pagination
                    /* contextActions={contextActions(this.rejectLoanRequest, this.approveLoanRequest)} */
                    highlightOnHover
                    pointerOnHover
                    /* customTheme={darkTheme} */
                />
            </Card>
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

  export default MuiDataTable


  function parseDate(str) {
    var mdy = str.split('/');
    return new Date(mdy[2], mdy[0]-1, mdy[1]);
}

function datediff(first, second) {
    // Take the difference between the dates and divide by milliseconds per day.
    // Round to nearest whole number to deal with DST.
    return Math.round((second-first)/(1000*60*60*24));
}