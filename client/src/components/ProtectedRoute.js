import React,{useState,useEffect} from "react";
import { Redirect, Route } from "react-router-dom";
import AdminLayout from "./Layout/AdminLayout";
import Layout from "./Layout/Layout";
import axios from 'axios';
import EmailVerify from "../Pages/EmailVerify";
import LoginRegister from "../Pages/LoginRegister/LoginRegister";

function ProtectedRoute({ component: Component, ...restOfProps }) {
  const isAuthenticated = localStorage.getItem("auth_token") ;
  const isVerified = localStorage.getItem("verified") === null ;
  return (
    <Route
      {...restOfProps}
      render={(props) =>
        !isVerified ? ( <Layout><Component {...props}/></Layout>) : <LoginRegister/>
      }
    />
  );
}

export default ProtectedRoute;