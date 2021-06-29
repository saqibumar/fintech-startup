
  export function customerAccountDataAction(data) {
    //only test line below
    if(!data){
      return nextStepAction();
    }
        return function (dispatch) {
          dispatch(requestPosts());
          let jwt = localStorage.getItem("jwt");
          let RegistrationToken = localStorage.getItem("RegistrationToken");
          const request = {
            customerAccountData: {
              BankAccountNumber:data.BankAccountNumber,
              AccountTypeId:1,
              CURP: data.CURP,
              RFC: data.RFC,
              RegistrationToken,
            }
          };
    
          var config = require('../../../Config/config.json');
    
          return fetch(config.apiUrl + "createCustomerAccount", {
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
                dispatch(receivedPosts(result));
                // dispatch(nextStepAction());
              }
          },
        );
    
        };
    
    }


    export function nextStepAction() {
        // "REDUX REGISTRATION ACTION = ");
    
          return {
            type: "NEXT_STEP",
          }
        
        }
      
      export function previousStepAction() {
      
        return {
          type: "PREVIOUS_STEP",
        }
      
      } 
       
      
      export function saveValuesAction(key, value) {
        return {
         type: "SAVE_VALUES",
          key, 
          value       
        }
      }
      
      export const requestPosts = () => ({
        type: 'REQUEST_POSTS',
      });
      
      export const receivedPosts = json => ({
        type: 'RECEIVE_POSTS',
        json,
      });
      
      export const receivedError = () => ({
        type: 'RECEIVE_ERROR',
      });
    