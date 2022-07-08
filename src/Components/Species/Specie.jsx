import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Specie = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [name, setName] = useState("");
    const [classification, setClassification] = useState("");
    const [designation, setDesignation] = useState("");
    const [averageHeight, setAverageHeight] = useState("");
    const [skinColors, setSkinColors] = useState("");
    const [hairColors, setHairColors] = useState("");
    const [eyeColors, setEyeColors] = useState("");
    const [averageLifespan, setAverageLifespan] = useState("");
    const [homeworld, setHomeworld] = useState("");
    const [language, setLanguage] = useState("");

    const { id } = useParams();

    useEffect(() => {
        fetch("https://swapi.dev/api/species/" + id)
        .then(res => res.json())
        .then((result) => {
                setIsLoaded(true);
                setName(result.name);
                setClassification(result.classification);
                setDesignation(result.designation);
                setAverageHeight(result.average_height);
                setSkinColors(result.skin_colors);
                setHairColors(result.hair_colors);
                setEyeColors(result.eye_colors);
                setAverageLifespan(result.average_lifespan);
                setHomeworld(result.homeworld);
                setLanguage(result.language);
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
                <h1>{name}</h1>
                <h2>Classification: {classification}</h2>
                <h2>Designation: {designation}</h2>
                <h2>Average height: {averageHeight}</h2>
                <h2>Skin colors: {skinColors}</h2>
                <h2>Hair colors: {hairColors}</h2>
                <h2>Eye colors: {eyeColors}</h2>
                <h2>Average lifespan: {averageLifespan}</h2>
                <h3><Link to={`/${homeworld.substring(homeworld.indexOf("planets"))}`}>Homeworld</Link></h3>
                <h2>Language: {language}</h2>
            </div>
        );
      }
}

export default Specie;