import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";

import Typography from "@mui/material/Typography";
import { Link, useHistory } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { Button, Tooltip } from "@material-ui/core";
import axios from "axios";
import { toast } from "react-toastify";
const drawerWidth = 240;
function AdminLayout(props) {
  const history = useHistory();
  const handleLogout = (e) => {
    e.preventDefault();
    axios.post(`/api/logout`).then((res) => {
      if (res.data.status === 200) {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_name");
        localStorage.removeItem("auth_id");
        localStorage.removeItem("auth_role");
        localStorage.removeItem("verified");

        toast.success("Logged out Successfully");
        history.go(0);

      }
    });
  };
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100%)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "#FFFFFF",
          boxShadow: "",
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2,
          }}
        >
          <Link to="/homepage" className="text-decoration-none">
            <Button variant="contained" color="secondary">
              Go to User
            </Button>
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          <Typography variant="subtitle1" sx={{ color: "#000" }}>
            Admin
          </Typography>
          <Tooltip title="Logout">
            <IconButton onClick={handleLogout}>
              <LogoutIcon fontSize="small" sx={{ ml: 3, color: "#000" }} />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          backgroundColor: "#ddd",
          minHeight: "100vh",
        }}
      >
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  );
}

export default AdminLayout;
