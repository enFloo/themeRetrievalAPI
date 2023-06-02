import React from 'react';
import { 
    AppBar,
    Toolbar,
    CssBaseline,
    Typography,
} from '@mui/material';

export default function Navbar(){

    return(
        <AppBar position='static'>
            <CssBaseline />
            <Toolbar>
                <Typography variant='h4'>
                    BrandName
                </Typography>
            </Toolbar>
        </AppBar>
    )
}