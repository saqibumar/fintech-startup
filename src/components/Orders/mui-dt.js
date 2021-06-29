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
// import FileViewer from 'react-file-viewer';
import DocViewer from './docViewer';
import { connect } from 'react-redux';
import {orderProcessAction, saveValuesAction, getOrderAction} from './../redux/actions/order-process/order-process-action'

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
                { name: 'CustomerId', selector: 'CustomerId', sortable:true,  right: false, },
                { name: 'Name', selector: 'FirstName', sortable:true,  right: false, },
                { name: 'Amount', selector: 'OrderAmount', sortable:true,  right: false, },
                { name: 'DateTime', selector: 'OrderDateTime', sortable:true, format: d => moment(d.OrderDateTime).format('ll'), },
                { name: 'Status', selector: 'OrderStatus', sortable:true,
                cell: row => {
                  if(row.OrderStatus === 'Rejected' && row.RejectionDateTime!==null){
                    return <div>
                        {row.OrderStatus}
                    </div>
                  }
                  else if(row.OrderStatus === 'Approved' && row.CurrentOutstandingBalance<=0 && row.number_of_payments>0){
                    return <div>Paid</div>
                  }
                  else{
                    return <div>{row.OrderStatus}</div>
                  }
                }
                },
                { name: 'Effective on', selector: 'ApprovalDateTime', sortable:true, format: d => d.ApprovalDateTime?moment(d.ApprovalDateTime).format('ll'):d.RejectionDateTime?moment(d.RejectionDateTime).format('ll'):'-', },
                { name: 'No Of Payments', selector: 'number_of_payments', sortable:true, },
                { name: 'Balance Amount', selector: 'OrderAmount', sortable:true,  right: true, format: d => '$ '+d.CurrentOutstandingBalance, 
                cell: row => {
                  return <div>
                    {row.CurrentOutstandingBalance/* >0?row.CurrentOutstandingBalance:0 */}
                  </div>
                }
                },

                { name: 'Term(days)', selector: 'OrderTerm', sortable:true,  right: true, },
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
      /* if(this.props.data && this.props.data.length>0 && this.state.foundIndex>=0)
        {
          this.props.data[this.state.foundIndex].defaultExpanded = true; //!this.props.data[this.state.foundIndex].defaultExpanded;
          ">>>>> expanded", this.state.foundIndex)
        } */
        return (
            <Card style={{ height: '100%' }}>
                <DataTable
                    title="All Orders"
                    columns={this.state.columns}
                    /* data={this.state.data} */
                    data={this.props.data}
                    defaultSortField="OrderDateTime"
                    /* onRowSelected={this.handleChange}
                    selectableRows={true}
                    selectOnRowClicked */
                    /* onRowClicked={this.handleRowClicked} */
                    /* onRowDoubleClicked={this.handleRowDoubleClicked} */
                    sortIcon={sortIcon}
                    pagination
                    /* actions={actions}
                    contextActions={contextActions(this.rejectLoanRequest, this.approveLoanRequest)} */
                    expandableRows
                    expandableRowsComponent={<DocViewer token={this.state.systemtoken} />}
                    /* defaultExpandedField="defaultExpanded" */
                    expandOnRowClicked
                    /* expandOnRowDoubleClicked */
                    highlightOnHover
                    pointerOnHover
                    /* customTheme={darkTheme} */
                />
            </Card>
      )
    }
  };
  
  function getDocs(token){
    // return new Promise((resolve, reject) => {
        var config = require('../../Config/config.json');
        const request = {
            CustomerId: token.data.CustomerId
        }
        var obj={};
        //this.setState({isFetching:true})
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
            //    resolve(obj)
                    if(result.error){
                        // reject("Unable to process request");
                        throw new Error("Unauthorized user");
                    }  
                    
                    return obj;
                    
                            
            })
            .catch(e => {
                // reject("Unable to process request",e);
                // reject ("ERR")
            });
    // });
  }

  
  const SampleExpandedComponent = (token) => {
   let obj = getDocs(token);
    return (
        <div>
{
            (obj && obj.length>0) ?
            (
                <div>
                    <p style={{color:'lightyellow'}}>
                        CustomerId = {token.data.CustomerId}<br />
                        OrderId = {token.data.OrderId}
                    </p>
                    {/* obj.length>0 && 
                    obj.map(data => 
                    <FileViewer fileType={data.DocType} filePath={data.DocPath}
                         key={data.CustomerDocId}/>) */}
                </div>
            ):
            (<div>Loading...</div>)
        }
        </div>
        
    )
    
    // return (<div>Loading...</div>)
        
  }

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