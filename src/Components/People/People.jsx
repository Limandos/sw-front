import React, { useEffect, useState } from "react";

const People = ({character}) => {
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

    useEffect(() => {
        fetch(character)
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
                <h4>{name}</h4>
            </div>
        );
      }
}

export default People;