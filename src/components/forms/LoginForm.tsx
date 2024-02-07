import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, TextField, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useNavigate } from "react-router-dom";

import { User } from "../../types/User";
import { useAppSelector } from "../../hooks/useAppSelector";
import { RootStateType } from "../../redux/store";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { userLogin } from "../../redux/reducers/authReducer";
import { LoginSchema } from "../../schemas/LoginSchema";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(
    (state: RootStateType) => state.auth
  );

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchema),
  });

  const onFormSubmit = (data: Partial<User>) => {
    dispatch(
      userLogin({
        email: data.email as string,
        password: data.password as string,
      })
    ).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        navigate("/profile");
      }
    });
  };

      /*HANDLE LOADING DATA ... */
      if (loading) {
        return <div>Loading...</div>;
      }

  return (
    <Box
    maxWidth="md"
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minWidth: "50vw",
      minHeight: "50vh",
    }}
    >
      {error && (
        <Typography
          variant="subtitle1"
          sx={{
            color: "red",
          }}
        >
          Check again your credentials
        </Typography>
      )}
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <Box>
          <TextField
            margin="normal"
            label="Email address"
            {...register("email")}
          />
          {errors.email && (
            <Typography
              variant="subtitle1"
              sx={{
                color: "red",
              }}
            >
              {errors.email?.message}
            </Typography>
          )}
        </Box>
        <Box>
          <TextField
            margin="normal"
            label="Password"
            type="password"
            {...register("password")}
          />
          {errors.password && (
            <Typography
              variant="subtitle1"
              sx={{
                color: "red",
              }}
            >
              {errors.password?.message}
            </Typography>
          )}
        </Box>
        <LoadingButton
          loading={loading}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Login
        </LoadingButton>
      </form>
    </Box>
  );
};

export default LoginForm;
