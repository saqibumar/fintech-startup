import React from 'react';
import MaterialTable from 'material-table';
import HourGlass from '../Common/hourGlass';

export default function DataGrid(props) {
  const [state, setState] = React.useState({
    columns: [
        { title: 'OrderId', field: 'OrderId', type:'numeric' },
        { title: 'CustomerId', field: 'CustomerId', type:'numeric' },
        { title: 'Name', field: 'FirstName', type:'string' },
        { title: 'OrderAmount', field: 'OrderAmount', type: 'numeric' },
        { title: 'OrderDateTime', field: 'OrderDateTime', type:'date' },
        { title: 'OrderStatus', field: 'OrderStatus', type:'string' },
        { title: 'OrderTerm(days)', field: 'OrderTerm', type: 'numeric' },
        
    ],
    data: props.data,
  });
  if (props.isFetching) {
    return <div><HourGlass /></div>;
}

  return (
    <MaterialTable width="100%"
      title="Pending orders2"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setState(prevState => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState(prevState => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setState(prevState => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
    />
  );
}