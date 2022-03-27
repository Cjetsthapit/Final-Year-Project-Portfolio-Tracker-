// export const TRANSACTION_SHARES_PENDING = 'TRANSACTION_SHARES_PENDING';
// export const TRANSACTION_SHARES_SUCCESS = 'TRANSACTION_SHARES_SUCCESS';
// export const TRANSACTION_SHARES_ERROR = 'TRANSACTION_SHARES_ERROR';

// export function fetchUserSharesPending(){
//     return{
//         type:TRANSACTION_SHARES_PENDING
//     }
// }
// export function fetchUserSharesSuccess(shares){
//     return{
//         type:TRANSACTION_SHARES_SUCCESS,
//         payload:shares
//     }
// }
// export function fetchUserSharesError(error){
//     return{
//         type:TRANSACTION_SHARES_ERROR,
//         payload:error
//     }
// }
export const FETCH_USER_SHARES_PENDING = 'FETCH_USER_SHARES_PENDING';
export const FETCH_USER_SHARES_SUCCESS = 'FETCH_USER_SHARES_SUCCESS';
export const FETCH_USER_SHARES_ERROR = 'FETCH_USER_SHARES_ERROR';

export function fetchUserSharesPending(){
    return{
        type:FETCH_USER_SHARES_PENDING
    }
}
export function fetchUserSharesSuccess(shares){
    return{
        type:FETCH_USER_SHARES_SUCCESS,
        payload:shares
    }
}
export function fetchUserSharesError(error){
    return{
        type:FETCH_USER_SHARES_ERROR,
        payload:error
    }
}
