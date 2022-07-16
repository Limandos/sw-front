import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Starships.module.css";
import { getData } from "../../API";

const StarshipShort = ({starship}) => {
    const [starshipData, setStarshipData] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getData(starship).then(res => {
            setIsLoading(true);
            if (res.success) {
                setStarshipData(res);
            }
        })
        .catch(error => {;
            console.error(error);
        })
        .finally(() => {
            setIsLoading(false);
        });
    }, [starship]);

    if (isLoading) {
        return <div>Loading...</div>;
    } else if (starshipData.success) {
        return (
            <div className={styles.listElement}>
                <Link to={"/" + starshipData.url.substring(starshipData.url.indexOf("starships"))}>
                    {starshipData.name}<br/>
                    Model: {starshipData.model}<br/>
                    Cost in credits: {starshipData.cost_in_credits}<br/>
                    Hyperdrive rating: {starshipData.hyperdrive_rating}
                </Link>
            </div>
        );
    } else {
        return <div>Error: open console to see log.</div>;
    }
}

export default StarshipShort;