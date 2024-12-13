import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="links-container">
        <Link to="/add-podcast" className="dashboard-link">
          Add Podcast
        </Link>
        <Link to="/view-podcasts" className="dashboard-link">
          View Podcasts
        </Link>
      </div>

      <style jsx>{`
        .admin-dashboard {
          text-align: center;
          padding: 50px 20px;
          background-color: #141414; /* Netflix dark background */
          color: #fff; /* White text */
          font-family: Arial, sans-serif;
        }

        h1 {
          font-size: 3rem; /* Larger heading */
          color: #fff; /* White color for heading */
          margin-bottom: 30px;
          font-weight: bold;
        }

        .links-container {
          display: flex;
          justify-content: center;
          gap: 40px;
        }

        .dashboard-link {
          padding: 12px 30px;
          background-color: #e50914; /* Netflix red */
          color: white;
          text-decoration: none;
          border-radius: 4px;
          font-size: 1.4em;
          transition: background-color 0.3s ease, transform 0.3s ease;
        }

        .dashboard-link:hover {
          background-color: #b20710; /* Darker red on hover */
          transform: scale(1.05); /* Slight scaling effect */
        }

        .dashboard-link:focus {
          outline: none; /* Remove outline when focused */
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
