import React from "react";
import { getCurrentUser } from "../services/authService";

const Profile = () => {
  const user = getCurrentUser();
  return (
    <div>
      <h1>Hello {user.username}</h1>
    </div>
  );
};

export default Profile;
