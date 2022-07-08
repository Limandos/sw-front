import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Starship = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const [name, setName] = useState("");
    const [model, setModel] = useState("");
    const [costInCredits, setCostInCredits] = useState(0);
    const [hyperdriveRating, setHyperdriveRating] = useState("");
    const [url, setUrl] = useState("");

    const { id } = useParams();

    useEffect(() => {
        fetch("https://swapi.dev/api/starships/" + id)
        .then(res => res.json())
        .then((result) => {
                setIsLoaded(true);
                setName(result.name);
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
                <h4>{name}</h4>
            </div>
        );
      }
}

export default Starship;