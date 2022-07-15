import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import StarshipShort from "./StarshipShort";
import { getData } from "../../API";

const StarshipList = () => {
    const [basePage, setBasePage] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    const [result, setResult] = useState([]);

    const [searchParams] = useSearchParams();

    useEffect(() => {
        if (!searchParams.get("category")) {
            setBasePage(true);
            getData(`https://swapi.dev/api/starships/`).then(res => {
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
                <h1>Starships {basePage ? null : `(with ${searchParams.get("category") === "films" ? result.title : result.name})`}</h1>
                    {basePage ? result.results.map(star => <StarshipShort starship={star.url} key={star.url}/>) : result.starships.map(star => <StarshipShort starship={star} key={star.url}/>)}
            </div>
        );
      }
}

export default StarshipList;