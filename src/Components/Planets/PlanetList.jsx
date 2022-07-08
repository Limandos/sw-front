import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PlanetShort from "./PlanetShort";

const PlanetList = () => {
    const [basePage, setBasePage] = useState(false);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const [planetList, setPlanetList] = useState([]);
    const [episodeName, setEpisodeName] = useState("");

    const [searchParams] = useSearchParams();

    useEffect(() => {
        if (!searchParams.get("episode")) {
            setBasePage(true);
            fetch("https://swapi.dev/api/planets")
            .then(res => res.json())
            .then((result) => {
                setIsLoaded(true);
                setPlanetList(result.results);
            }, (error) => {
                setIsLoaded(true);
                setError(error);
            })}
        else {
            fetch("https://swapi.dev/api/films/" + searchParams.get("episode"))
            .then(res => res.json())
            .then((result) => {
                setIsLoaded(true);
                setPlanetList(result.characters);
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
                <h1>Planets {basePage ? null : "from " + episodeName}</h1>
                {basePage ? planetList.map(plan => <PlanetShort planet={plan.url}/>) : planetList.map(plan => <PlanetShort planet={plan}/>)}
            </div>
        );
}

export default PlanetList;