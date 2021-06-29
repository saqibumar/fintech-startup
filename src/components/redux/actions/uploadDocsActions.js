
  export function uploadDocsDataAction(data) {
        
        return function (dispatch) {
            if(!data){
                dispatch(receivedError("No data to process"));

                return;
            }
            dispatch(requestPosts());
            let jwt = localStorage.getItem("jwt");
            let RegistrationToken = localStorage.getItem("RegistrationToken");
            const request = {
            customerUploadDocsData: {
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
                // dispatch(registerReferencesAction(data));
                }
            },
        );

        }
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

    export function saveUploadedDocsAction(files) {
      return {
        type: "UPLOADED_DOCS",
        files     
      }
    }
    export function removeUploadedDocsAction(files) {
      return {
        type: "REMOVE_DOCS",
        files     
      }
    }
    