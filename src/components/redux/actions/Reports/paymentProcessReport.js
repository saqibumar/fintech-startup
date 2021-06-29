
    export function getPaymentReportAction(data) {
        
        return function (dispatch) {
            if(data)
            {

                dispatch(requestProcess());
                let jwt = localStorage.getItem("jwt");
                // let RegistrationToken = localStorage.getItem("SystemRegistrationToken");
                const request = {
                    StartDate:data.StartDate,
                    EndDate:data.EndDate,
                };
          
                var config = require('../../../../Config/config.json');
          
                return fetch(config.apiUrl + "GetPaymentReport", {
                    method: 'POST', 
                    headers: {
                        Accept: 'application/json', 
                        'Content-Type': 'application/json', 
                        Authorization: `Bearer ${jwt}`
                    }, 
                    body: JSON.stringify(request)
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
                        dispatch(saveValuesAction("payments", result.recordset));
                          dispatch(finishProcess(result.recordset));
                    //   }, 5000);
                    }
                },
              );
          
              };
            }
            //dispatch(saveValuesAction("isFetching", true));
  
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
    