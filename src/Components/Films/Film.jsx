import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getData } from "../../API";

const Film = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [filmData, setFilmData] = useState({});

    let { id } = useParams();

    useEffect(() => {
      setIsLoading(true);
      getData(`https://swapi.dev/api/films/${id}`).then(res => {
          if (res.success) {
              setFilmData(res);
          }
      })
      .catch(error => {;
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
    }, [id]);

    if (isLoading) {
      return <div>Loading...</div>;
    } else if (filmData.success) {
      return (
        <div>
            <h1>Episode {filmData.episode_id}: {filmData.title}</h1>
            <p>{filmData.opening_crawl}</p>
            <h2>Director: {filmData.director}</h2>
            <h2>Producer: {filmData.producer}</h2>
            <h3>Release Date: {filmData.release_date}</h3>
            <Link to={`/people?category=films&id=${id}`}>Characters </Link>
            <Link to={`/planets?category=films&id=${id}`}>Planets </Link>
            <Link to={`/starships?category=films&id=${id}`}>Starships </Link>
            <Link to={`/vehicles?category=films&id=${id}`}>Vehicles </Link>
            <Link to={`/species?category=films&id=${id}`}>Species </Link>
        </div>
    );
    } else {
      return <div>Error: open console to see log.</div>
    }
}

export default Film;