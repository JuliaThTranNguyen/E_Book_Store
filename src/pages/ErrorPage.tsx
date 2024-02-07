import React from "react";
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import ReportIcon from '@mui/icons-material/Report';

const ErrorPage = () => {
  return (
    <Box>
      <Typography variant="h4">
        < ReportIcon fontSize="large"/>
      There is something wrong. Please return to the homepage. <Link to="/">Click here</Link> 
      </Typography>
    </Box>
  )
}

export default ErrorPage
