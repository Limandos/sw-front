import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Peoples from "./Components/People/Peoples"
import Planets from "./Components/Planets/Planets"
import Films from "./Components/Films/Films"
import Film from "./Components/Films/Film"
import Home from "./Components/Home"
import Menu from "./Components/Menu"

function App() {
  return (
    <div>
      <Router>
        <Menu />
        
        <Routes>
          <Route path="/" element={<Home/>}/>
           <Route path="/people" element={<Peoples/>}/>
           <Route path="/planets" element={<Planets/>}/>
           <Route path="/films" element={<Films/>}/>
           <Route path="/films/:id" element={<Film />}/>
         </Routes>
      </Router>
    </div>
  );
}

export default App;