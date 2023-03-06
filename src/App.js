
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";

import Projects from "./components/Projects";
import NewProject from "./components/NewProject";


function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          {/* <Route path="/" element = {<LandingPage />}/> */}
          <Route path="/projects" element = {<Projects />}/>
          <Route path="/new-project" element = {<NewProject />}/>
        </Routes>
     
      </div>
    </Router>
  );
}

export default App;