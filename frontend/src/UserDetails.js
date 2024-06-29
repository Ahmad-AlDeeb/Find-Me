import React, { useState, useEffect } from "react";
import Header from "./components/Header";

export default function UserDetails() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:8000/user-details/");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error("There was a problem with fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      <Header />
      <div className="user">
        <form>
          <h1>User Details</h1>
          {user ? (
            <div>
              <p>
                <strong>First Name:</strong> {user.first_name}
              </p>
              <p>
                <strong>Last Name:</strong> {user.last_name}
              </p>
              <p>
                <strong>Phone:</strong> {user.phone}
              </p>
              <p>
                <strong>State:</strong> {user.state}
              </p>
              <p>
                <strong>City:</strong> {user.city}
              </p>
            </div>
          ) : (
            <p>No user data available</p>
          )}
        </form>
      </div>
    </div>
  );
}
