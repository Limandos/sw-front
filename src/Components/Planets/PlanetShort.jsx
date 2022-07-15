import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Planets.module.css";
import { getData } from "../../API";

const PlanetShort = ({planet}) => {
    const [result, setResult] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        getData(planet).then(res => {
            setIsLoaded(true);
            if (res.success) {
                setResult(res);
                console.log(res);
            }
        })
        .catch(error => {;
          console.error(error);
        });
      }, [planet]);

      if (!isLoaded) {
        return <div>Loading...</div>;
      } else if (!result.success) {
        return <div>Error: open console to see log.</div>;
      } else {
        return (
            <div className={styles.listElement}>
                <Link to={"/" + result.url.substring(result.url.indexOf("planets"))}>{result.name}<br/>
                    Gravity: {result.gravity}<br/>
                    Terrain: {result.terrain}<br/>
                    Population: {result.population}<br/>
                </Link>
            </div>
        );
      }
}

export default PlanetShort;