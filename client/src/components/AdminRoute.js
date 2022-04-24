import axios from 'axios';
import React,{useState,useEffect} from 'react';
import { Route,Redirect,useHistory} from 'react-router-dom';
import { toast } from 'react-toastify';
import CssLoader from './CssLoader/CssLoader';
import AdminLayout from './Layout/AdminLayout';

const AdminRoute=({component: Component, ...restOfProps})=>{
    const [isAuthenticated, setAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true)
    const history = useHistory();
    useEffect(() => {
       axios.get('/api/checkAuthenticated')
       .then(res=>{
            if(res.status === 200){
                setAuthenticated(true)
            }
            setLoading(false)
       })
    }, []);
    axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err){
        if(err.response.status === 401){
            history.push('/');
        }
        return Promise.reject(err);
    })
    axios.interceptors.response.use(function (response){
        return response;
    }, function (error){
        if(error.response.status === 403)
        {
            toast.warn("Forbidden Access");
            history.push('/403');
        }
        else if(error.response.status === 404)
        {
            toast.warn(" 404 Page not Found");
            history.push('/404');
        }
        return Promise.reject(error);
    })
    if (loading){
        return (

            <CssLoader/>
        )
    }
    return(
        <Route
        {...restOfProps}
        render={(props) =>
          isAuthenticated ? (<AdminLayout><Component {...props} /></AdminLayout>) : <Redirect to={{pathname:'/email' }}/>
        }
      />


    )
}
export default AdminRoute;