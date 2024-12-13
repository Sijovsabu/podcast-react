import React, { useState } from "react";
import axios from "axios";

const AddPodcast = () => {
  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [audioFile, setAudioFile] = useState(null);

  const addPodcast = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("language", language);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("audio_file", audioFile);

    try {
      await axios.post("http://localhost/api/addPodcast.php", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Podcast added successfully");
    } catch (error) {
      console.error("Error adding podcast:", error);
    }
  };

  return (
    <div className="container">
      <h1>Add Podcast</h1>
      <form onSubmit={addPodcast}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />
        <input
          type="file"
          accept="audio/*"
          onChange={(e) => setAudioFile(e.target.files[0])}
          required
        />
        <button type="submit">Add Podcast</button>
      </form>

      {/* Internal CSS */}
      <style>
        {`
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f7fc;
            border-radius: 8px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          }

          h1 {
            text-align: center;
            font-size: 2rem;
            margin-bottom: 20px;
            color: #333;
          }

          form {
            display: flex;
            flex-direction: column;
            gap: 15px;
          }

          input,
          textarea,
          button {
            padding: 12px;
            font-size: 1rem;
            border-radius: 8px;
            border: 1px solid #ccc;
            outline: none;
          }

          input[type="file"] {
            padding: 5px;
            font-size: 0.9rem;
          }

          textarea {
            min-height: 120px;
            resize: vertical;
          }

          input:focus,
          textarea:focus {
            border-color: #5b9bd5;
          }

          button {
            background-color: #4CAF50;
            color: white;
            cursor: pointer;
            border: none;
            font-size: 1.1rem;
            transition: background-color 0.3s ease;
          }

          button:hover {
            background-color: #45a049;
          }

          input[type="file"]:focus {
            border-color: #4CAF50;
          }

          input[type="text"]:focus {
            border-color: #4CAF50;
          }

          label {
            font-weight: bold;
          }

          input[type="text"],
          textarea {
            background-color: #ffffff;
          }

          input[type="file"] {
            background-color: #fafafa;
          }
        `}
      </style>
    </div>
  );
};

export default AddPodcast;
