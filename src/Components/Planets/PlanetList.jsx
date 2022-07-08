import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PlanetShort from "./PlanetShort";

const PlanetList = () => {
    const [basePage, setBasePage] = useState(false);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const [planetList, setPlanetList] = useState([]);
    const [label, setLabel] = useState("");

    const [searchParams] = useSearchParams();
    const [ params ] = searchParams.entries()

    useEffect(() => {
        if (!params) {
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
            fetch(`https://swapi.dev/api/${params[0]}/${params[1]}`)
            .then(res => res.json())
            .then((result) => {
                setIsLoaded(true);
                setPlanetList(result.planets);
                if (params[0] === "films") 
                    setLabel(`from ${result.title}`);
                else
                    setLabel(`with ${result.name}`);
            }, (error) => {
                setIsLoaded(true);
                setError(error);
            })
        }
    }, [params]);

    if (error)
        return <div>Error: {error.message}</div>
    else if (!isLoaded) return <div>Loading...</div>
        else return (
            <div>
                <h1>Planets {basePage ? null : `${label}`}</h1>
                {basePage ? planetList.map(plan => <PlanetShort planet={plan.url} key={plan.url}/>) : planetList.map(plan => <PlanetShort planet={plan} key={plan.url}/>)}
            </div>
        );
}

export default PlanetList;