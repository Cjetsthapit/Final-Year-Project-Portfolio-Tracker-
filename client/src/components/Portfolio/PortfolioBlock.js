import { Grid, Card, CardContent, Typography, Button } from '@material-ui/core';
import axios from 'axios';
import CssLoader from '../../components/CssLoader/CssLoader';
import { Link,  } from 'react-router-dom';
import React, { useState } from 'react';
import DeletePortfolio from './DeletePortfolio';
import AddPortfolio from './AddPortfolio';

const PortfolioBlock = ({ name, id,inv }) => {
    const [loading, setLoading] = useState(false);
    const [openE, setOpenE] = useState(false);
    const handleOpenE = () => setOpenE(true);
    const handleCloseE = () => setOpenE(false);
    const [openD, setOpenD] = useState(false);
    const handleOpenD = () => setOpenD(true);
    const handleCloseD = () => setOpenD(false);
    const handleDeletePortfolio = (id) => {
        axios.delete(`/api/delete-portfolio/${id}`, id).then(res => {
            setLoading(true);
            console.log(res);
            handleCloseD();
            window.location.reload();
        })

    };
    if (loading) {
        return <CssLoader />
    }
    return (
        <Grid item xs={12} md={6}>
            <Card style={{ backgroundColor: "#333", color: "white" }}>
                <CardContent >
                    <Grid container justify="space-between" alignItems='center'>
                        <Grid item>
                            <Typography variant="h5" sx={{ fontSize: 20 }} gutterBottom>
                                {name}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="primary" onClick={handleOpenE}>Edit</Button>

                            <Button variant="contained" onClick={handleOpenD} style={{ marginLeft: '5px' }}>Delete</Button>
                        </Grid>
                    </Grid>
                    <AddPortfolio open={openE} handleClose={handleCloseE} handleOpen={handleOpenE} title="Edit Portfolio Name" button="Edit Portfolio" name={name} id={id} />
                    <DeletePortfolio openD={openD} handleCloseD={handleCloseD} handleOpenD={handleOpenD} id={id} name={name} handleDelete={handleDeletePortfolio} />
                    <Typography variant="h5"  component="div">
                        Investment: Rs. {Math.round(inv).toLocaleString()}
                    </Typography>

                    <Grid container justify="space-between" alignItems='center'>
                        <Link to={{ pathname: `/portfolio/${id}`, state: { id } }} style={{ textDecoration: 'none', marginTop:8 }}  >
                            <Button variant="contained" color="secondary" style={{ marginLeft: 'auto' }}>
                                View Shares</Button>
                        </Link>
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
    )
};

export default (PortfolioBlock);
