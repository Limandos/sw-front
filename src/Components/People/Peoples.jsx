import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import People from "./People";

const Peoples = () => {
    const [basePage, setBasePage] = useState(false);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const [listCharacters, setListCharacters] = useState([]);
    const [episodeName, setEpisodeName] = useState("");

    const [searchParams] = useSearchParams();

    useEffect(() => {
        if (!searchParams.get("episode")) {
            setBasePage(true);
            fetch("https://swapi.dev/api/people")
            .then(res => res.json())
            .then((result) => {
                setIsLoaded(true);
                setListCharacters(result.results);
            }, (error) => {
                setIsLoaded(true);
                setError(error);
            })}
        else {
            fetch("https://swapi.dev/api/films/" + searchParams.get("episode"))
            .then(res => res.json())
            .then((result) => {
                setIsLoaded(true);
                setListCharacters(result.characters);
                setEpisodeName(result.title)
            }, (error) => {
                setIsLoaded(true);
                setError(error);
            })
        }
    }, []);

    if (error)
        return <div>Error: {error.message}</div>
    else if (!isLoaded) return <div>Loading...</div>
        else return (
            <div>
                <h1>People {basePage ? null : "from " + episodeName}</h1>
                {basePage ? listCharacters.map(char => <People character={char.url}/>) : listCharacters.map(char => <People character={char}/>)}
            </div>
        );
}

export default Peoples;