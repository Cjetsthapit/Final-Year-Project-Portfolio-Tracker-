import { Button, Grid, Paper } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'



const Error404 = () => {
    const paperStyle = { minWidth: '350px', padding: '1% 2%', width: '50%', marginTop: '40px' }
    return (
        <>
        <Grid align="center">
            <Paper style={paperStyle} elevation={10}>
                <h1>404</h1>
                <div className="cloak__wrapper">
                    <div className="cloak__container">
                        <div className="cloak"></div>
                    </div>
                </div>
                <div className="info">
                    <h2>We can't find that page</h2>
                    <p>We're fairly sure that page used to be here, but seems to have gone missing. We do apologise on it's behalf.</p>
                    <Button variant="outlined">
                        <Link to="/homepage" rel="noreferrer noopener" style={{textDecoration:'none'}}>Home</Link>
                    </Button>
                </div>
            </Paper>
        </Grid>
        </>
    )
}

export default Error404
