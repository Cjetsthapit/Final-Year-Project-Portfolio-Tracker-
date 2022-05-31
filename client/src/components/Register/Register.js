import React, { useState } from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from "@material-ui/core";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import { toast } from "react-toastify";
import axios from "axios";
import { useHistory } from "react-router";

const Register = ({ handleChange }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  const paperStyle = {
    padding: 20,
    minHeight: "50vh",
    minWidth: "350px",
    width: "30%",
    margin: "0 auto",
  };
  const avatarStyle = { backgroundColor: "#222" };
  const btnstyle = { margin: "8px 0", backgroundColor: "#222" };
  const handleRegister = (e) => {
    e.preventDefault();
    const data = { name: name, email: email, date: date, password: password };
    if(name==='' || email==='' || date==='' ){
    toast.warn('Please fill in all the fields')
    }
    else{
    if (password === cpassword && password.length >=6 ){
      axios.get("/sanctum/csrf-cookie").then((response) => {
        axios.post(`api/register`, data).then((res) => {    
            if (res.data.status === "200") {
              toast.success("Registered Successfully");
              window.location.reload();
            } else {
              toast.warn("Email already exists");
            }
           
        })
      })
    }
    else {
      toast.error("Password has to be greater than 6 char and must match");
    }
  }
  };
  return (
    <Grid>
      <Paper style={paperStyle} elevation={24}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <AddCircleOutlineOutlinedIcon />
          </Avatar>
          <Typography variant="h5">Register</Typography>
        </Grid>
        <form onSubmit={handleRegister}>
          <TextField
            label="Name"
            placeholder="Enter full name"
            fullWidth
            margin="dense"
            variant="filled"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Email"
            placeholder="Enter email"
            type="email"
            fullWidth
            margin="dense"
            variant="filled"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            InputLabelProps={{
              shrink: true,
            }}
            label="Date of Birth"
            type="date"
            fullWidth
            margin="dense"
            variant="filled"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <TextField
            label="Password"
            placeholder="Enter password"
            type="password"
            fullWidth
            margin="dense"
            variant="filled"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            label="Confirm Password"
            placeholder="Enter password again"
            type="password"
            fullWidth
            margin="dense"
            variant="filled"
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
            Register
          </Button>
        </form>
        <Typography>
          {" "}
          Already have an account ?
          <Link href="#" onClick={() => handleChange("event", 0)}>
            Sign in
          </Link>
        </Typography>
      </Paper>
    </Grid>
  );
};
export default Register;
