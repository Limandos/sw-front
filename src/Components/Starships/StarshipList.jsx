import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import StarshipShort from "./StarshipShort";
import { pageButton } from "../PageButton/PageButton";
import { getData } from "../../API";

const StarshipList = () => {
    const [basePage, setBasePage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [starshipsData, setStarshipsData] = useState([]);

    const [searchParams] = useSearchParams();

    useEffect(() => {
        if (!searchParams.get("category")) {
            setIsLoading(true);
            setBasePage(true);
            let page = searchParams.get("page") ? `?page=${searchParams.get("page")}` : "";
            getData(`https://swapi.dev/api/starships/${page}`).then(res => {
                if (res.success) {
                    setStarshipsData(res);
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
                    setStarshipsData(res);
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
      } else if (starshipsData.success) {
        const starshipsForView = starshipsData.results || starshipsData.starships || [];
        return (
            <div>
                <h1>Starships {!basePage && `(with ${searchParams.get("category") === "films" ? starshipsData.title : starshipsData.name})`}</h1>
                {starshipsData.previous ? pageButton("Previous page", starshipsData.previous.substring(starshipsData.previous.indexOf("?"))) : null}
                {starshipsData.next ? pageButton("Next page", starshipsData.next.substring(starshipsData.next.indexOf("?"))) : null}
                <br />
                {starshipsForView.map(star => <StarshipShort starship={star.url || star} key={star.url || star}/>)}
            </div>
        );
      } else {
        return <div>Error: open console to see log.</div>;
      }
}

export default StarshipList;