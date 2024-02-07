import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
} from "@mui/material";
import { User } from "../../types/User";
import { EditUser } from "../../schemas/EditUser";

interface EditUserDataProps {
  user: User | null;
  open: boolean;
  onClose: () => void;
  onSave: (editedUser: User) => void;
}

const EditUserData: React.FC<EditUserDataProps> = ({
  user,
  open,
  onClose,
  onSave,
}) => {
  const [editedUser, setEditedUser] = useState<User>({
    _id: user?._id || "",
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    role: user?.role || "USER", // Assuming a default role
    email: user?.email || "",
    password: user?.password || "",
    image: user?.image || "",
    borrowedBooks: user?.borrowedBooks || [],
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(EditUser),
  });

  const handleInputChange = (field: string, value: string) => {
    setEditedUser((prevUser) => {
      if (!prevUser) {
        return prevUser;
      }

      return {
        ...prevUser,
        [field]: value,
      };
    });
  };

  const handleSave = () => {
    if (editedUser) {
      onSave(editedUser);
    }
    onClose();
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
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit User Profile</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(handleSave)}>
          <TextField
            label="First Name"
            variant="outlined"
            fullWidth
            {...register("firstName")}
            value={editedUser?.firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            error={Boolean(errors.firstName)}
            helperText={errors.firstName?.message}
            sx={{ marginBottom: 5, marginTop: 5 }}
          />
          <TextField
            label="Last Name"
            variant="outlined"
            fullWidth
            {...register("lastName")}
            value={editedUser?.lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            error={Boolean(errors.lastName)}
            helperText={errors.lastName?.message}
            sx={{ marginBottom: 5 }}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            {...register("email")}
            value={editedUser?.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
            sx={{ marginBottom: 5 }}
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            {...register("password")}
            value={editedUser?.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
            sx={{ marginBottom: 5 }}
          />
          <TextField
            label="Image"
            variant="outlined"
            fullWidth
            {...register("image")}
            value={editedUser?.image}
            onChange={(e) => handleInputChange("image", e.target.value)}
            error={Boolean(errors.image)}
            helperText={errors.image?.message}
            sx={{ marginBottom: 5 }}
          />
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit">Save</Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
    </Box>

  );
};

export default EditUserData;
