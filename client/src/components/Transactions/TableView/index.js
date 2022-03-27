import React from 'react'
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Link, useParams } from 'react-router-dom';
const TableView = ({ filterData,number, sold, investment, index,avg, soldValue, profit, profitper }) => {
    const {id}= useParams();
    const extApi = filterData()[0];
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));
      
      const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));
    return (
        <StyledTableRow className={profit  > 0 ? 'text-success' : 'text-danger'}>
            <StyledTableCell>{index+1}</StyledTableCell>
            <StyledTableCell><Link  to={{ pathname: `/portfolio/${id}/${extApi && extApi.symbol}` }} className='text-decoration-none text-dark'>{extApi?.symbol}</Link></StyledTableCell>
            <StyledTableCell>{number}</StyledTableCell>
            <StyledTableCell>{avg}</StyledTableCell>
            <StyledTableCell>{'Rs. ' + investment}</StyledTableCell>
            <StyledTableCell>{'Rs. '+ profit}</StyledTableCell>


        </StyledTableRow>
    )
}

export default TableView;