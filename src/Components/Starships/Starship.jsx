import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getData } from "../../API";

const Starship = () => {
    const [starshipData, setStarshipData] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const { id } = useParams();

    useEffect(() => {
        setIsLoading(true);
        getData(`https://swapi.dev/api/starships/${id}`).then(res => {
            if (res.success) {
                setStarshipData(res);
            }
        })
        .catch(error => {
            console.error(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, [id]);

    if (isLoading) {
        return <div>Loading...</div>;
      } else if (starshipData.success) {
        return (
            <div>
                <h1>{starshipData.name}</h1>
                <h2>Model: {starshipData.model}</h2>
                <h2>Manufacturer: {starshipData.manufacturer}</h2>
                <h2>Cost in credits: {starshipData.cost_in_credits}</h2>
                <h2>Length: {starshipData.length}</h2>
                <h2>Max atmosphering speed: {starshipData.max_atmosphering_speed}</h2>
                <h2>Crew: {starshipData.crew}</h2>
                <h2>Passengers: {starshipData.passengers}</h2>
                <h2>Cargo capacity: {starshipData.cargo_capacity}</h2>
                <h2>Consumables: {starshipData.consumables}</h2>
                <h2>Hyperdrive rating: {starshipData.hyperdrive_rating}</h2>
                <h2>MGLT: {starshipData.MGLT}</h2>
                <h2>Starship class: {starshipData.starship_class}</h2>
                <Link to={`/people?category=starships&id=${id}`}>Pilots </Link>
                <Link to={`/films?category=starships&id=${id}`}>Films </Link>
            </div>
        );
      } else {
        return <div>Error: open console to see log.</div>;
      }
}

export default Starship;