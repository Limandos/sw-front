import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getData } from "../../API";

const Planet = () => {
    const [planetData, setPlanetData] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const { id } = useParams();

    useEffect(() => {
        setIsLoading(true);
        getData(`https://swapi.dev/api/planets/${id}`).then(res => {
            if (res.success) {
                setPlanetData(res);
            }
        })
        .catch(error => {;
          console.error(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
      }, [id]);
    
    if (isLoading) {
        return <div>Loading...</div>;
    } else if (planetData.success) {
        return (
          <div>
              <h1>{planetData.name}</h1>
              <h3>Rotation period: {planetData.rotation_period}</h3>
              <h3>Orbital period: {planetData.orbital_period}</h3>
              <h3>Diameter: {planetData.diameter}</h3>
              <h3>Cliamte: {planetData.climate}</h3>
              <h3>Gravity: {planetData.gravity}</h3>
              <h3>Terrain: {planetData.terrain}</h3>
              <h3>Surface water: {planetData.surface_water}</h3>
              <h3>Population: {planetData.population}</h3>
              <Link to={`/people?category=planets&id=${id}`}>Residents </Link>
              <Link to={`/films?category=planets&id=${id}`}>Films </Link>
          </div>
      );
      } else {
          return <div>Error: open console to see log.</div>;
      }
}

export default Planet;