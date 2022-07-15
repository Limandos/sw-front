import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SpecieShort from "./SpecieShort";
import { pageButton } from "../PageButton/PageButton";
import { getData } from "../../API";

const SpecieList = () => {
    const [basePage, setBasePage] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    const [result, setResult] = useState([]);

    const [searchParams] = useSearchParams();

    useEffect(() => {
        if (!searchParams.get("category")) {
            setBasePage(true);
            let page = "";
            if (searchParams.get("page"))
                page = `?page=${searchParams.get("page")}`
            getData(`https://swapi.dev/api/species/${page}`).then(res => {
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
                <h1>Species {basePage ? null : `(with ${searchParams.get("category") === "films" ? result.title : result.name})`}</h1>
                {result.previous ? pageButton("Previous page", result.previous.substring(result.previous.indexOf("?"))) : null}
                {result.next ? pageButton("Next page", result.next.substring(result.next.indexOf("?"))) : null}
                <br />
                {basePage ? result.results.map(spec => <SpecieShort specie={spec.url} key={spec.url}/>) : result.species.map(spec => <SpecieShort specie={spec} key={spec}/>)}
            </div>
        );
      }
}

export default SpecieList;