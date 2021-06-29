
  const initialState = {
    systemtoken: localStorage.getItem("SystemRegistrationToken"),
    payments: [],
    isFetching: false,
    fetchError: null,
    loading: false,
    
    paymentProcessReportData: [],
    }
  
//  export default function registration(state = {}, action) {
  export default function paymentProcessReport(state = initialState, action) {
    switch (action.type) {

      case 'SAVE_VALUES':
        return ({
          ...state,
              [action.key] :  action.value
        })

        case 'PROCESS_PAYMENT_REPORT':
            return ({
              ...state,
              loading: true
            })

        case 'FINISH_PROCESS':
            return { ...state, json: action.json, loading: false };
          
        case 'REQUEST_PROCESS':
            return { ...state, loading: true };

        case 'RECEIVE_ERROR':
          return { ...state, json: action.json, loading: false };
                    
      default:
        return state;
  
    }
  
  
  }