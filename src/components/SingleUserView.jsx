import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // Import useParams to access route params
import { Card, Button } from "react-bootstrap";

const SingleUserView = () => {
  const { id } = useParams(); // Get the podcast ID from the route parameter
  const [podcast, setPodcast] = useState(null);

  useEffect(() => {
    fetchPodcastDetails();
  }, [id]);

  const fetchPodcastDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost/api/getPodcastById.php?id=${id}`
      );
      setPodcast(response.data);
    } catch (error) {
      console.error("Error fetching podcast details:", error);
    }
  };

  if (!podcast) return <p>Loading...</p>;

  return (
    <div className="single-podcast-view">
      <Card className="podcast-card">
        <Card.Img
          variant="top"
          src={`http://localhost/api/${podcast.image}`}
          alt={podcast.title}
          className="podcast-image"
        />
        <Card.Body>
          <Card.Title>{podcast.title}</Card.Title>
          <Card.Text>{podcast.description}</Card.Text>
          <p>
            <strong>Language:</strong> {podcast.language}
          </p>
          <Button
            variant="primary"
            href={`http://localhost/api/${podcast.audio_file}`}
            target="_blank"
          >
            Listen
          </Button>
        </Card.Body>
      </Card>

      <style jsx>{`
        .single-podcast-view {
          padding: 20px;
        }

        .podcast-card {
          width: 100%;
          border: 1px solid #ddd;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .podcast-image {
          width: 100%;
          height: 200px;
          object-fit: cover;
          border-bottom: 1px solid #ddd;
        }

        .card-body {
          padding: 15px;
        }

        .card-title {
          font-size: 1.5em;
          font-weight: bold;
          margin-bottom: 10px;
        }

        .card-text {
          font-size: 1em;
          color: #555;
          margin-bottom: 15px;
        }

        .btn-primary {
          background-color: #3498db;
          border: none;
          color: white;
        }

        .btn-primary:hover {
          background-color: #2980b9;
        }
      `}</style>
    </div>
  );
};

export default SingleUserView;
