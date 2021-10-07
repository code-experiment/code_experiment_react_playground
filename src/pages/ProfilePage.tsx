// TOOD:  Need to figure out how to push the user to the home page after logout
import * as React from "react";
import Button from "../components/Button";
import { useAuth } from "../contexts/AuthContext";

const ProfilePage = () => {
  const { logout, user } = useAuth();
  return (
    <div>
      <div>{user?.username}</div>
      <div>You have {user?.todos.length} Todos</div>
      <Button text="Logout" onClick={logout} />
    </div>
  );
};

export default ProfilePage;
