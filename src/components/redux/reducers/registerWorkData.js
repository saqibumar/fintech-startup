
  const initialState = {
    formWorkData: {
      formValid:false,
      step: 1,
      from:0,
      to:1,
      loading:false,

      CompanyName: '', 
      WorkingPeriod: '', 
      WorkPhone: '', 
      Salary: '', 
      PaymentFrequency: '',

      // CustomerReferences:{
        firstName: '',
        middleName: '',
        lastName: '',
        phone: '',
        relationship:'',
      // }  
    }
  }
//  export default function registration(state = {}, action) {
  export default function registrationWorkData(state = initialState.formWorkData, action) {
    switch (action.type) {
      case 'NEXT_STEP':
          return ({
          ...state,
          step: state.step + 1,
          from:state.step,
          to:state.step + 1
        })
  
      case 'PREVIOUS_STEP':
        return ({
          ...state,
          step: state.step - 1,
          from:state.step,
          to:state.step - 1,
          // formValid: state.formValid,
        })
  
      case 'SAVE_VALUES':
        return ({
          ...state,
              [action.key] :  action.value
        })

        case 'REGISTER_STEP':
            return ({
              ...state,
              loading: true
            })

        case 'RECEIVE_POSTS':
            return { ...state, json: action.json, loading: false };
          
        case 'REQUEST_POSTS':
            return { ...state, loading: true };

        case 'RECEIVE_ERROR':
          return { ...state, json: action.json, loading: false };
                    
      default:
        return state;
  
    }
  
  
  }