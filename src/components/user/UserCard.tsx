import React, { useCallback, useEffect, useState } from "react";

import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogTitle,
} from "@mui/material";
import styled from "@emotion/styled";
import { useAppSelector } from "../../hooks/useAppSelector";
import { RootStateType } from "../../redux/store";
import { User } from "../../types/User";
import { UserLogout, getUserProfile } from "../../redux/reducers/authReducer";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useNavigate } from "react-router-dom";
import EditUserData from "../forms/EditUserData";
import { updateUser } from "../../functions/forUser";

const ProfileContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: 20,
  width: 600,
  margin: "auto",
  marginTop: 50,
});

const ImageContainer = styled("div")({
  textAlign: "center",
});

const ProfileImage = styled("img")({
  borderRadius: "50%",
  width: 100,
  height: 100,
  marginBottom: 10,
});

const ProfileHeader = styled(Typography)({
  marginBottom: 20,
});

const ProfileContent = styled("form")({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  "& .MuiTextField-root": {
    marginBottom: 20,
  },

  "& .MuiButton-root": {
    marginTop: 20,
  },
});

const FormButton = styled(Button)({
  color: "primary",
  marginLeft: 0,
  marginTop: 5,
});

interface UserProps {
  accessToken: string | null;
}

const UserCard: React.FC<UserProps> = ({ accessToken }) => {
  const { user, loading } = useAppSelector(
    (state: RootStateType) => state.auth
  );
  const [userData, setUserData] = useState<User | null>(null);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const fetchUserProfile = useCallback(async () => {
    try {
      if (!accessToken) {
        console.error("Token is missing!");
        return;
      }

      const response = await dispatch(getUserProfile());
      if (getUserProfile.fulfilled.match(response)) {
        setUserData(response.payload);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  }, [dispatch, accessToken]);

  const handleLogOut = () => {
    dispatch(UserLogout());
    navigate("/login");
  };

  // Inside your UserCard component
  const handleInputChange = (field: string, value: string) => {
    setUserData((prevUserData: User | null) => {
      if (!prevUserData) {
        return prevUserData;
      }

      return {
        ...prevUserData,
        [field]: value,
      };
    });
  };

  const handleOpenEditForm = () => {
    setIsEditFormOpen(true);
  };

  const handleCloseEditForm = () => {
    setIsEditFormOpen(false);
  };

  const handleSaveEditedUser = async (editedUser: User | null) => {
    try {
      if (editedUser) {
        await updateUser(user?._id, editedUser, accessToken);

        handleCloseEditForm();
        fetchUserProfile();
      } else {
        console.error("Edited user is null.");
      }
    } catch (error) {
      console.error("Error saving edited user:", error);
      // Handle error as needed
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchUserProfile();
    };
    fetchData();
  }, [fetchUserProfile]);

  if (loading || userData === null) {
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
        marginTop: "45px",
      }}
    >
      <ProfileContainer>
        <Paper elevation={3}>
          <Box p={3} style={{ display: isEditFormOpen ? "none" : "block" }}>
            <ImageContainer>
              <ProfileImage src={user?.image} alt="Profile" />
            </ImageContainer>
            <ProfileHeader variant="h5" textAlign={"center"} gutterBottom>
              Hi! {user?.firstName}
            </ProfileHeader>
            <ProfileContent>
              <TextField
                label="First Name"
                variant="outlined"
                fullWidth
                value={userData?.firstName || ""}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
              />

              <TextField
                label="Last Name"
                variant="outlined"
                fullWidth
                value={userData?.lastName || ""}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
              />
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                value={userData?.email || ""}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </ProfileContent>

            <FormButton
              variant="outlined"
              color="primary"
              onClick={handleOpenEditForm}
              fullWidth
            >
              Edit Profile
            </FormButton>
            <FormButton
              variant="outlined"
              color="error"
              onClick={handleLogOut}
              fullWidth
            >
              LogOut
            </FormButton>
          </Box>
        </Paper>
      </ProfileContainer>

      <Dialog open={isEditFormOpen} onClose={handleCloseEditForm}>
        <DialogTitle>Edit User Profile</DialogTitle>
        <EditUserData
          user={userData}
          open={isEditFormOpen}
          onClose={handleCloseEditForm}
          onSave={handleSaveEditedUser}
        />
      </Dialog>
    </Box>
  );
};

export default UserCard;
