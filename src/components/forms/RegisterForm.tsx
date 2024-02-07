import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, TextField, Typography } from "@mui/material";

import { User } from "../../types/User";
import { RegisterSchema } from "../../schemas/RegisterSchema";
import { addUser } from "../../functions/forUser";

const RegisterForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(RegisterSchema),
  });

  const navigate = useNavigate();

  const onFormSubmit = async (data: Partial<User>) => {
    const newUser: Partial<User> = {
      firstName: data.firstName as string,
      lastName: data.lastName as string,
      email: data.email as string,
      password: data.password as string,
      image: data.image
        ? data.image
        : `https://ui-avatars.com/api/?name=${data.firstName?.replaceAll(
            /\s/g,
            "%20"
          )}`,
    };

    const res = await addUser(newUser);
    if (res) {
      alert("Successfully created new account. Directing user to login...");
      navigate("/login");
    }
  };

  return (
    <Box
    maxWidth="md"
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minWidth: "50vw",
      minHeight: "50vh",
      marginTop: "45px",
    }}
    >
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <Box>
          <Box>
            <TextField
              margin="normal"
              fullWidth
              label="First Name"
              {...register("firstName")}
            />
            {errors.firstName && (
              <Typography
                variant="subtitle1"
                sx={{
                  color: "red",
                }}
              >
                {errors.firstName?.message}
              </Typography>
            )}
          </Box>
          <Box>
            <TextField
              margin="normal"
              fullWidth
              label="Last Name"
              {...register("lastName")}
            />
            {errors.lastName && (
              <Typography
                variant="subtitle1"
                sx={{
                  color: "red",
                }}
              >
                {errors.lastName?.message}
              </Typography>
            )}
          </Box>
          <Box>
            <TextField
              margin="normal"
              fullWidth
              label="Email Address"
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
              fullWidth
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
          <Box>
            <TextField
              margin="normal"
              fullWidth
              label="Image's url "
              {...register("image")}
            />
            {errors.image && (
              <Typography
                variant="subtitle1"
                sx={{
                  color: "red",
                }}
              >
                {errors.image?.message}
              </Typography>
            )}
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default RegisterForm;
