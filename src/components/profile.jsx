import React from "react";
import { getCurrentUser } from "../services/authService";

const Profile = () => {
  const user = getCurrentUser();
  return <h1>Hello {user.username}</h1>;
};

export default Profile;
