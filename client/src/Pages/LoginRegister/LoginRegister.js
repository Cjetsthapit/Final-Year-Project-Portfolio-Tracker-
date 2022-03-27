import React from 'react'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Login from '../../components/Login/Login';
import Register from '../../components/Register/Register';
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}


function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const LoginRegister = () => {
  const [value, setValue] = React.useState(0);
  const paperStyle = { width: '50%', margin: "20px auto" }
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Box style={paperStyle} elevation={10}>
        <Tabs value={value} onChange={handleChange} centered indicatorColor="primary"
          textColor="primary">
          <Tab label="Login" {...a11yProps(0)} />
          <Tab label="Register" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Login handleChange={handleChange} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Register handleChange={handleChange} />
      </TabPanel>
    </>

  );

}

export default LoginRegister;
