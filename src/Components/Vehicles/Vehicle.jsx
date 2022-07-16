import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getData } from "../../API";

const Vehicle = () => {
    const [vehicleData, setVehicleData] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const { id } = useParams();

    useEffect(() => {
        setIsLoading(true);
        getData(`https://swapi.dev/api/vehicles/${id}`).then(res => {
            if (res.success) {
                setVehicleData(res);
            }
        })
        .catch(error => {
            console.error(error)}
        )
        .finally(() => {
            setIsLoading(false);
        });
    }, [id]);

    if (isLoading) {
        return <div>Loading...</div>;
      } else if (vehicleData.success) {
        return (
            <div>
                <h1>{vehicleData.name}</h1>
                <h2>Model: {vehicleData.model}</h2>
                <h2>Manufacturer: {vehicleData.manufacturer}</h2>
                <h2>Cost in credits: {vehicleData.cost_in_credits}</h2>
                <h2>Length: {vehicleData.length}</h2>
                <h2>Max atmosphering speed: {vehicleData.max_atmosphering_speed}</h2>
                <h2>Crew: {vehicleData.crew}</h2>
                <h2>Passengers: {vehicleData.passengers}</h2>
                <h2>Cargo capacity: {vehicleData.cargo_capacity}</h2>
                <h2>Consumables: {vehicleData.consumables}</h2>
                <h2>Vehicle class: {vehicleData.vehicle_class}</h2>
                <Link to={`/people?category=vehicles&id=${id}`}>Pilots </Link>
                <Link to={`/films?category=vehicles&id=${id}`}>Films </Link>
            </div>
        );
      } else {
        return <div>Error</div>;
      }
}

export default Vehicle;