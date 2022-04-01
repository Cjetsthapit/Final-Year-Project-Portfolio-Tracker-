import React,{useState,useEffect} from "react";
import { Redirect, Route } from "react-router-dom";
import AdminLayout from "./Layout/AdminLayout";
import Layout from "./Layout/Layout";
import axios from 'axios';
const items = [
  {
      href: '/homepage',
      title: 'Share Price'
  },
  {
      href: '/portfolio',
      title: 'My Portfolio'
  },
  {
      href: '/compare',
      title: 'Compare Stocks'
  },
  {
      href: '/profile',
      title: 'Profile'
  }
]
function ProtectedRoute({ component: Component, ...restOfProps }) {
  const [role, setRole] = useState();
  const isAuthenticated = localStorage.getItem("auth_token");
  useEffect(() => {
    axios.get(`/api/getrole`).then((res) => {
        setRole(res.data.role)
    });
    
  }, []);


  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated ? ( <Layout><Component {...props}/></Layout>) : <Redirect to="/" />
      }
    />
  );
}

export default ProtectedRoute;