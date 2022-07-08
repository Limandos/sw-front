import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import StarshipShort from "./StarshipShort";

const StarshipList = () => {
    const [basePage, setBasePage] = useState(false);
    const [error, setError] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    const [starshipsList, setStarshipsList] = useState([]);
    const [label, setLabel] = useState("");

    const [searchParams] = useSearchParams();
    const [ params ] = searchParams.entries()

    useEffect(() => {
        if (!params) {
            setBasePage(true);
            fetch("https://swapi.dev/api/starships")
            .then(res => res.json())
            .then((result) => {
                setIsLoaded(true);
                setStarshipsList(result.results);
            }, (error) => {
                setIsLoaded(true);
                setError(error);
            })}
        else {
            fetch(`https://swapi.dev/api/${params[0]}/${params[1]}`)
                .then(res => res.json())
                .then((result) => {
                    setIsLoaded(true);
                    setStarshipsList(result.starships);
                    if (params[0] === "films") 
                        setLabel(`from ${result.title}`);
                    else
                        setLabel(`with ${result.name}`);
                }, (error) => {
                    setIsLoaded(true);
                    setError(error);
            })}
    }, [params]);


    if (error) return <div>Error: {error.message}</div>
    else if (!isLoaded) return <div>Loading...</div>
        else return (
            <div>
                <h1>Starships {basePage ? null : `${label}`}</h1>
                    {basePage ? starshipsList.map(star => <StarshipShort starship={star.url} key={star.url}/>) : starshipsList.map(star => <StarshipShort starship={star} key={star.url}/>)}
            </div>
        );
}

export default StarshipList;