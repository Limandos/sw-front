import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Starships.module.css";
import { getData } from "../../API";

const StarshipShort = ({starship}) => {
    const [result, setResult] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        getData(starship).then(res => {
            setIsLoaded(true);
            if (res.success) {
                setResult(res);
            }
        })
        .catch(error => {;
          console.error(error);
        });
      }, [starship]);

      if (!isLoaded) {
        return <div>Loading...</div>;
      } else if (!result.success) {
        return <div>Error: open console to see log.</div>;
      } else {
        return (
            <div className={styles.listElement}>
                <Link to={"/" + result.url.substring(result.url.indexOf("starships"))}>
                    {result.name}<br/>
                    Model: {result.model}<br/>
                    Cost in credits: {result.cost_in_credits}<br/>
                    Hyperdrive rating: {result.hyperdrive_rating}
                </Link>
            </div>
        );
      }
}

export default StarshipShort;