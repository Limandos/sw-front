import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import StarshipShort from "./StarshipShort";

const StarshipList = () => {
  const [basePage, setBasePage] = useState(false);
  const [error, setError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const [starshipsList, setStarshipsList] = useState([]);
  const [paramName, setParamName] = useState("");

  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (!searchParams.get("episode")) {
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
        fetch("https://swapi.dev/api/films/" + searchParams.get("episode"))
        .then(res => res.json())
        .then((result) => {
            setIsLoaded(true);
            setStarshipsList(result.starships);
        }, (error) => {
            setIsLoaded(true);
            setError(error);
        })
    }
}, []);


  if (error) return <div>Error: {error.message}</div>
  else if (!isLoaded) return <div>Loading...</div>
      else return (
          <div>
            <h1>Starships {basePage ? null : "with " + paramName}</h1>
              {basePage ? starshipsList.map(star => <StarshipShort starship={star.url}/>) : starshipsList.map(star => <StarshipShort starship={star}/>)}
          </div>
      );
}

export default StarshipList;