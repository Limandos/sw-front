import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PeopleShort from "./PeopleShort";

const PeopleList = () => {
    const [basePage, setBasePage] = useState(false);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const [listCharacters, setListCharacters] = useState([]);

    const [searchParams] = useSearchParams();

    let [ params ] = searchParams.entries()

    useEffect(() => {
        if (!params) {
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
            fetch(`https://swapi.dev/api/${params[0]}/${params[1]}`)
            .then(res => res.json())
            .then((result) => {
                setIsLoaded(true);
                if (params[0] == "planets")
                    setListCharacters(result.residents);
                else if (params[0] == "starships" || params[0] == "vehicles")
                        setListCharacters(result.pilots);
                    else
                        setListCharacters(result.characters);
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
                <h1>People {basePage ? null : `(custom)`}</h1>
                {basePage ? listCharacters.map(char => <PeopleShort character={char.url}/>) : listCharacters.map(char => <PeopleShort character={char}/>)}
            </div>
        );
}

export default PeopleList;