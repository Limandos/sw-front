import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getData } from "../../API";

const Specie = () => {
    const [result, setResult] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);

    const { id } = useParams();

    useEffect(() => {
        getData(`https://swapi.dev/api/species/${id}`).then(res => {
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
                <h2>Classification: {result.classification}</h2>
                <h2>Designation: {result.designation}</h2>
                <h2>Average height: {result.average_height}</h2>
                <h2>Skin colors: {result.skin_colors}</h2>
                <h2>Hair colors: {result.hair_colors}</h2>
                <h2>Eye colors: {result.eye_colors}</h2>
                <h2>Average lifespan: {result.average_lifespan}</h2>
                <h3><Link to={`/${result.homeworld.substring(result.homeworld.indexOf("planets"))}`}>Homeworld</Link></h3>
                <h2>Language: {result.language}</h2>
            </div>
        );
      }
}

export default Specie;