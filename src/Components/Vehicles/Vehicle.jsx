import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getData } from "../../API";

const Vehicle = () => {
    const [result, setResult] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);

    const { id } = useParams();

    useEffect(() => {
        getData(`https://swapi.dev/api/vehicles/${id}`).then(res => {
            setIsLoaded(true);
            if (res.success) {
                setResult(res);
            }
        })
        .catch(error => console.error(error));
    }, [id]);

    if (!isLoaded) {
        return <div>Loading...</div>;
      } else if (!result.success) {
        return <div>Error</div>;
      } else {
        return (
            <div>
                <h1>{result.name}</h1>
                <h2>Model: {result.model}</h2>
                <h2>Manufacturer: {result.manufacturer}</h2>
                <h2>Cost in credits: {result.cost_in_credits}</h2>
                <h2>Length: {result.length}</h2>
                <h2>Max atmosphering speed: {result.max_atmosphering_speed}</h2>
                <h2>Crew: {result.crew}</h2>
                <h2>Passengers: {result.passengers}</h2>
                <h2>Cargo capacity: {result.cargo_capacity}</h2>
                <h2>Consumables: {result.consumables}</h2>
                <h2>Vehicle class: {result.vehicle_class}</h2>
                <Link to={`/people?category=vehicles&id=${id}`}>Pilots </Link>
                <Link to={`/films?category=vehicles&id=${id}`}>Films </Link>
            </div>
        );
      }
}

export default Vehicle;