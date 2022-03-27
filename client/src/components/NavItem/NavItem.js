import { ListItem } from '@material-ui/core'
import React from 'react'
import { NavLink } from 'react-router-dom'

const NavItem = ({ href, title }) => {

    return (
        <ListItem
            disableGutters
            sx={{
                display: 'flex',
                mb: 0.5,
                py: 0,
                px: 5,
            }}
        >
            <NavLink to={href} style={{
                textDecoration: 'none',
                borderRadius: 1,
                padding: '11px 24px',
                textAlign: 'left',
                textTransform: 'none',
                width: '100%',
                color: '#D1D5DB',
            }}
                activeStyle={{
                    backgroundColor: 'rgba(255,255,255, 0.08)',
                    fontWeight: '600',
                    color: '#e3e3e3'
                }}
            >
                {title}
            </NavLink>
        </ListItem >
    )
}

export default NavItem
