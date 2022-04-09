import React from "react";
import { Route } from "react-router-dom";
import Layout from "./Layout/Layout";
import LoginRegister from "../Pages/LoginRegister/LoginRegister";

function ProtectedRoute({ component: Component, ...restOfProps }) {
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