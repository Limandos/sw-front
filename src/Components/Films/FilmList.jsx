import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import FilmShort from "./FilmShort";
import { getData } from "../../API";

const FilmList = () => {
    const [basePage, setBasePage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [filmsData, setFilmsData] = useState({});

    const [searchParams] = useSearchParams();

    useEffect(() => {
        if (!searchParams.get("category")) {
            setBasePage(true);
            setIsLoading(true);
            getData(`https://swapi.dev/api/films/`).then(res => {
                if (res.success) {
                    setFilmsData(res);
                }
            })
            .catch(error => {;
                console.error(error);
            })
            .finally(() => {
              setIsLoading(false);
            });
        }
        else {
            setIsLoading(true);
            getData(`https://swapi.dev/api/${searchParams.get("category")}/${searchParams.get("id")}`).then(res => {
                if (res.success) {
                    setFilmsData(res);
                }
            })
            .catch(error => {;
                console.error(error);
            })
            .finally(() => {
              setIsLoading(false);
            });;
        }
    }, [searchParams]);

    if (isLoading) {
        return <div>Loading...</div>;
      } else if (filmsData.success) {
        const filmsForView = filmsData.results || filmsData?.films || [];
        return (
            <div>
                <h1>Films {!basePage && ` (with ${filmsData.name})`}</h1>
                {filmsForView.map(film => <FilmShort film={film.url || film} key={film.url || film}/>)}
            </div>
        );
      } else {
        return (
            <div>Error: open console to see log.</div>
        )
      }
}

export default FilmList;