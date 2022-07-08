import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const People = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [name, setName] = useState("");
    const [height, setHeight] = useState(0);
    const [mass, setMass] = useState(0);
    const [hair_color, setHair_color] = useState("");
    const [skin_color, setSkin_color] = useState("");
    const [eye_color, setEye_color] = useState("");
    const [birth_year, setBirth_year] = useState(0);
    const [gender, setGender] = useState("");
    const [homeworld, setHomeworld] = useState("");

    const { id } = useParams();

    useEffect(() => {
        fetch("https://swapi.dev/api/people/" + id)
        .then(res => res.json())
        .then((result) => {
                setIsLoaded(true);
                setName(result.name);
                setHeight(result.height);
                setMass(result.mass);
                setHair_color(result.hair_color);
                setSkin_color(result.skin_color);
                setEye_color(result.eye_color);
                setBirth_year(result.birth_year);
                setGender(result.gender);
                setHomeworld(result.homeworld);
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
                <h2>Gender: {gender}</h2>
                <h2>Height: {height}</h2>
                <h2>Mass: {mass}</h2>
                <h3>Hair color: {hair_color}</h3>
                <h3>Skin color: {skin_color}</h3>
                <h3>Eye color: {eye_color}</h3>
                <h3><Link to={`/${homeworld.substring(homeworld.indexOf("planets"))}`}>Homeworld</Link></h3>
                <Link to={`/films?people=${id}`}>Films </Link>
                <Link to={`/species?people=${id}`}>Species </Link>
                <Link to={`/vehicles?people=${id}`}>Vehicles </Link>
                <Link to={`/starships?people=${id}`}>Starships </Link>
            </div>
        );
      }
}

export default People;