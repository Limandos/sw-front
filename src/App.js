import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import People from "./People"
import Planets from "./Planets"
import Films from "./Films"

function App() {
  return (
    <Router>
      <div>
        <nav>
              <Link to="/">Домой </Link>
              <Link to="/people">Герои </Link>
              <Link to="/planets">Планеты </Link>
              <Link to="/films">Фильмы </Link>
        </nav>

        <Routes>
          <Route path="/people" element={<People/>}/>
          <Route path="/planets" element={<Planets/>}/>
          <Route path="/films" element={<Films/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;