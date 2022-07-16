import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SpecieShort from "./SpecieShort";
import { pageButton } from "../PageButton/PageButton";
import { getData } from "../../API";

const SpecieList = () => {
    const [basePage, setBasePage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [speciesData, setSpeciesData] = useState([]);

    const [searchParams] = useSearchParams();

    useEffect(() => {
        if (!searchParams.get("category")) {
            setBasePage(true);
            setIsLoading(true);
            let page = searchParams.get("page") ? `?page=${searchParams.get("page")}` : "";
            getData(`https://swapi.dev/api/species/${page}`).then(res => {
                if (res.success) {
                    setSpeciesData(res);
                    setIsLoading(false);
                }
            })
            .catch(error => {;
                console.error(error);
            });
        }
        else {
            setIsLoading(true);
            getData(`https://swapi.dev/api/${searchParams.get("category")}/${searchParams.get("id")}`).then(res => {
                if (res.success) {
                    setSpeciesData(res);
                }
            })
            .catch(error => {
                console.error(error);
            })
            .finally(() => {
              setIsLoading(false);
            });
        }
    }, [searchParams]);

    if (isLoading) {
        return <div>Loading...</div>;
      } else if (speciesData.success) {
        const planetsForView = speciesData.results || speciesData.species || [];
        return (
            <div>
                <h1>Species {basePage ? null : `(with ${searchParams.get("category") === "films" ? speciesData.title : speciesData.name})`}</h1>
                {speciesData.previous ? pageButton("Previous page", speciesData.previous.substring(speciesData.previous.indexOf("?"))) : null}
                {speciesData.next ? pageButton("Next page", speciesData.next.substring(speciesData.next.indexOf("?"))) : null}
                <br />
                {planetsForView.map(spec => <SpecieShort specie={spec.url || spec} key={spec.url || spec}/>)}
            </div>
        );
      } else {
        return <div>Error: open console to see log.</div>;
      }
}

export default SpecieList;