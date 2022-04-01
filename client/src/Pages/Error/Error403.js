import { Button, Grid, Paper } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import Layout from '../../components/Layout/Layout'


const Error404 = () => {
    const paperStyle = { minWidth: '350px', padding: '1% 2%', width: '50%', marginTop: '40px' }
    return (
        <Layout>
        <Grid align="center">
            <Paper style={paperStyle} elevation={10}>
                <h1>404</h1>
                <div className="cloak__wrapper">
                    <div className="cloak__container">
                        <div className="cloak"></div>
                    </div>
                </div>
                <div className="info">
                    <h2>Forbidden Access</h2>
                    <p>We're fairly sure that page used to be here, but  sadly you cannot access it.</p>
                    <Button variant="outlined">
                        <Link to="/homepage" rel="noreferrer noopener" style={{textDecoration:'none'}}>Home</Link>
                    </Button>
                </div>
            </Paper>
        </Grid>
        </Layout>
    )
}

export default Error404
