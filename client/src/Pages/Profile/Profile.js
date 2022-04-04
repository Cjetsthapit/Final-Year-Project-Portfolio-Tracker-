import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { InputAdornment } from "@material-ui/core";
import profile from "../../assets/images/profile.png";
import { RemoveRedEyeOutlined } from "@material-ui/icons";
import { changePassword, fetchUser } from "../../api/service";
import {toast} from 'react-toastify';
const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-40%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #eee",
  boxShadow: 24,
  p: 4,
};

const ChangePassword = ({ open, handleClose }) => {
  const [maskeda, setMaskeda] = useState(true);
  const [maskedb, setMaskedb] = useState(true);
  const [maskedc, setMaskedc] = useState(true);
  const [oldPassword, setOld] = useState();
  const [newPassword, setNew] = useState();
  const [confirmNew, setConfirmNew] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword === confirmNew){
      const pass= {oldPassword,newPassword};
      changePassword(pass).then(({data})=>{
        console.log(data.status)
        if(data.status === 406){
          toast.warn('Please fill in all the fields');
        }else if(data.status === 403){
          toast.warn('Old Password is incorrect');
        }else{
          toast.success('Password Changed')
          handleClose();
        }
      }
      )
    }else{
      toast.warn('New Password must be same');
    }
  };
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Change Password
        </Typography>
        <TextField
          required
          label="Old Password"
          color="primary"
          type={maskeda ? "password" : "text"}
          fullWidth
          margin="dense"
          variant="filled"
          value={oldPassword}
          onChange={(e)=>setOld(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <RemoveRedEyeOutlined
                  style={{ cursor: "pointer" }}
                  onClick={() => setMaskeda(!maskeda)}
                />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          required
          label="New Password"
          color="success"
          type={maskedb ? "password" : "text"}
          fullWidth
          margin="dense"
          variant="filled"
          value={newPassword}
          onChange={(e)=>setNew(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <RemoveRedEyeOutlined
                  style={{ cursor: "pointer" }}
                  onClick={() => setMaskedb(!maskedb)}
                />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          required
          label="Confirm New Password"
          color="success"
          type={maskedc ? "password" : "text"}
          fullWidth
          margin="dense"
          variant="filled"
          value={confirmNew}
          onChange={(e)=>setConfirmNew(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <RemoveRedEyeOutlined
                  style={{ cursor: "pointer" }}
                  onClick={() => setMaskedc(!maskedc)}
                />
              </InputAdornment>
            ),
          }}
        />
        <Grid container style={{ marginTop: "1vh" }} spacing={2}>
          <Grid item>
            <Button
              color="primary"
              variant="contained"
              mt={2}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Grid>
          <Grid item>
            <Button
              color="error"
              variant="contained"
              mt={2}
              onClick={handleClose}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

const Profile = () => {
  const [user, setUser] = useState();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    fetchUser().then(({ data }) => {
      setUser(data);
    });
  }, []);
  console.log(user);
  return (
    <>
      <Card variant="filled">
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
              {localStorage.getItem("auth_name")[0]}
            </Avatar>
          }
          title="Profile"
        ></CardHeader>

        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <CardMedia
            component="img"
            sx={{ width: "50%" }}
            image={profile}
            alt="Profile"
          />
          <CardContent
            sx={{
              flex: "1 0 auto",
              bg: "red",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <TextField
              InputLabelProps={{
                shrink: true,
              }}
              variant="filled"
              disabled="true"
              value={user?.name}
              label="Name"
              margin="dense"
              color="warning"
            ></TextField>
            <TextField
              InputLabelProps={{
                shrink: true,
              }}
              variant="filled"
              disabled="true"
              value={user?.email}
              label="Email"
              margin="dense"
            ></TextField>
            <TextField
              InputLabelProps={{
                shrink: true,
                color: "primary",
              }}
              variant="filled"
              disabled="true"
              value={user?.date}
              label="Date of Birth"
              margin="dense"
            ></TextField>
            <Button
              variant="contained"
              bgcolor="primary"
              className="mt-3"
              onClick={handleOpen}
            >
              Change Password
            </Button>
          </CardContent>
        </Box>
      </Card>
      <ChangePassword open={open} handleClose={handleClose} />
    </>
  );
};

export default Profile;
