import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getData } from "../../API";

const Planet = () => {
    const [result, setResult] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);

    const { id } = useParams();

    useEffect(() => {
        getData(`https://swapi.dev/api/planets/${id}`).then(res => {
            setIsLoaded(true);
            if (res.success) {
                setResult(res);
            }
        })
        .catch(error => {;
          console.error(error);
        });
      }, [id]);
    
    if (!isLoaded) {
        return <div>Loading...</div>;
    } else if (!result.success) {
        return <div>Error: open console to see log.</div>;
      } else {
        return (
            <div>
                <h1>{result.name}</h1>
                <h3>Rotation period: {result.rotation_period}</h3>
                <h3>Orbital period: {result.orbital_period}</h3>
                <h3>Diameter: {result.diameter}</h3>
                <h3>Cliamte: {result.climate}</h3>
                <h3>Gravity: {result.gravity}</h3>
                <h3>Terrain: {result.terrain}</h3>
                <h3>Surface water: {result.surface_water}</h3>
                <h3>Population: {result.population}</h3>
                <Link to={`/people?category=planets&id=${id}`}>Residents </Link>
                <Link to={`/films?category=planets&id=${id}`}>Films </Link>
            </div>
        );
      }
}

export default Planet;