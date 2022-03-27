import { Modal, Box, Typography, Grid, Button, TextField } from '@mui/material';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
const style = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-40%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #eee',
    boxShadow: 24,
    p: 4,
};
const AddPortfolio = ({ open, handleClose, type, title, button, name, id }) => {
    const [portfolio, setPortfolio] = useState();
    useEffect(() => {
        if (name) {
            setPortfolio(name);
        }
    }, [name])
    const handlePortfolio = (e) => {
        if(!portfolio){
            toast.warn("Enter portfolio name");
            return;
        }
        e.preventDefault();
        const data = { "id": localStorage.getItem('auth_id'), "name": portfolio }
        
        if (type === "add") {
            axios.post(`/api/create-portfolio`, data).then(res => {
                toast.success('Portfolio Added');
                handleClose();
                window.location.reload();
            })
        }
        else {
            axios.patch(`/api/update-portfolio/${id}`, data).then(res => {
                toast.success('Category Edited');
                handleClose();
                window.location.reload();
            })
        }
    }
    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {title}
                </Typography>
                <TextField required label='Portfolio Name' color="success" value={portfolio} onChange={(e) => setPortfolio(e.target.value)} fullWidth margin="dense" variant="filled" />
                <Grid container style={{ marginTop: '1vh' }} spacing={2} >
                    <Grid item>
                        <Button color="primary" variant="contained" mt={2} onClick={handlePortfolio} >{button}</Button>
                    </Grid>
                    <Grid item>
                        <Button color="warning" variant="contained" mt={2} onClick={handleClose}>Cancel</Button>
                    </Grid>
                </Grid>

            </Box>
        </Modal>
    )
};

export default AddPortfolio;
