import React from "react";
import { Avatar, Box, Typography } from "@mui/material";
import Link from "@mui/material/Link";
import { useAppSelector } from "../hooks/useAppSelector";

import { Link as RouterLink } from "react-router-dom";
import LoginForm from "../components/forms/LoginForm";
import { RootStateType } from "../redux/store";

const LoginPage = () => {
  const { user, isLoggedIn } = useAppSelector(
    (state: RootStateType) => state.auth
  );

  return (
    <Box
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minWidth: "50vw",
        minHeight: "50vh",
      }}
    >
      <Avatar
        src={user?.image}
        alt={user?.firstName}
        sx={{ bgcolor: "secondary.main" }}
      />

      <Typography component="h1" variant="h5">
        Welcome Back.
      </Typography>
      {isLoggedIn ? (
        <Typography margin="normal" variant="body2" color={"grey"}>
          Please wait moment ...
        </Typography>
      ) : (
        <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
        >
          <Link
            to="/register"
            component={RouterLink}
            style={{ textDecoration: "none" }}
          >
            {"New to E-Shop? Sign up now"}
          </Link>
          <LoginForm />
        </Box>
      )}
    </Box>
  );
};

export default LoginPage;
