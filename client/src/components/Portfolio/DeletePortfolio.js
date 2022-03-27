import { Modal,Box,Typography,Grid,Button } from '@material-ui/core';
import React from 'react';
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
const DeletePortfolio = ({openD,handleCloseD,id,handleDelete,name}) => {
  return (
    <Modal
        open={openD}
        onClose={handleCloseD}
    >
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Confirm Delete ?
            </Typography>
            <Typography id="modal-modal-description" style={{ marginTop:'10px' }} >
                Do you want to delete {name}?
            </Typography>
            <Grid container style={{ marginTop: '1vh' }} spacing={2} >
                <Grid item>
                    <Button color="secondary" variant="contained" mt={2} onClick={()=>handleDelete(id)} >Delete Portfolio</Button>
                </Grid>
                <Grid item>
                    <Button color="warning" variant="contained" mt={2} onClick={handleCloseD}>Cancel</Button>
                </Grid>
            </Grid>

        </Box>
    </Modal>
)
};

export default DeletePortfolio;
