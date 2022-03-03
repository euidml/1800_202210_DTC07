import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TinderCards from './mainProfileCards';



function main() {
    return (
      <div className="main">
        <Router>
          <Routes>
            <Route exact path="/" element={<TinderCards/>}>
            </Route>
          </Routes>
        </Router>
      </div>
    );
}



export default main;