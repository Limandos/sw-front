import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getData } from "../../API";

const People = () => {
    const [result, setResult] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);

    const { id } = useParams();

    useEffect(() => {
        getData(`https://swapi.dev/api/people/${id}`).then(res => {
            setIsLoaded(true);
            if (res.success) {
                setResult(res);
            }
        })
        .catch(error => console.error(error));
    }, [id]);

    if (!isLoaded) {
        return <div>Loading...</div>;
      } else if (!result.success) {
        return <div>Error</div>;
      } else {
        return (
            <div>
                <h1>{result.name}</h1>
                <h2>Gender: {result.gender}</h2>
                <h2>Height: {result.height}</h2>
                <h2>Mass: {result.mass}</h2>
                <h3>Hair color: {result.hair_color}</h3>
                <h3>Skin color: {result.skin_color}</h3>
                <h3>Eye color: {result.eye_color}</h3>
                <h3><Link to={`/${result.homeworld.substring(result.homeworld.indexOf("planets"))}`}>Homeworld</Link></h3>
                <Link to={`/films?category=people&id=${id}`}>Films </Link>
                <Link to={`/species?category=people&id=${id}`}>Species </Link>
                <Link to={`/vehicles?category=people&id=${id}`}>Vehicles </Link>
                <Link to={`/starships?category=people&id=${id}`}>Starships </Link>
            </div>
        );
      }
}

export default People;