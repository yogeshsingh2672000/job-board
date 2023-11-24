import React, { useState } from "react";
import "./App.css";
// import Layout from "./layout/Layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Feed from "./components/feed/Feed";
import JobDetails from "./components/jobDetail/JobDetails";
import Form from "./components/form/Form";
import NoPage from "./components/404/NoPage";

function App() {
  return (
    <div className="App h-screen">
      <Router>
        <Routes>
          <Route index element={<Feed />} />
          <Route path="/job/:id" element={<JobDetails />} />
          <Route path="/job/:id/apply" element={<Form />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
