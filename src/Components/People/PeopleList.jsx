import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PeopleShort from "./PeopleShort";
import { pageButton } from "../PageButton/PageButton";
import { getData } from "../../API";

const PeopleList = () => {
    const [basePage, setBasePage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [peopleData, setPeopleData] = useState([]);

    const [searchParams] = useSearchParams();

    useEffect(() => {
        if (!searchParams.get("category")) {
            setIsLoading(true);
            setBasePage(true);
            let page = searchParams.get("page") ? `?page=${searchParams.get("page")}` : "";
            getData(`https://swapi.dev/api/people/${page}`).then(res => {
                if (res.success) {
                    setPeopleData(res);
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
                    setPeopleData(res);
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
      } else if (peopleData.success) {
        const peopleForView = peopleData.results || peopleData.characters || peopleData.pilots || peopleData.residents || [];
        return (
            <div>
                <h1>People {!basePage && `(with ${searchParams.get("category") === "films" ? peopleData.title : peopleData.name})`}</h1>
                {peopleData.previous ? pageButton("Previous page", peopleData.previous.substring(peopleData.previous.indexOf("?"))) : null}
                {peopleData.next ? pageButton("Next page", peopleData.next.substring(peopleData.next.indexOf("?"))) : null}
                <br />
                {peopleForView.map(char => <PeopleShort character={char.url || char} key={char.url || char}/>)}
            </div>
        );
      } else {
        return <div>Error: open console to see log.</div>;
      }
}

export default PeopleList;