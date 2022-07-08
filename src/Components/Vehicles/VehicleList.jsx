import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import VehicleShort from "./VehicleShort";

const VehicleList = () => {
    const [basePage, setBasePage] = useState(false);
    const [error, setError] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    const [vehiclesList, setVehiclesList] = useState([]);
    const [label, setLabel] = useState("");

    const [searchParams] = useSearchParams();
    const [ params ] = searchParams.entries();

    useEffect(() => {
        if (!params) {
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
            fetch(`https://swapi.dev/api/${params[0]}/${params[1]}`)
            .then(res => res.json())
            .then((result) => {
                setIsLoaded(true);
                setVehiclesList(result.vehicles);
                if (params[0] === "films") 
                    setLabel(`from ${result.title}`);
                else
                    setLabel(`with ${result.name}`);
            }, (error) => {
                setIsLoaded(true);
                setError(error);
        })}
    }, [params]);


  if (error) return <div>Error: {error.message}</div>
  else if (!isLoaded) return <div>Loading...</div>
      else return (
          <div>
            <h1>Vehicles {basePage ? null : `${label}`}</h1>
                {basePage ? vehiclesList.map(veh => <VehicleShort vehicle={veh.url} key={veh.url}/>) : vehiclesList.map(veh => <VehicleShort vehicle={veh} key={veh.url}/>)}
          </div>
      );
}

export default VehicleList;