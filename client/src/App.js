import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import LoginRegister from './Pages/LoginRegister/LoginRegister';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './Pages/HomePage/HomePage';
import ProtectedRoute from './components/ProtectedRoute';
import ForgotPassword from './Pages/ResetPassword/ForgotPassword';
import { CssBaseline } from '@mui/material';
import { theme } from './theme';
import { ThemeProvider } from '@material-ui/core';
import Profile from './Pages/Profile/Profile';
import Company from './Pages/Company/Company';
import Error404 from './Pages/Error/Error404';
import PortfolioList from './Pages/Portfolios';
import Portfolio from './Pages/Portfolios/Portfolio';
import Compare from './Pages/Compare';
import DetailedView from './components/Transactions/DetailedView';
import ResetPassword from './Pages/ResetPassword/ResetPassword';
import AdminRoute from './components/AdminRoute';
import Dashboard from './Pages/Admin/Dashboard';
import Controls from './Pages/Admin/Controls';
import Graph from './components/Transactions/Graph';





axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('auth_token');

  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
})

function App() {


  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ToastContainer />

        <Switch>
          <Route exact path="/" component={LoginRegister}>
            {/* {localStorage.getItem('auth_role')=== 'admin' ? <Redirect to="/admin/dashboard" /> 
            : localStorage.getItem('auth_role')=== '' ? <Redirect to="/homepage" />
            : <LoginRegister/> } */}
            {/* {localStorage.getItem('auth_role') === 'admin' ?  <Redirect to="/admin/dashboard" /> :<LoginRegister/> } */}
            {/* {localStorage.getItem('auth_role')==='null' ?  <Redirect to="/homepage" /> : <LoginRegister/>} */}
            {/* {localStorage.getItem('auth_role') === 'admin' ? } */}
          </Route>
          <Route path="/forgot-password" component={ForgotPassword}></Route>
          <Route path="/reset-password" component={ResetPassword}></Route>

          <Route path="/error" component={Error404}></Route>


          

          <ProtectedRoute path="/homepage/:id" component={Company} />
          <ProtectedRoute path="/homepage" component={HomePage} />
          <ProtectedRoute path="/profile" component={Profile} />
          <ProtectedRoute exact path={`/portfolio/:id/:name`} component={DetailedView} />
          <ProtectedRoute exact path={`/portfolio/:id`} component={Portfolio} />

          <ProtectedRoute path="/portfolio" component={PortfolioList} />
          <ProtectedRoute path="/compare" component={Compare} />
          <ProtectedRoute path="/portfolio-chart/:id" component={Graph} />


          <AdminRoute path="/admin/dashboard" component={Dashboard}/>
          <AdminRoute path="/admin/data/:id" component={Company}/>
          <AdminRoute path="/admin/data" component={Controls}/>
          <AdminRoute path="/admin/profile" component={Profile}/>






          <Route  component={Error404} />
        </Switch>
        

      </ThemeProvider>
    </>

  );
}

export default App;
