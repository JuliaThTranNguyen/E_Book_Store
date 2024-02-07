import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAppSelector } from "../hooks/useAppSelector";
import { currentAccessToken, isUserLoggedIn } from "../redux/reducers/authReducer";
import UserCard from "../components/user/UserCard";

export const ProfilePage = () => {
  const accessToken: string | null = useAppSelector(currentAccessToken);
  const isLoggedIn: boolean = useAppSelector(isUserLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the homepage if the user is not authenticated
    console.log("No access token found.")
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  if (!accessToken) {
    // If there is no access token, it means the user is not authenticated
    // You can also redirect here or handle it as needed
    return <div>No access token found.</div>;
  }

  return <UserCard accessToken={accessToken} />;
};
