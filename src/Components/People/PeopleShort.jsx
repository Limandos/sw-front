import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PeopleShort = ({character}) => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [name, setName] = useState("");
    const [birth_year, setBirth_year] = useState(0);
    const [gender, setGender] = useState("");
    const [homeworld, setHomeworld] = useState("");
    const [url, setUrl] = useState("");

    useEffect(() => {
        fetch(character)
        .then(res => res.json())
        .then((result) => {
                setIsLoaded(true);
                setName(result.name);
                setBirth_year(result.birth_year);
                setGender(result.gender);
                setHomeworld(result.homeworld);
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
                <Link to={"/" + url.substring(url.indexOf("people"))}><h2>{name}</h2>
                    <h5>Gender: {gender}</h5>
                    <h5>Birth year: {birth_year}</h5>
                    <h5>Homeworld: {homeworld}</h5>
                </Link>
            </div>
        );
      }
}

export default PeopleShort;