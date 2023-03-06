import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="main">
      <h1>Project Management App</h1>
      <div className="links"> 
        <Link to="/projects">View Projects</Link>
        <Link to="/new-project"> New Project</Link>
       </div>
       
    </div>
  );
}



export default Header;