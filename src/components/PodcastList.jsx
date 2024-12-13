import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";

const PodcastList = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [selectedPodcast, setSelectedPodcast] = useState(null);
  const [showModal, setShowModal] = useState(false);

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

  const deletePodcast = async (id) => {
    try {
      await axios.post("http://localhost/api/deletePodcast.php", { id });
      fetchPodcasts();
    } catch (error) {
      console.error("Error deleting podcast:", error);
    }
  };

  const handleEditClick = (podcast) => {
    setSelectedPodcast(podcast);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setSelectedPodcast(null);
    setShowModal(false);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", selectedPodcast.id);
    formData.append("title", selectedPodcast.title);
    formData.append("language", selectedPodcast.language);
    formData.append("description", selectedPodcast.description);

    try {
      await axios.post("http://localhost/api/editPodcast.php", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      fetchPodcasts();
      handleModalClose();
    } catch (error) {
      console.error("Error updating podcast:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedPodcast((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="podcast-list">
      <h1>Podcast List</h1>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Language</th>
              <th>Description</th>
              <th>Image</th>
              <th>Audio</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {podcasts.map((podcast) => (
              <tr key={podcast.id}>
                <td>{podcast.title}</td>
                <td>{podcast.language}</td>
                <td>{podcast.description}</td>
                <td>
                  {podcast.image && (
                    <img
                      src={`http://localhost/api/${podcast.image}`}
                      alt={podcast.title}
                      className="podcast-image"
                    />
                  )}
                </td>
                <td>
                  {podcast.audio_file && (
                    <audio controls>
                      <source
                        src={`http://localhost/api/${podcast.audio_file}`}
                      />
                      Your browser does not support the audio element.
                    </audio>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => handleEditClick(podcast)}
                    className="edit-button"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deletePodcast(podcast.id)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Form */}
      {selectedPodcast && (
        <Modal show={showModal} onHide={handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Podcast</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleFormSubmit}>
              <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={selectedPodcast.title}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Language</Form.Label>
                <Form.Control
                  type="text"
                  name="language"
                  value={selectedPodcast.language}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={selectedPodcast.description}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-3">
                Save Changes
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      )}

      <style jsx>{`
        .podcast-list {
          padding: 20px;
          font-family: Arial, sans-serif;
        }

        h1 {
          text-align: center;
          font-size: 2.5em;
          color: #333;
          margin-bottom: 20px;
        }

        .table-container {
          overflow-x: auto;
          max-height: 500px;
          margin: 0 auto;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          border: 1px solid #ddd;
        }

        th,
        td {
          padding: 10px;
          text-align: left;
          border: 1px solid #ddd;
        }

        th {
          background-color: #f4f4f4;
          font-size: 1.1em;
          color: #333;
        }

        td {
          font-size: 1em;
          color: #555;
        }

        .podcast-image {
          width: 100px;
          height: 100px;
          object-fit: cover;
          border-radius: 8px;
        }

        .edit-button,
        .delete-button {
          padding: 5px 10px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 1em;
          transition: background-color 0.3s ease;
        }

        .edit-button {
          background-color: #3498db;
          color: white;
        }

        .edit-button:hover {
          background-color: #2980b9;
        }

        .delete-button {
          background-color: #e74c3c;
          color: white;
        }

        .delete-button:hover {
          background-color: #c0392b;
        }
      `}</style>
    </div>
  );
};

export default PodcastList;
