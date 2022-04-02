import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom'
import CssLoader from '../../components/CssLoader/CssLoader';
import { Chip, Grid } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CompanyDetails from '../../components/SharePrice/CompanyDetails';

const Company = () => {
   
    return (
        <CompanyDetails/>
    )
}

export default Company
