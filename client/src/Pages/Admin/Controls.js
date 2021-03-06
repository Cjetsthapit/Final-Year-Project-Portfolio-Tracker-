import { Button, Grid } from '@mui/material'
import axios from 'axios'
import React from 'react'
import SharePrice from '../../components/SharePrice/SharePrice'

const Controls = () => {
  const handleDailyApi=(e)=>{
    e.preventDefault();
    axios.get("/api/dailycall");
  }
  const handleCompanyImport=(e)=>{
    e.preventDefault();
    axios.get("/api/company");
  }
  return (
    <>
    <Grid style={{marginBottom:'2vh'}}>
      <Button variant="contained" style={{marginRight:'3vh'}} onClick={handleDailyApi}>Call Daily Share API</Button>
      <Button variant="contained" onClick={handleCompanyImport}>Import Company Details</Button>
    </Grid>
    <SharePrice urlpath={`/admin/data/`}/>
    </>
  )
}

export default Controls