
  export function registerWorkDataAction(data) {
    //only test line below
    if(!data){
      return nextStepAction();
    }
        return function (dispatch) {
          dispatch(requestPosts());
          let jwt = localStorage.getItem("jwt");
          let RegistrationToken = localStorage.getItem("RegistrationToken");
          const request = {
            customerWorkData: {
              // CustomerId: data.CustomerId,
              CompanyName:data.CompanyName,
              WorkingPeriod: data.WorkingPeriod,
              WorkPhone: data.WorkPhone,
              Salary: data.Salary,
              PaymentFrequency: data.PaymentFrequency,
              RegistrationToken,
            }
          };
    
          var config = require('../../../Config/config.json');
    
          return fetch(config.apiUrl + "createCustomerWorkData", {
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
              // setTimeout(() => {
                /* if(data.CustomerContactId>0){
                  dispatch(updateCustomerContactAction(data));
                }
                else{
                  dispatch(registerCustomerContactAction(data));
                } */
                
                dispatch(registerReferencesAction(data));
                // dispatch(receivedPosts(result));
                // dispatch(nextStepAction());
              // }, 3000);
              }
          },
        );
    
        };
    
    }


    export function registerReferencesAction(data) {
      //only test line below
      if(!data){
        return nextStepAction();
      }
          return function (dispatch) {
            dispatch(requestPosts());
            let jwt = localStorage.getItem("jwt");
            let RegistrationToken = localStorage.getItem("RegistrationToken");
            const request = {
              customerReferencesData: {
                // CustomerId: data.CustomerId,
                FirstName:data.rfirstName,
                MiddleName: data.rmiddleName,
                LastName: data.rlastName,
                Salary: data.Salary,
                TelephoneNumber: data.rphone,
                Relationship: data.relationship,
                RegistrationToken,
              }
            };
      
            var config = require('../../../Config/config.json');
      
            return fetch(config.apiUrl + "createCustomerReferences", {
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
                // setTimeout(() => {
                  /* if(data.CustomerContactId>0){
                    dispatch(updateCustomerContactAction(data));
                  }
                  else{
                    dispatch(registerCustomerContactAction(data));
                  } */
                  dispatch(receivedPosts(result));
                  // dispatch(nextStepAction());
                // }, 3000);
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
    