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
import { useHistory, Link, useLocation } from "react-router-dom";
const ResetPassword = () => {
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const history = useHistory();
  const query = useQuery();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [cpassword, setCpassword] = useState();
  const paperStyle = {
    padding: 40,
    minHeight: "50vh",
    minWidth: "350px",
    width: "30%",
    margin: "0 auto",
  };
  const avatarStyle = { backgroundColor: "#222", marginBottom: "10px" };
  const btnstyle = { margin: "8px 0 15px 0", backgroundColor: "#222" };

  const handleResetPassword = (e) => {
    e.preventDefault();
    const token = query.get("token");
    if (password !== cpassword) {
      return toast.error("Password does not match");
    } else {
      const data = { email, password, cpassword, token };
      axios.get("/sanctum/csrf-cookie").then((response) => {
        axios.post(`api/reset-password`, data).then((res) => {
          console.log(res);
          history.push("/");
        });
      });
    }
  };
  return (
    <Grid>
      <Paper style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockResetIcon />
          </Avatar>
          <Typography variant="h5">Change your password</Typography>
        </Grid>
        <form onSubmit={handleResetPassword}>
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
          <TextField
            label="Password"
            placeholder="Enter new password"
            fullWidth
            margin="dense"
            variant="filled"
            type="password"
            style={{ marginBottom: "20px" }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            label="Confirm Password"
            placeholder="Enter new password again"
            fullWidth
            margin="dense"
            variant="filled"
            type="password"
            style={{ marginBottom: "20px" }}
            value={cpassword}
            onChange={(e) => setCpassword(e.target.value)}
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

export default ResetPassword;
