import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Home from "./Components/Home/Home"
import Menu from "./Components/Menu/Menu"
import FilmList from "./Components/Films/FilmList"
import Film from "./Components/Films/Film"
import PeopleList from "./Components/People/PeopleList"
import People from "./Components/People/People"
import PlanetList from "./Components/Planets/PlanetList"
import Planet from "./Components/Planets/Planet"
import SpecieList from "./Components/Species/SpecieList";
import Specie from "./Components/Species/Specie";
import StarshipList from "./Components/Starships/StarshipList";
import Starship from "./Components/Starships/Starship";
import VehicleList from "./Components/Vehicles/VehicleList";
import Vehicle from "./Components/Vehicles/Vehicle";
import PageNotFound from "./Components/PageNotFound";

function App() {
  return (
    <div>
      <Router>
        <Menu />
        
        <Routes>
          <Route path="/" element={<Home/>}/>

            <Route path="/films">
              <Route index element={<FilmList />} />
              <Route path=":id" element={<Film />}/>
            </Route>

            <Route path="/people">
              <Route index element={<PeopleList />} />
              <Route path=":id" element={<People />}/>
            </Route>

            <Route path="/planets">
              <Route index element={<PlanetList />} />
              <Route path=":id" element={<Planet />}/>
            </Route>

            <Route path="/species">
              <Route index element={<SpecieList />} />
              <Route path=":id" element={<Specie />}/>
            </Route>

            <Route path="/starships">
              <Route index element={<StarshipList />} />
              <Route path=":id" element={<Starship />}/>
            </Route>

            <Route path="/vehicles">
              <Route index element={<VehicleList />} />
              <Route path=":id" element={<Vehicle />}/>
            </Route>

            <Route path="/*" element={<PageNotFound />}/>

         </Routes>
      </Router>
    </div>
  );
}

export default App;