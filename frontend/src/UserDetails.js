import React, { useState, useEffect } from "react";
import Header from "./components/Header";

export default function UserDetails() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <div className="user">
        <form>
          <h1>User Details</h1>
          {user ? (
            <div>
              <p>
                <strong>first Name:</strong> {user.first_name}
              </p>
              <p>
                <strong>last name :</strong> {user.last_name}
              </p>
              <p>
                <strong>phone:</strong> {user.phone}
              </p>
              <p>
                <strong>state:</strong> {user.state}
              </p>
              <p>
                <strong>state:</strong> {user.city}
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
