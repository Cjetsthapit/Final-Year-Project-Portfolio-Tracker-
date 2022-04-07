
import React from "react";
import { Redirect, Route } from "react-router-dom";


function VerificationRoute({ component: Component, ...restOfProps }) {
  const isAuthenticated = localStorage.getItem("verified") === null  ;
  console.log('2')
  return (
    <Route
      {...restOfProps}
      render={(props) =>
        !isAuthenticated ? ( <Component/>) : <Redirect to="/homepage" />
      }
    />
  );
}

export default VerificationRoute;