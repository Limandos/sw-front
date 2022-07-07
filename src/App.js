import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Peoples from "./Components/People/Peoples"
import People from "./Components/People/People"
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

            <Route path="/people">
              <Route index element={<Peoples />} />
              <Route path=":id" element={<People/>}/>
            </Route>

            <Route path="/planets" element={<Planets/>}/>

            <Route path="/films">
              <Route index element={<Films />} />
              <Route path=":id" element={<Film/>}/>
            </Route>

         </Routes>
      </Router>
    </div>
  );
}

export default App;