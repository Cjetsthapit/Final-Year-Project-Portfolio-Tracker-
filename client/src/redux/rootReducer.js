import { combineReducers } from "redux";
import transactionReducer from "./transaction/reducer";

const rootReducer = combineReducers({
    transaction:transactionReducer
});
export default rootReducer;