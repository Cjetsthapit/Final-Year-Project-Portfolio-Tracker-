import React, { useState } from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
} from "@material-ui/core";
import LockResetIcon from "@mui/icons-material/LockReset";
import { toast } from "react-toastify";
import axios from "axios";
const ForgotPassword = () => {
  const [email, setEmail] = useState();
  const paperStyle = {
    padding: 40,
    minHeight: "50vh",
    minWidth: "350px",
    width: "30%",
    margin: "0 auto",
  };
  const avatarStyle = { backgroundColor: "#222", marginBottom: "10px" };
  const btnstyle = { margin: "8px 0 15px 0", backgroundColor: "#222" };
  const handleForgotPassword = (e) => {
    e.preventDefault();
    const emailUser = { email };
    axios.get("/sanctum/csrf-cookie").then((res) => {
      axios.post(`api/forgot-password`, emailUser).then((res) => {
        if (res.data === "") {
          toast.error("Enter correct email address");
        } else {
          toast.success("Email reset link has been sent.");
          window.close();
        }
      });
    });
  };
  return (
    <Grid>
      <Paper style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockResetIcon />
          </Avatar>
          <Typography variant="h5">Reset your password</Typography>
        </Grid>
        <form onSubmit={handleForgotPassword}>
          <TextField
            label="Email"
            placeholder="Enter email to reset the password"
            fullWidth
            margin="dense"
            variant="filled"
            type="email"
            style={{ marginBottom: "20px" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={btnstyle}
            fullWidth
          >
            Reset
          </Button>
          <Button variant="contained" fullWidth href="/">
            Cancel
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};
export default ForgotPassword;
