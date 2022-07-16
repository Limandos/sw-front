import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PlanetShort from "./PlanetShort";
import { pageButton } from "../PageButton/PageButton";
import { getData } from "../../API";

const PlanetList = () => {
    const [basePage, setBasePage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [planetsData, setPlanetsData] = useState({});

    const [searchParams] = useSearchParams();

    useEffect(() => {
        if (!searchParams.get("category")) {
            setBasePage(true);
            setIsLoading(true);
            let page = searchParams.get("page") ? `?page=${searchParams.get("page")}` : "";
            getData(`https://swapi.dev/api/planets/${page}`).then(res => {
                if (res.success) {
                    setPlanetsData(res);
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
                    setPlanetsData(res);
                }
            })
            .catch(error => {;
                console.error(error);
            })
            .finally(() => {
              setIsLoading(false);
            });
        }
    }, [searchParams]);

    if (isLoading) {
        return <div>Loading...</div>;
      } else if (planetsData.success) {
        const planetsForView = planetsData.results || planetsData.planets || [];
        return (
            <div>
                <h1>Planets {basePage ? null : `(with ${searchParams.get("category") === "films" ? planetsData.title : planetsData.name})`}</h1>
                {planetsData.previous ? pageButton("Previous page", planetsData.previous.substring(planetsData.previous.indexOf("?"))) : null}
                {planetsData.next ? pageButton("Next page", planetsData.next.substring(planetsData.next.indexOf("?"))) : null}
                <br />
                {planetsForView.map(plan => <PlanetShort planet={plan.url || plan} key={plan.url || plan}/>)}
            </div>
        );
      } else {
        return <div>Error: open console to see log.</div>;
      }
}

export default PlanetList;