import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";
import AddPodcast from "./components/AddPodcast";
import PodcastList from "./components/PodcastList";
import UserView from "./components/UserView";
import SingleUserView from "./components/SingleUserView";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/add-podcast" element={<AddPodcast />} />
        <Route path="/view-podcasts" element={<PodcastList />} />
        <Route path="/" element={<UserView />} />
        <Route path="/podcast/:id" element={<SingleUserView />} />{" "}
        {/* Route to single podcast */}
      </Routes>
    </Router>
  );
}

export default App;
