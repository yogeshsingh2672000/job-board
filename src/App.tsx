import React, { useState } from "react";
import "./App.css";
import Layout from "./layout/Layout";

function App() {
  const [jobListings, setJobListings] = useState<any>(null);

  return (
    <div className="App h-screen">
      <Layout setJobListings={setJobListings} jobListings={jobListings} />
    </div>
  );
}

export default App;
