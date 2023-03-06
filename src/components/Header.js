import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="landing">
      <h1>Project Management App</h1>
        <Link to="/projects">View Projects</Link>
        <Link to="/new-project"> New Project</Link>
    </div>
  );
}

export default Home;