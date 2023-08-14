'use client'

import { useEffect, useState } from "react";

const Dashboard = () => {
    const [username, setUsername] = useState(null);

    useEffect(() => {
        async function fetchUserData() {
            try {
                const response = await fetch("/api/users/me");
                if (response.ok) {
                    const data = await response.json();
                    setUsername(data.user);
                } else {
                    console.error("Failed to fetch user data");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        }

        fetchUserData();
    }, []);

    return (
        <div>
            {username ? (
                <p>Welcome, {username}!</p>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Dashboard;






