import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getData } from "../../API";

const People = () => {
    const [peopleData, setPeopleData] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const { id } = useParams();

    useEffect(() => {
        setIsLoading(true);
        getData(`https://swapi.dev/api/people/${id}`).then(res => {
            if (res.success) {
                setPeopleData(res);
            }
        })
        .catch(error => {
            console.error(error)
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, [id]);

    if (isLoading) {
        return <div>Loading...</div>;
      } else if (peopleData.success) {
        return (
            <div>
                <h1>{peopleData.name}</h1>
                <h2>Gender: {peopleData.gender}</h2>
                <h2>Height: {peopleData.height}</h2>
                <h2>Mass: {peopleData.mass}</h2>
                <h3>Hair color: {peopleData.hair_color}</h3>
                <h3>Skin color: {peopleData.skin_color}</h3>
                <h3>Eye color: {peopleData.eye_color}</h3>
                <h3><Link to={`/${peopleData.homeworld.substring(peopleData.homeworld.indexOf("planets"))}`}>Homeworld</Link></h3>
                <Link to={`/films?category=people&id=${id}`}>Films </Link>
                <Link to={`/species?category=people&id=${id}`}>Species </Link>
                <Link to={`/vehicles?category=people&id=${id}`}>Vehicles </Link>
                <Link to={`/starships?category=people&id=${id}`}>Starships </Link>
            </div>
        );
      } else {
        return <div>Error: open console to see log.</div>;
      }
}

export default People;