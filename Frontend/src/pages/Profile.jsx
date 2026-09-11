import React, { useEffect, useState } from "react";
import "./Profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/login";
  };

  if (!user) {
    return (
      <div className="profile-page">
        <div className="profile-card">
          <h2>Please Login</h2>
          <p>You need to login to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-card">

        <div className="profile-avatar">
          {user.name?.charAt(0).toUpperCase()}
        </div>

        <h1>My Profile</h1>
        <p className="profile-subtitle">
          Manage your account information
        </p>

        <div className="profile-info">

          <div className="profile-item">
            <span>Name</span>
            <strong>{user.name}</strong>
          </div>

          <div className="profile-item">
            <span>Email</span>
            <strong>{user.email}</strong>
          </div>

          <div className="profile-item">
            <span>Account Type</span>
            <strong>{user.role || "User"}</strong>
          </div>

        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>

      </div>
    </div>
  );
};

export default Profile;