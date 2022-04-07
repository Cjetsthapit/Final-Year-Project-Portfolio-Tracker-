import React, { useEffect } from "react";
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  Button,
} from "@material-ui/core";
import EmailIcon from '@mui/icons-material/Email';

import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Verified = () => {
    const history = useHistory();
    function useQuery() {
		return new URLSearchParams(useLocation().search);
	  }
      let query = useQuery();
      useEffect(()=>{
          let api = query.get("email_verify_url");
          axios.get(api).then(res=>toast.success('Verification Complete'))
          localStorage.setItem('verified',true)
          history.push('/homepage');
      },[])
  const paperStyle = {
    padding: 40,
    minWidth: "350px",
    width: "30%",
    margin: "0 auto",
    marginTop:'8%'
  };
  const avatarStyle = { backgroundColor: "#222", marginBottom: "10px" };

  return (
    <Grid>
      <Paper style={paperStyle} elevation={16}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <EmailIcon />
          </Avatar>
          <Typography variant="h5">Verification Complete</Typography>
          <br/>
          <Typography variant="h6">Go to homepage.</Typography>

          <br/>
        </Grid>
        
      </Paper>
    </Grid>
  );
};

export default Verified;
