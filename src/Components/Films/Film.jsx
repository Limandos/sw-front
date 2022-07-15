import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getData } from "../../API";

const Film = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [result, setResult] = useState({});

    let { id } = useParams();

    useEffect(() => {
      getData(`https://swapi.dev/api/films/${id}`).then(res => {
          setIsLoaded(true);
          if (res.success) {
              setResult(res);
          }
      })
      .catch(error => {;
        console.error(error);
      });
    }, [id]);

    if (!isLoaded) {
      return <div>Loading...</div>;
    } else if (!result.success) {
      return <div>Error: open console to see log.</div>;
    } else {
      return (
          <div>
              <h1>Episode {result.episode_id}: {result.title}</h1>
              <p>{result.opening_crawl}</p>
              <h2>Director: {result.director}</h2>
              <h2>Producer: {result.producer}</h2>
              <h3>Release Date: {result.release_date}</h3>
              <Link to={`/people?category=films&id=${id}`}>Characters </Link>
              <Link to={`/planets?category=films&id=${id}`}>Planets </Link>
              <Link to={`/starships?category=films&id=${id}`}>Starships </Link>
              <Link to={`/vehicles?category=films&id=${id}`}>Vehicles </Link>
              <Link to={`/species?category=films&id=${id}`}>Species </Link>
          </div>
      );
    }
}

export default Film;