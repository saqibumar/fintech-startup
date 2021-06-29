import {combineReducers} from 'redux';
import registration from './registration';
import registrationWorkData from './registerWorkData';
import uploadDocsData from './uploadDocs.reducer';
import customerAccountData from './customerAccountData';
import customerOrder from './customerOrderData';
import orderProcess from './order-process/orderProcess';
import paymentProcessReport from './Reports/paymentProcessReport';

export const reducers = combineReducers({
  form: registration,
  registrationWorkData,
  uploadDocsData,
  customerAccountData,
  customerOrder,
  orderProcess,
  paymentProcessReport,
}) 