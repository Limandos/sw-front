import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Vehicle = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const [name, setName] = useState("");
    const [model, setModel] = useState("");
    const [manufacturer, setManufacturer] = useState("");
    const [costInCredits, setCostInCredits] = useState(0);
    const [length, setLength] = useState(0);
    const [maxAtmospheringSpeed, setMaxAtmospheringSpeed] = useState("");
    const [crew, setCrew] = useState("");
    const [passengers, setPassengers] = useState("");
    const [cargoCapacity, setCargoCapacity] = useState("");
    const [consumables, setConsumables] = useState("");
    const [vehicleClass, setVehicleClass] = useState("");

    const { id } = useParams();

    useEffect(() => {
        fetch("https://swapi.dev/api/vehicles/" + id)
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
                setVehicleClass(result.vehicle_class)
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
                <h2>Vehicle class: {vehicleClass}</h2>
                <Link to={`/people?vehicles=${id}`}>Pilots </Link>
                <Link to={`/films?vehicles=${id}`}>Films </Link>
            </div>
        );
      }
}

export default Vehicle;