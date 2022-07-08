import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Planet = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [name, setName] = useState("");
    const [rotationPeriod, setRotationPeriod] = useState(0);
    const [orbitalPeriod, setOrbitalPeriod] = useState(0);
    const [diameter, setDiameter] = useState(0);
    const [climate, setClimate] = useState("");
    const [gravity, setGravity] = useState("");
    const [terrain, setTerrain] = useState("");
    const [surfaceWater, setSurfaceWater] = useState(0);
    const [population, setPopulation] = useState("");

    const { id } = useParams();

    useEffect(() => {
        fetch(`https://swapi.dev/api/planets/${id}`)
        .then(res => res.json())
        .then((result) => {
                setIsLoaded(true);
                setName(result.name);
                setRotationPeriod(result.rotation_period);
                setOrbitalPeriod(result.orbital_period);
                setDiameter(result.diameter);
                setClimate(result.climate);
                setGravity(result.gravity);
                setTerrain(result.terrain);
                setSurfaceWater(result.surface_water);
                setPopulation(result.population);
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
                <h1>{name}</h1>
                <h3>Rotation period: {rotationPeriod}</h3>
                <h3>Orbital period: {orbitalPeriod}</h3>
                <h3>Diameter: {diameter}</h3>
                <h3>Cliamte: {climate}</h3>
                <h3>Gravity: {gravity}</h3>
                <h3>Terrain: {terrain}</h3>
                <h3>Surface water: {surfaceWater}</h3>
                <h3>Population: {population}</h3>
                <Link to={`/people?planets=${id}`}>Residents </Link>
                <Link to={`/films?planets=${id}`}>Films </Link>
            </div>
        );
      }
}

export default Planet;