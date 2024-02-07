import React from "react";
import { Avatar, Box, Typography } from '@mui/material';
import SensorOccupiedIcon from '@mui/icons-material/SensorOccupied';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';


import { useAppSelector } from '../hooks/useAppSelector';
import { RootStateType } from "../redux/store";
import RegisterForm from "../components/forms/RegisterForm";



const RegisterPage = () => {
  const { isLoggedIn } = useAppSelector((state: RootStateType) => state.auth)

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <SensorOccupiedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Registration
      </Typography>
      {isLoggedIn ? (
        <Typography margin="normal" variant="h4">
          Logged in successfully !
        </Typography>
      ) : (
        <Box>
           <RouterLink to="/login" style={{ textDecoration: 'none' }}>
            <Link href="/login" variant="body2">
              {'Already have an account here? Sign in here ...'}
            </Link>
          </RouterLink>
          <RegisterForm />
         
        </Box>
      )}
    </Box>
  )
}

export default RegisterPage


