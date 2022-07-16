import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getData } from "../../API";

const Specie = () => {
    const [specieData, setSpecieData] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const { id } = useParams();

    useEffect(() => {
        setIsLoading(true);
        getData(`https://swapi.dev/api/species/${id}`).then(res => {
            if (res.success) {
                setSpecieData(res);
            }
        })
        .catch(error => {
            console.error(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, [id]);

    if (isLoading) {
        return <div>Loading...</div>;
      } else if (specieData.success) {
        return (
            <div>
                <h1>{specieData.name}</h1>
                <h2>Classification: {specieData.classification}</h2>
                <h2>Designation: {specieData.designation}</h2>
                <h2>Average height: {specieData.average_height}</h2>
                <h2>Skin colors: {specieData.skin_colors}</h2>
                <h2>Hair colors: {specieData.hair_colors}</h2>
                <h2>Eye colors: {specieData.eye_colors}</h2>
                <h2>Average lifespan: {specieData.average_lifespan}</h2>
                <h3><Link to={`/${specieData.homeworld.substring(specieData.homeworld.indexOf("planets"))}`}>Homeworld</Link></h3>
                <h2>Language: {specieData.language}</h2>
            </div>
        );
      } else {
        return <div>Error: open console to see log.</div>;
    }
}

export default Specie;