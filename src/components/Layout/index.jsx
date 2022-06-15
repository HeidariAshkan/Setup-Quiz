import { Card } from '@mui/material';
import React from 'react'
import Header from './../common/Header/Header';
import { Box } from '@mui/material';

function Layout({ children }) {
  return (
    <>
        <Box className='flex justify-center items-center h-[100%]'>            
            <Card sx={{ width: '30%', padding:5}} variant="outlined">
                <Header/>
                {children}
            </Card>
        </Box>
    </>
  )
}

export default Layout