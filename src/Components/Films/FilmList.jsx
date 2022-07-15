import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import FilmShort from "./FilmShort";
import { getData } from "../../API";

const FilmList = () => {
    const [basePage, setBasePage] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    const [result, setResult] = useState([]);

    const [searchParams] = useSearchParams();

    useEffect(() => {
        if (!searchParams.get("category")) {
            setBasePage(true);
            getData(`https://swapi.dev/api/films/`).then(res => {
                setIsLoaded(true);
                if (res.success) {
                    setResult(res);
                }
            })
            .catch(error => {;
                console.error(error);
            });
        }
        else {
            getData(`https://swapi.dev/api/${searchParams.get("category")}/${searchParams.get("id")}`).then(res => {
                setIsLoaded(true);
                if (res.success) {
                    setResult(res);
                }
            })
            .catch(error => {;
                console.error(error);
            });
        }
    }, [searchParams]);

    if (!isLoaded) {
        return <div>Loading...</div>;
      } else if (!result.success) {
        return <div>Error: open console to see log.</div>;
      } else {
        return (
            <div>
                <h1>Films {basePage ? null : `(with ${result.name})`}</h1>
                {basePage ? result.results.map(film => <FilmShort film={film.url} key={film.url}/>) : result.films.map(film => <FilmShort film={film} key={film.url}/>)}
            </div>
        );
      }
}

export default FilmList;