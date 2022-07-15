import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Vehicles.module.css";
import { getData } from "../../API";

const VehicleShort = ({vehicle}) => {
    const [result, setResult] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        getData(vehicle).then(res => {
            setIsLoaded(true);
            if (res.success) {
                setResult(res);
            }
        })
        .catch(error => {;
            console.error(error);
        });
      }, [vehicle]);

      if (!isLoaded) {
        return <div>Loading...</div>;
      } else if (!result.success) {
        return <div>Error: open console to see log.</div>;
      } else {
        return (
            <div className={styles.listElement}>
                <Link to={"/" + result.url.substring(result.url.indexOf("vehicles"))}>
                    {result.name}<br />
                    Model: {result.model}<br />
                    Cost in credits: {result.cost_in_credits}<br />
                    Max atmosphering speed: {result.max_atmosphering_speed}<br />
                </Link>
            </div>
        );
      }
}

export default VehicleShort;