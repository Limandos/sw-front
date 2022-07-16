import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Vehicles.module.css";
import { getData } from "../../API";

const VehicleShort = ({vehicle}) => {
    const [vehicleData, setVehicleData] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getData(vehicle).then(res => {
            if (res.success) {
                setVehicleData(res);
            }
        })
        .catch(error => {;
            console.error(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
      }, [vehicle]);

      if (isLoading) {
        return <div>Loading...</div>;
      } else if (vehicleData.success) {
        return (
          <div className={styles.listElement}>
              <Link to={"/" + vehicleData.url.substring(vehicleData.url.indexOf("vehicles"))}>
                  {vehicleData.name}<br />
                  Model: {vehicleData.model}<br />
                  Cost in credits: {vehicleData.cost_in_credits}<br />
                  Max atmosphering speed: {vehicleData.max_atmosphering_speed}<br />
              </Link>
          </div>
      );
      } else {
        return <div>Error: open console to see log.</div>;
      }
}

export default VehicleShort;