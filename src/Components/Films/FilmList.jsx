import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import FilmShort from "./FilmShort";

const FilmList = () => {
  const [basePage, setBasePage] = useState(false);
  const [error, setError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const [filmsList, setFilmsList] = useState([]);

  const [searchParams] = useSearchParams();

  let [ params ] = searchParams.entries()

  useEffect(() => {
    if (!params) {
        setBasePage(true);
        fetch("https://swapi.dev/api/films")
        .then(res => res.json())
        .then((result) => {
            setIsLoaded(true);
            setFilmsList(result.results);
        }, (error) => {
            setIsLoaded(true);
            setError(error);
        })}
    else {
        fetch(`https://swapi.dev/api/${params[0]}/${params[1]}`)
        .then(res => res.json())
        .then((result) => {
            setIsLoaded(true);
            setFilmsList(result.films);
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
            <h1>Films {basePage ? null : `(custom)`}</h1>
              {basePage ? filmsList.map(film => <FilmShort film={film.url}/>) : filmsList.map(film => <FilmShort film={film}/>)}
          </div>
      );
}

export default FilmList;