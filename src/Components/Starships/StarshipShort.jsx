import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const StarshipShort = ({starship}) => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const [name, setName] = useState("");
    const [model, setModel] = useState("");
    const [costInCredits, setCostInCredits] = useState(0);
    const [hyperdriveRating, setHyperdriveRating] = useState("");
    const [url, setUrl] = useState("");

    useEffect(() => {
        fetch(starship)
        .then(res => res.json())
        .then((result) => {
                setIsLoaded(true);
                setName(result.name);
                setModel(result.model);
                setCostInCredits(result.cost_in_credits);
                setHyperdriveRating(result.hyperdrive_rating);
                setUrl(result.url);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        );
    });

    if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        return (
            <div>
                <Link to={"/" + url.substring(url.indexOf("starships"))}><h2>{name}</h2>
                    <h5>Model: {model}</h5>
                    <h5>Cost in credits: {costInCredits}</h5>
                    <h5>Hyperdrive rating: {hyperdriveRating}</h5>
                </Link>
            </div>
        );
      }
}

export default StarshipShort;