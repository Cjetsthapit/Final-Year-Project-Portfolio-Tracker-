// import {
//     TRANSACTION_SHARES_ERROR,
//     TRANSACTION_SHARES_PENDING,
//     TRANSACTION_SHARES_SUCCESS
// } from "./action";


// const initialState = {
//     pending: false,
//     shares: [],
//     error: ''
// }

// const transactionReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case TRANSACTION_SHARES_PENDING:
//             return {
//                 ...state,
//                 pending: true
//             }
//         case TRANSACTION_SHARES_SUCCESS:
//             return {
//                 error: '',
//                 pending: false,
//                 shares: action.payload
//             }
//         case TRANSACTION_SHARES_ERROR:
//             return {
//                 shares: [],
//                 pending: false,
//                 error: action.payload
//             }
//         default:
//             return state;
//     }
// }

// export default transactionReducer;
import { FETCH_USER_SHARES_ERROR,
    FETCH_USER_SHARES_PENDING, 
    FETCH_USER_SHARES_SUCCESS } from "./action"; 

const initialState={
pending:false,
shares:[],
error:''
}

const usershareReducer =(state=initialState,action)=>{
switch(action.type){
   case FETCH_USER_SHARES_PENDING:
       return{
           ...state,
           pending:true
       }
   case FETCH_USER_SHARES_SUCCESS:
       return{
           error:'',
           pending:false,
           shares:action.payload
       }
   case FETCH_USER_SHARES_ERROR:
       return{
           shares:[],
           pending:false,
           error:action.payload
       }
   default:
       return state;
}
}

export default usershareReducer;