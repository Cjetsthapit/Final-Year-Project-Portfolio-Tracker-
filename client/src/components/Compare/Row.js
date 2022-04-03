import { Paper, Table, TableContainer, TableRow,TableCell } from '@mui/material'
import React from 'react'

const Row = ({share}) => {

  return (
    <TableContainer component={Paper} sx={{ marginTop: '2vh' }} elevation={4}>
    <Table>
        <TableRow>
            <TableCell className='bg-secondary text-white font-weight-bold'>{share  ? share[0].sector : '\u00A0'}</TableCell>
        </TableRow>
        <TableRow>
            <TableCell>{share ? share[0].sharesout : '\u00A0'}</TableCell>
        </TableRow>
        <TableRow>
            <TableCell>{share ? share[0].close : '\u00A0'}</TableCell>
        </TableRow>
        <TableRow>
            <TableCell className={share ? share[0].diffper > 0 ? 'bg-success text-white' : 'bg-danger text-white': ''}>
                {share ? share[0].diffper : '\u00A0'}
                </TableCell>
        </TableRow>
        <TableRow>
            <TableCell>{share ? share[0].low_high : '\u00A0'}</TableCell>
        </TableRow>
        <TableRow>
            <TableCell>{share ? share[0].avg_120 : '\u00A0'}</TableCell>
        </TableRow>
        
        <TableRow>
            <TableCell className={share ? ((share[0].yield).substring(0,(share[0].yield).length-1))> 0 ? 'bg-success text-white' : 'bg-danger text-white': ''}>{share ? share[0].yield : '\u00A0'}</TableCell>
        </TableRow>
        <TableRow>
            <TableCell className={share ? ((share[0].eps).substring(0,(share[0].eps).length-17))> 0 ? 'bg-success text-white' : 'bg-danger text-white': ''}>{share ? share[0].eps : '\u00A0'}</TableCell>
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
            <TableCell className={share ? ((share[0].dividend).substring(0,(share[0].dividend).length-12))> 0 ? 'bg-success text-white' : 'bg-danger text-white': ''}>{share ? share[0].dividend : '\u00A0'}</TableCell>
        </TableRow>
        <TableRow>
            <TableCell className={share ? ((share[0].bonus).substring(0,(share[0].bonus).length-12))> 0 ? 'bg-success text-white' : 'bg-danger text-white': ''}>{share ? share[0].bonus : '\u00A0'}</TableCell>
        </TableRow>
        <TableRow>
            <TableCell className={share ? (share[0].rightshares) === 'No Data at the Moment' ? 'bg-danger text-white' : 'bg-success text-white': ''}>{share ? share[0].rightshares : '\u00A0'}</TableCell>
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