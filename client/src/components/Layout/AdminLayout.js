import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {  useHistory } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import {  Tooltip } from '@material-ui/core';
import NavItem from '../NavItem/NavItem';
import axios from 'axios';
import { toast } from 'react-toastify';
const drawerWidth = 240;
const items = [
    {
        href: '/dashboard',
        title: 'Dashboard'
    },
    {
        href:'/data',
        title:'Controls'
    }
]
function AdminLayout(props) {
    


    const history = useHistory();
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const drawerStyle = { backgroundColor: '#111827', height: '100%' }
    const drawer = (
        <div style={drawerStyle}>
            <Toolbar>
                <Box sx={{ px: 2 }}>
                    <Box
                        sx={{
                            alignItems: 'center',
                            backgroundColor: 'rgba(255, 255, 255, 0.04)',
                            cursor: 'pointer',
                            display: 'flex',
                            justifyContent: 'space-between',
                            px: 3,
                            py: '11px',
                            borderRadius: 1,
                            color: 'white'
                        }}
                    >
                        <div>
                            <Typography
                                color="inherit"
                                variant="subtitle2"
                            >
                                Portfolio Tracker
                            </Typography>

                        </div>

                    </Box>
                </Box>
            </Toolbar>
            <Divider
                sx={{
                    borderColor: '#2D3748',
                    my: 3
                }}
            />
            <List >
                {
                    items.map(item => (
                        <NavItem key={item.title} href={item.href} title={item.title} />
                    ))
                }

            </List>
            <Divider />

        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;
    const handleLogout = (e) => {
        e.preventDefault();
        axios.post(`/api/logout`).then(res => {
            if (res.data.status === 200) {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_name');
                localStorage.removeItem('auth_id');

                toast.success('Logged out Successfully');
                history.push("/");

            }
        })


    }
    const handleApiCall = e => {
        e.preventDefault();
        axios.get('/api/dailycall').then(
            res => console.log(res)
        )
    };
    return (
        <Box sx={{ display: 'flex', }}>
            <CssBaseline />
            <AppBar
                position="fixed"

                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                    backgroundColor: '#FFFFFF',
                    boxShadow: ''
                }}
            >
                <Toolbar
                    disableGutters
                    sx={{
                        minHeight: 64,
                        left: 0,
                        px: 2
                    }}>
                     {/* <IconButton
                        
                        top="edge"
                        onClick={handleDrawerToggle} 
                        sx={{mr:2}}
                    > */}
                        <MenuIcon sx={{color: { sm: '#fff', xs: '#000' }}} onClick={handleDrawerToggle} />
                    {/* </IconButton> */}
                    
                    
                    
                    <Box sx={{ flexGrow: 1 }} />
                    {/* <Tooltip title="Contacts"> */}
                    <Typography variant="subtitle2" color="blue" sx={{ color: '#000', mr: 5 }} onClick={handleApiCall}>Import</Typography>

                    <Typography variant="subtitle2" sx={{ color: '#000' }}>{localStorage.getItem('auth_name')}</Typography>
                    <Tooltip title="Logout">

                        <IconButton  onClick={handleLogout}>
                            <LogoutIcon fontSize="small" sx={{ml:2, color:'#000' }} />
                        </IconButton>
                    </Tooltip>
                </Toolbar>
            </AppBar>
            <Box                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` },backgroundColor:'#ddd',minHeight:'100vh' }}
            >
                <Toolbar />
                {props.children}
            </Box>
        </Box>
    );
}



export default AdminLayout;