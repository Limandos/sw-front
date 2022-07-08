import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SpecieShort = ({specie}) => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const [name, setName] = useState("");
    const [classification, setClassification] = useState("");
    const [homeworld, setHomeworld] = useState("");
    const [language, setLanguage] = useState("");
    const [url, setUrl] = useState("");

    useEffect(() => {
        fetch(specie)
        .then(res => res.json())
        .then((result) => {
                setIsLoaded(true);
                setName(result.name);
                setClassification(result.classification);
                setHomeworld(result.homeworld);
                setLanguage(result.language);
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
                <Link to={"/" + url.substring(url.indexOf("species"))}><h2>{name}</h2>
                    <h5>Classification: {classification}</h5>
                    <h5>Homeworld: {homeworld}</h5>
                    <h5>Language: {language}</h5>
                </Link>
            </div>
        );
      }
}

export default SpecieShort;