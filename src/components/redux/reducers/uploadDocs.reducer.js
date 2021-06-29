
  const initialState = {
    formUploadDocsData: 
    {
      formValid:false,
      step: 1,
      from:0,
      to:1,
      loading:false,

      files:[],
      docCategoryVal:'',
      isFinishedUploading:false,
    }
  }
//  export default function registration(state = {}, action) {
  export default function uploadDocsData(state = initialState.formUploadDocsData, action) {
    switch (action.type) {
        case 'REMOVE_DOCS':
                return({
                    ...state,
                    files: action.files //action.files
                  }
                )
      
      case 'UPLOADED_DOCS':
          return({
              ...state,
              files: state.files.concat(action.files) //action.files
            }
          )
        
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