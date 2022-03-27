import { Paper, Table, TableContainer, TableRow,TableCell } from '@mui/material'
import React from 'react'

const Row = ({share}) => {
    console.log(share)
  return (
    <TableContainer component={Paper} sx={{ marginTop: '2vh' }} elevation={4}>
    <Table>
        <TableRow>
            <TableCell>{share  ? share[0].sector : '\u00A0'}</TableCell>
        </TableRow>
        <TableRow>
            <TableCell>{share ? share[0].sharesout : '\u00A0'}</TableCell>
        </TableRow>
        <TableRow>
            <TableCell>{share ? share[0].close : '\u00A0'}</TableCell>
        </TableRow>
        <TableRow>
            <TableCell>{share ? share[0].diffper : '\u00A0'}</TableCell>
        </TableRow>
        <TableRow>
            <TableCell>{share ? share[0].low_high : '\u00A0'}</TableCell>
        </TableRow>
        <TableRow>
            <TableCell>{share ? share[0].avg_120 : '\u00A0'}</TableCell>
        </TableRow>
        <TableRow>
            <TableCell>{share ? share[0].yield : '\u00A0'}</TableCell>
        </TableRow>
        <TableRow>
            <TableCell>{share ? share[0].eps : '\u00A0'}</TableCell>
        </TableRow>
        <TableRow>
            <TableCell>{share ? share[0].pe : '\u00A0'}</TableCell>
        </TableRow>
        <TableRow>
            <TableCell>{share ? share[0].bookvalue : '\u00A0'}</TableCell>
        </TableRow>
        <TableRow>
            <TableCell>{share ? share[0].pbv : '\u00A0'}</TableCell>
        </TableRow>
        <TableRow>
            <TableCell>{share ? share[0].dividend : '\u00A0'}</TableCell>
        </TableRow>
        <TableRow>
            <TableCell>{share ? share[0].bonus : '\u00A0'}</TableCell>
        </TableRow>
        <TableRow>
            <TableCell>{share ? share[0].rightshares : '\u00A0'}</TableCell>
        </TableRow>
        <TableRow>
            <TableCell>{share ? share[0].avgvol : '\u00A0'}</TableCell>
        </TableRow>
        <TableRow>
            <TableCell>{share ? share[0].marketcap : '\u00A0'}</TableCell>
        </TableRow>
    </Table>
</TableContainer>
  )
}

export default Row