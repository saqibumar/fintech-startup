import { toast } from 'react-toastify';

  export function nextStepAction() {
    // "REDUX REGISTRATION ACTION = ");
    // "registrationACTION");

      return {
        type: "NEXT_STEP",
      }
    
    }
  
  export function previousStepAction() {
    // "registrationACTION");
  
    return {
      type: "PREVIOUS_STEP",
    }
  
  } 
   
  
  export function saveValuesAction(key, value) {
    // "registrationACTION");
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

  export function registerAction(data) {
    return function (dispatch) {
      dispatch(requestPosts());
      let jwt = localStorage.getItem("jwt");
      let RegistrationToken = localStorage.getItem("RegistrationToken");
      const request = {
        customerInfoData: {
          "FirstName": data.name,
          "MiddleName":data.middleName,
          "LastName": data.lastName,
          "Phone": data.phone,
          "Gender": data.gender,
          "Country": data.Country,
          "DeviceInfo": data.deviceInfo,
          RegistrationToken,
        },
        customerContactData: {
          CustomerId: data.CustomerId,
          CustomerContactId: data.CustomerContactId,
          Country:data.Country,
          State:data.State,
          Town: data.Town,
          City: data.City,
          Colony: data.Colony,
          Street: data.Street,
          Zip: data.Zip,
          ExteriorNumber: data.ExteriorNumber,
          InteriorNumber: data.InteriorNumber,
          FixedPhone: data.FixedPhone,
          MobilePhone: data.phone,
          RegistrationToken,
        }
      };  
      var config = require('../../../Config/config.json');
  
      return fetch(config.apiUrl + "updateCustomerInfo", {
          method: 'PUT', 
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
        // setTimeout(() => {
          if(result){
            if(data.CustomerContactId>0){
              dispatch(updateCustomerContactAction(data));
            }
            else{
              dispatch(registerCustomerContactAction(data));
            }
            //dispatch(receivedPosts(result));
            //dispatch(nextStepAction());
          // }, 3000);
          }
      },
    );
    };

  }

  export function registerCustomerContactAction(data) {
    return function (dispatch) {
      dispatch(requestPosts());
      let jwt = localStorage.getItem("jwt");
      let RegistrationToken = localStorage.getItem("RegistrationToken");
      const request = {
        customerInfoData: {
          "FirstName": data.name,
          "MiddleName":data.middleName,
          "LastName": data.lastName,
          "Phone": data.phone,
          "Gender": data.gender,
          "Country": data.Country,
          "DeviceInfo": data.deviceInfo,
          RegistrationToken,
        },
        customerContactData: {
          CustomerId: data.CustomerId,
          CustomerContactId: data.CustomerContactId,
          Country:data.Country,
          State:data.State,
          Town: data.Town,
          City: data.City,
          Colony: data.Colony,
          Street: data.Street,
          Zip: data.Zip,
          ExteriorNumber: data.ExteriorNumber,
          InteriorNumber: data.InteriorNumber,
          FixedPhone: data.FixedPhone,
          MobilePhone: data.phone,
          RegistrationToken,
        }   
      };  
      var config = require('../../../Config/config.json');

      return fetch(config.apiUrl + "createCustomerContact", {
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
            dispatch(saveValuesAction('CustomerContactId', result[0].CustomerContactId));
            dispatch(saveValuesAction('CustomerId', result[0].CustomerId));
            dispatch(receivedPosts(result));
            // dispatch(nextStepAction());
          // }, 3000);
        }
      },
    );
    };

  }

  export function updateCustomerContactAction(data) {
    return function (dispatch) {
      dispatch(requestPosts());
      let jwt = localStorage.getItem("jwt");
      let RegistrationToken = localStorage.getItem("RegistrationToken");
      const request = {
        customerInfoData: {
          "FirstName": data.name,
          "MiddleName":data.middleName,
          "LastName": data.lastName,
          "Phone": data.phone,
          "Gender": data.gender,
          "Country": data.Country,
          "DeviceInfo": data.deviceInfo,
          RegistrationToken,
        },
        customerContactData: {
          CustomerId: data.CustomerId,
          CustomerContactId: data.CustomerContactId,
          Country:data.Country,
          State:data.State,
          Town: data.Town,
          City: data.City,
          Colony: data.Colony,
          Street: data.Street,
          Zip: data.Zip,
          ExteriorNumber: data.ExteriorNumber,
          InteriorNumber: data.InteriorNumber,
          FixedPhone: data.FixedPhone,
          MobilePhone: data.phone,
          RegistrationToken,
        }   
      };  
      var config = require('../../../Config/config.json');

      return fetch(config.apiUrl + "updateCustomerContact", {
          method: 'PUT', 
          headers: {
              Accept: 'application/json', 
              'Content-Type': 'application/json', 
              Authorization: `Bearer ${jwt}`
          }, 
          body: JSON.stringify(request)
      })
      .then(
        response => response.json(),
        error => toast.error('An error occurred.', error),
      )
      .then((result) => {
        // setTimeout(() => {
          // dispatch(saveValuesAction('CustomerContactId', result[0].CustomerContactId));
          // dispatch(saveValuesAction('CustomerId', result[0].CustomerId));
          dispatch(receivedPosts(result));
          // dispatch(nextStepAction());
        // }, 3000);
      },
    );
    };

  }

  
  export function getPersonalInfo(){

    return function (dispatch) {
      dispatch(requestPosts());
      let jwt = localStorage.getItem("jwt");
      let RegistrationToken = localStorage.getItem("RegistrationToken");
      const request = {
          RegistrationToken,
      }

      var config = require('../../../Config/config.json');

      return fetch(config.apiUrl + "getPersonalInfo", {
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
        // error => 'An error occurred.', error),
      )
      .then((result) => {
        // setTimeout(() => {
          dispatch(receivedPosts(result));
          return result;
        // }, 3000);
      },
    );


    }

  }
