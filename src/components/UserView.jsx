import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom"; // Import Link from react-router-dom for routing

const UserView = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for the search input

  useEffect(() => {
    fetchPodcasts();
  }, []);

  const fetchPodcasts = async () => {
    try {
      const response = await axios.get("http://localhost/api/getPodcasts.php");
      setPodcasts(response.data);
    } catch (error) {
      console.error("Error fetching podcasts:", error);
    }
  };

  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter podcasts based on the search query
  const filteredPodcasts = podcasts.filter((podcast) =>
    podcast.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="user-view">
      {/* Login Button at the top-right */}
      <Link to="/login">
        <Button className="login-button">Login</Button>
      </Link>

      <h1 className="text-center my-4">Podcast List</h1>

      {/* Search Bar */}
      <Form className="search-form">
        <Form.Control
          type="text"
          placeholder="Search Podcasts..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        />
      </Form>

      <div className="card-container">
        {filteredPodcasts.length > 0 ? (
          filteredPodcasts.map((podcast) => (
            <div key={podcast.id} className="podcast-card">
              <div className="card-image-container">
                <Card.Img
                  variant="top"
                  src={`http://localhost/api/${podcast.image}`}
                  alt={podcast.title}
                  className="podcast-image"
                />
                <div className="overlay">
                  <Link to={`/podcast/${podcast.id}`}>
                    <Button variant="primary" className="overlay-button">
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="card-body">
                <Card.Title className="card-title">{podcast.title}</Card.Title>
                <Card.Text className="card-text">
                  {podcast.description}
                </Card.Text>
              </div>
            </div>
          ))
        ) : (
          <p>No podcasts found.</p>
        )}
      </div>

      <style jsx>{`
        .user-view {
          padding: 20px;
          font-family: Arial, sans-serif;
          background-color: #111111; /* Full page background color */
          color: white;
          min-height: 100vh;
        }

        .card-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 20px;
          padding: 20px;
          justify-items: center;
        }

        .podcast-card {
          position: relative;
          width: 100%;
          max-width: 300px;
          border-radius: 8px;
          overflow: hidden;
          background-color: #222;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
        }

        .card-image-container {
          position: relative;
        }

        .podcast-image {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }

        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.6);
          opacity: 0;
          transition: opacity 0.3s ease;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .podcast-card:hover .overlay {
          opacity: 1;
        }

        .overlay-button {
          background-color: #e50914;
          border: none;
          color: white;
          padding: 10px 15px;
          font-size: 1.1em;
          border-radius: 5px;
        }

        .overlay-button:hover {
          background-color: #b20710;
        }

        .card-body {
          padding: 15px;
        }

        .card-title {
          font-size: 1.2em;
          font-weight: bold;
          margin-bottom: 10px;
        }

        .card-text {
          font-size: 1em;
          color: #bbb;
          margin-bottom: 15px;
        }

        .btn-primary {
          background-color: #e50914;
          border: none;
          color: white;
        }

        .btn-primary:hover {
          background-color: #b20710;
        }

        /* Login button style */
        .login-button {
          position: fixed;
          top: 20px;
          right: 20px;
          background-color: #e50914;
          border: none;
          color: white;
          padding: 10px 15px;
          font-size: 1em;
          border-radius: 5px;
        }

        .login-button:hover {
          background-color: #b20710;
        }

        /* Search Bar Style */
        .search-form {
          margin-bottom: 20px;
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
        }

        .search-input {
          background-color: #222;
          border: 1px solid #e50914;
          color: white;
          padding: 10px;
          font-size: 1em;
          border-radius: 5px;
        }

        .search-input::placeholder {
          color: #bbb;
        }
      `}</style>
    </div>
  );
};

export default UserView;
