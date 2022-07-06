import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import Peoples from "./Peoples"
import Planets from "./Planets"
import Films from "./Films"
import Film from "./Film"

function App() {
  return (
      <Router>
        <div>
          <nav>
                <Link to="/">Home Page </Link>
                <Link to="/people">People </Link>
                <Link to="/planets">Planets </Link>
                <Link to="/films">Films </Link>
          </nav>

          <Routes>
            <Route path="/people" element={<Peoples/>}/>
            <Route path="/planets" element={<Planets/>}/>
            <Route path="/films" element={<Films/>}/>

            <Route path="/films/:id" element={<Film />}/>
          </Routes>
        </div>
      </Router>
  );
}

export default App;