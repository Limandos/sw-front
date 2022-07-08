import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Starship = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const [name, setName] = useState("");
    const [model, setModel] = useState("");
    const [manufacturer, setManufacturer] = useState("");
    const [costInCredits, setCostInCredits] = useState(0);
    const [length, setLength] = useState(0);
    const [maxAtmospheringSpeed, setMaxAtmospheringSpeed] = useState("");
    const [crew, setCrew] = useState(0);
    const [passengers, setPassengers] = useState(0);
    const [cargoCapacity, setCargoCapacity] = useState(0);
    const [consumables, setConsumables] = useState("");
    const [hyperdriveRating, setHyperdriveRating] = useState("");
    const [MGLT, setMGLT] = useState(0);
    const [starshipClass, setStarshipClass] = useState(0);

    const { id } = useParams();

    useEffect(() => {
        fetch("https://swapi.dev/api/starships/" + id)
        .then(res => res.json())
        .then((result) => {
                setIsLoaded(true);
                setName(result.name);
                setModel(result.model);
                setManufacturer(result.manufacturer);
                setCostInCredits(result.cost_in_credits);
                setLength(result.length);
                setMaxAtmospheringSpeed(result.max_atmosphering_speed);
                setCrew(result.crew);
                setPassengers(result.passengers);
                setCargoCapacity(result.cargo_capacity);
                setConsumables(result.consumables);
                setHyperdriveRating(result.hyperdrive_rating);
                setMGLT(result.MGLT);
                setStarshipClass(result.starship_class);
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
                <h2>Model: {model}</h2>
                <h2>Manufacturer: {manufacturer}</h2>
                <h2>Cost in credits: {costInCredits}</h2>
                <h2>Length: {length}</h2>
                <h2>Max atmosphering speed: {maxAtmospheringSpeed}</h2>
                <h2>Crew: {crew}</h2>
                <h2>Passengers: {passengers}</h2>
                <h2>Cargo capacity: {cargoCapacity}</h2>
                <h2>Consumables: {consumables}</h2>
                <h2>Hyperdrive rating: {hyperdriveRating}</h2>
                <h2>MGLT: {MGLT}</h2>
                <h2>Starship class: {starshipClass}</h2>
                <Link to={`/people?starships=${id}`}>Pilots </Link>
                <Link to={`/films?starships=${id}`}>Films </Link>
            </div>
        );
      }
}

export default Starship;