import React, { useState } from 'react'
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import axios from 'axios';
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify';
const Login = ({ handleChange }) => {
    const history = useHistory();

    const [email, setEmail] = useState('sthapitsrijan3@gmail.com');
    const [password, setPassword] = useState('123456');
    const paperStyle = { padding: 40, minHeight: '50vh', minWidth: '350px',width:'30%', margin: "0 auto" }
    const avatarStyle = {  backgroundColor: '#222' }
    const btnstyle = { margin: '8px 0', backgroundColor: '#222' }
    const handleLogin = (e) => {
        e.preventDefault();
        console.log(email)
        const loginDetails = { email, password };
        axios.get('/sanctum/csrf-cookie').then((response) => {
            axios.post('/api/login', loginDetails).then((res) => {
                console.log(res.data);
                if (!password || !email) {
                    return toast.error('Please fill in all the values');
                }

                if (res.data.status === 200) {
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.username);
                    localStorage.setItem('auth_id', res.data.user_id);
                    localStorage.setItem('auth_role', res.data.role);
                    localStorage.setItem('verified', res.data.verified_at);

                    // localStorage.setItem('verified_at', res.data.verified_at);
                    toast.success('Logged in Successfully');
                    if (res.data.role === 'admin') {
                        history.push('/admin/dashboard');
                    } else {
                        if(res.data.verified_at === null){
                            console.log('1')
                            history.push('/email')
                        }
                        else{
                            history.push('/homepage')
                        }
                    }
                } else if (res.data.status === 401) {
                    return toast.error(res.data.message);
                }
            });
        });
    };
    return (
        <Grid >
            <Paper style={paperStyle} elevation={24}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                    <Typography variant="h5">Login</Typography>
                </Grid>
                <form onSubmit={handleLogin}>
                    <TextField label='Email' placeholder='Enter email' fullWidth margin="dense" variant="filled" value={email} onChange={e => setEmail(e.target.value)} />
                    <TextField label='Password' placeholder='Enter password' type='password' fullWidth margin="dense" variant="filled" value={password} onChange={e => setPassword(e.target.value)} />
                    <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth >Login</Button>
                </form>
                <Typography >
                    <Link href="/forgot-password" >
                        Forgot password?
                    </Link>
                </Typography>
                <Typography > Do you have an account ?
                    <Link href="#" onClick={() => handleChange("event", 1)} >
                        Sign Up
                    </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}

export default Login

