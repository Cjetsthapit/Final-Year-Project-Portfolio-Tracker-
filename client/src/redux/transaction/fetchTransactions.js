import { fetchUserSharesPending, fetchUserSharesSuccess, fetchUserSharesError } from './action';
import axios from 'axios';
const fetchShares=(id)=>{
    return dispatch=>{
        dispatch(fetchUserSharesPending());
        axios.get(`http://localhost:8000/api/get-transaction/${id}`)
        .then(res=>{
            console.log("Hello")
            const shares = res.data.data
            dispatch(fetchUserSharesSuccess(shares))
        })
        .catch(error=>{
            dispatch(fetchUserSharesError(error))
        })
    }
}
export default fetchShares;
// const fetchTransactions = () => {
//     return dispatch => {
//         dispatch(fetchUserSharesPending());
//         console.log("Here")
//         axios.get(`http://localhost:8000/api/get-transaction/34`)
//             .then(res => {
//                 const shares = res.data.data
//                 dispatch(fetchUserSharesSuccess(shares))
//             })
//             .catch(error => {
//                 dispatch(fetchUserSharesError(error))
//             })
//     }
// }
// export default fetchTransactions;