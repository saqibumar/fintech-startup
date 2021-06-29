
    export function orderProcessAction(data) {
    
        return function (dispatch) {
          dispatch(requestProcess());
          let jwt = localStorage.getItem("jwt");
          // let RegistrationToken = localStorage.getItem("RegistrationToken");
          /* const request = {
              orderProcessData:data,            
          }; */
    
          var config = require('../../../../Config/config.json');
    
          return fetch(config.apiUrl + "orders/pending/get", {
              method: 'GET', 
              headers: {
                  Accept: 'application/json', 
                  'Content-Type': 'application/json', 
                  Authorization: `Bearer ${jwt}`
              }, 
              //body: JSON.stringify(request)
          })
          .then(
            response => response.json(),
            error => {
              dispatch(receivedError("Unable to process request"));
            },
          )
          .then((result) => {
            //saveValuesAction("orderProcessData", result.recordset)
            if(result)
            {
                // dispatch(registerReferencesAction(data));
                dispatch(finishProcess(result.recordset));
              }
              
          },
        );
    
        };
    
    }

    export function getOrderAction() {
        return function (dispatch) {
            //dispatch(saveValuesAction("isFetching", true));
            dispatch(requestProcess());
            let jwt = localStorage.getItem("jwt");
            // let RegistrationToken = localStorage.getItem("RegistrationToken");
            /* const request = {
                orderProcessData:data,            
            }; */
      
            var config = require('../../../../Config/config.json');
      
            return fetch(config.apiUrl + "orders/pending/get", {
                method: 'GET', 
                headers: {
                    Accept: 'application/json', 
                    'Content-Type': 'application/json', 
                    Authorization: `Bearer ${jwt}`
                }, 
                //body: JSON.stringify(request)
            })
            .then(
              response => response.json(),
              error => {
                dispatch(receivedError("Unable to process request"));
              },
            )
            .then((result) => {
              if(result){
                  // dispatch(registerReferencesAction(data));
                //   setTimeout(() => {      
                   // dispatch(saveValuesAction("isFetching", false));
                    dispatch(saveValuesAction("orders", result.recordset));
                      dispatch(finishProcess(result.recordset));
                //   }, 5000);
                }
            },
          );
      
          };
  
    }


      export function saveValuesAction(key, value) {
        return {
         type: "SAVE_VALUES",
          key, 
          value       
        }
      }
      
      export const requestProcess = () => ({
        type: 'REQUEST_PROCESS',
      });
      
      export const finishProcess = json => ({
        type: 'FINISH_PROCESS',
        json,
      });
      
      export const receivedError = () => ({
        type: 'RECEIVE_ERROR',
      });
    