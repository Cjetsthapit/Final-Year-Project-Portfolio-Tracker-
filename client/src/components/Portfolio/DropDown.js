import { Menu,MenuItem } from '@material-ui/core';
import React from 'react';

const DropDown = ({anchorEl,open,handleClose,id,handleDelete}) => {
  return (
    <Menu
    id="demo-positioned-menu"
    aria-labelledby="demo-positioned-button"
    anchorEl={anchorEl}
    open={open}
    onClose={handleClose}
    anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
    }}
    transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
    }}
>
    <MenuItem onClick={handleClose}>Edit</MenuItem>
    <MenuItem onClick={()=>handleDelete(id)}>Delete Portfolio</MenuItem>

</Menu>
  )
};

export default DropDown;
