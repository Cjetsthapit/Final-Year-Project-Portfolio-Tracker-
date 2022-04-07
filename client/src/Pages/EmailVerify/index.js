import React, { useState } from "react";
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  Button,
} from "@material-ui/core";
import EmailIcon from '@mui/icons-material/Email';
import { sendVerificationLink } from "../../api/service";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import CssLoader from "../../components/CssLoader/CssLoader";
const EmailVerify = () => {
    function useQuery() {
		return new URLSearchParams(useLocation().search);
	  }
       const [loading, setLoading] = useState(false);
  const paperStyle = {
    padding: 40,
    minWidth: "350px",
    width: "30%",
    margin: "0 auto",
    marginTop:'8%'
  };
  const avatarStyle = { backgroundColor: "#222", marginBottom: "10px" };
  const sendLink=(e)=>{
      setLoading(true);
      sendVerificationLink().then(data=>{
          toast.success('Verification Link sent');
          setLoading(false);
      })
  }
  if (loading) {
    return <CssLoader/>
  }
  return (
    <Grid>
      <Paper style={paperStyle} elevation={16}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <EmailIcon />
          </Avatar>
          <Typography variant="h5">Verify Email Address to proceed furher.</Typography>
          <br/>
          <Typography variant="h6">Press the button to get the link.</Typography>
          <br/>
          <button className="btn btn-primary" onClick={sendLink}>VERIFY</button>
        </Grid>
        
      </Paper>
    </Grid>
  );
};

export default EmailVerify;
