import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import VehicleShort from "./VehicleShort";

const VehicleList = () => {
  const [basePage, setBasePage] = useState(false);
  const [error, setError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const [vehiclesList, setVehiclesList] = useState([]);
  const [paramName, setParamName] = useState("");

  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (!searchParams.get("episode")) {
        setBasePage(true);
        fetch("https://swapi.dev/api/vehicles")
        .then(res => res.json())
        .then((result) => {
            setIsLoaded(true);
            setVehiclesList(result.results);
        }, (error) => {
            setIsLoaded(true);
            setError(error);
        })}
    else {
        fetch("https://swapi.dev/api/films/" + searchParams.get("episode"))
        .then(res => res.json())
        .then((result) => {
            setIsLoaded(true);
            setVehiclesList(result.vehicles);
        }, (error) => {
            setIsLoaded(true);
            setError(error);
        })
    }
}, []);


  if (error) return <div>Error: {error.message}</div>
  else if (!isLoaded) return <div>Loading...</div>
      else return (
          <div>
            <h1>Vehicles {basePage ? null : "with " + paramName}</h1>
              {basePage ? vehiclesList.map(veh => <VehicleShort vehicle={veh.url}/>) : vehiclesList.map(veh => <VehicleShort vehicle={veh}/>)}
          </div>
      );
}

export default VehicleList;