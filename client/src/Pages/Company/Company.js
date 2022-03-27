import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom'
import Layout from '../../components/Layout/Layout';
import CssLoader from '../../components/CssLoader/CssLoader';
import { Chip, Grid } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Company = () => {
    const history = useHistory();
    const { id } = useParams();
    const [company, setCompany] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios.get(`/api/callCompany/${id}`).then(res => {
            if (res.data.status === 200) {
                setCompany(res.data.company[0]);
                setLoading(false);
                console.log(res.data.company[0])
            } else {

                setLoading(false);
                history.push('/error');
            }
        })
    }, [])
    if (loading) {
        return (

            <Layout><CssLoader /></Layout>
        )
    }
    return (
        <Layout>
            <Chip label={company.fname} sx={{ background: '#111827', color: 'white', padding: '20px 18px', fontSize: '1.1rem' }} />
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <TableContainer component={Paper} sx={{ marginTop: '3vh' }} elevation={10}>
                        <Table aria-label="simple table">
                            <TableRow>
                                <TableCell>Sector</TableCell>
                                <TableCell>{company.sector}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Shares Outstanding</TableCell>
                                <TableCell>{company.sharesout}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Market Price</TableCell>
                                <TableCell>{company.close}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>% Change</TableCell>
                                <TableCell>{company.diffper}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>52 Weeks High - Low</TableCell>
                                <TableCell>{company.low_high}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>120 Day Average</TableCell>
                                <TableCell>{company.avg_120}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>1 Year Yield</TableCell>
                                <TableCell>{company.yield}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>EPS</TableCell>
                                <TableCell>{company.eps}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>P/E Ratio</TableCell>
                                <TableCell>{company.pe}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Book Value</TableCell>
                                <TableCell>{company.sector}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>PBV</TableCell>
                                <TableCell>{company.bookvalue}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>% Dividend</TableCell>
                                <TableCell>{company.dividend}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>% Bonus</TableCell>
                                <TableCell>{company.bonus}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Right Share</TableCell>
                                <TableCell>{company.rightshares}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>30-Day Avg Volume</TableCell>
                                <TableCell>{company.avgvol}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Market Capitalization</TableCell>
                                <TableCell>{company.marketcap}</TableCell>
                            </TableRow>



                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item xs={4}>
                    xs=4
                </Grid>
            </Grid>


        </Layout>
    )
}

export default Company
