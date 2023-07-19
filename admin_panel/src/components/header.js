import React from 'react'
import {AppBar, Toolbar, Typography } from '@mui/material';

export default function Header(props) {
  return (
    <AppBar position="static" style={{ backgroundColor: '#002147' }}>
              <Toolbar>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ flexGrow: 1}}
                >
                  {props.title}
                </Typography>
              </Toolbar>
    </AppBar>
  )
}