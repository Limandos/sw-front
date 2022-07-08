import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PlanetShort = ({planet}) => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const [name, setName] = useState("");
    const [gravity, setgravity] = useState("");
    const [terrain, setTerrain] = useState("");
    const [population, setPopulation] = useState(0);
    const [url, setUrl] = useState("");

    useEffect(() => {
        fetch(planet)
        .then(res => res.json())
        .then((result) => {
                setIsLoaded(true);
                setName(result.name);
                setgravity(result.gravity);
                setTerrain(result.terrain);
                setPopulation(result.population);
                setUrl(result.url);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        );
    });

    if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        return (
            <div>
                <Link to={"/" + url.substring(url.indexOf("planets"))}><h2>{name}</h2>
                    <h5>Gravity: {gravity}</h5>
                    <h5>Terrain: {terrain}</h5>
                    <h5>Population: {population}</h5>
                </Link>
            </div>
        );
      }
}

export default PlanetShort;