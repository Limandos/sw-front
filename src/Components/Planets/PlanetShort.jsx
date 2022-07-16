import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Planets.module.css";
import { getData } from "../../API";

const PlanetShort = ({planet}) => {
    const [planetData, setPlanetData] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getData(planet).then(res => {
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
      }, [planet]);

      if (isLoading) {
        return <div>Loading...</div>;
      } else if (planetData.success) {
        return (
          <div className={styles.listElement}>
              <Link to={"/" + planetData.url.substring(planetData.url.indexOf("planets"))}>{planetData.name}<br/>
                  Gravity: {planetData.gravity}<br/>
                  Terrain: {planetData.terrain}<br/>
                  Population: {planetData.population}<br/>
              </Link>
          </div>
      );
      } else {
        return <div>Error: open console to see log.</div>;
      }
}

export default PlanetShort;