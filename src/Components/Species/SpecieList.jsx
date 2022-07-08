import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SpecieShort from "./SpecieShort";

const SpecieList = () => {
    const [basePage, setBasePage] = useState(false);
    const [error, setError] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    const [speciesList, setSpeciesList] = useState([]);
    const [label, setLabel] = useState("");

    const [searchParams] = useSearchParams();
    const [ params ] = searchParams.entries()

    useEffect(() => {
        if (!params) {
            setBasePage(true);
            fetch("https://swapi.dev/api/species")
            .then(res => res.json())
            .then((result) => {
                setIsLoaded(true);
                setSpeciesList(result.results);
            }, (error) => {
                setIsLoaded(true);
                setError(error);
        })}
        else {
            fetch(`https://swapi.dev/api/${params[0]}/${params[1]}`)
            .then(res => res.json())
            .then((result) => {
                setIsLoaded(true);
                setSpeciesList(result.species);
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
                <h1>Species {basePage ? null : `${label}`}</h1>
                {basePage ? speciesList.map(spec => <SpecieShort specie={spec.url} key={spec.url}/>) : speciesList.map(spec => <SpecieShort specie={spec} key={spec.url}/>)}
            </div>
        );
}

export default SpecieList;