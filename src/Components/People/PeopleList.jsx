import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PeopleShort from "./PeopleShort";
import { pageButton } from "../PageButton/PageButton";
import { getData } from "../../API";

const PeopleList = () => {
    const [basePage, setBasePage] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    const [result, setResult] = useState([]);

    const [searchParams] = useSearchParams();

    useEffect(() => {
        if (!searchParams.get("category")) {
            setBasePage(true);
            let page = searchParams.get("page") ? `?page=${searchParams.get("page")}` : "";
            getData(`https://swapi.dev/api/people/${page}`).then(res => {
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

    function switcher() {
        switch (searchParams.get("category")) {
            case "planets":
                return result.residents.map(char => <PeopleShort character={char} key={char}/>)
            case "vehicles":
            case "starships":
                return result.pilots.map(char => <PeopleShort character={char} key={char}/>)
            default:
                return result.characters.map(char => <PeopleShort character={char} key={char}/>)
        }
    }

    if (!isLoaded) {
        return <div>Loading...</div>;
      } else if (!result.success) {
        return <div>Error: open console to see log.</div>;
      } else {
        return (
            <div>
                <h1>People {basePage ? null : `(with ${searchParams.get("category") === "films" ? result.title : result.name})`}</h1>
                {result.previous ? pageButton("Previous page", result.previous.substring(result.previous.indexOf("?"))) : null}
                {result.next ? pageButton("Next page", result.next.substring(result.next.indexOf("?"))) : null}
                <br />
                {basePage ? result.results.map(char => <PeopleShort character={char.url} key={char.url}/>) : switcher()}
            </div>
        );
      }
}

export default PeopleList;