import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Film = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const [title, setTitle] = useState("");
    const [episode_id, setEpisode_id] = useState(0);
    const [opening_crawl, setOpening_crawl] = useState("");
    const [director, setDirector] = useState("");
    const [producer, setProducer] = useState("");
    const [release_date, setRelease_date] = useState("");
    const [characters, setCharacters] = useState([]);
    const [planets, setPlanets] = useState([]);
    const [starships, setStarships] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [species, setSpecies] = useState([]);

    const [showCharacters, setShowCharacters] = useState(false);

    useEffect(() => {
        fetch("https://swapi.dev/api/" + window.location.pathname)
        .then(res => res.json())
        .then((result) => {
            setIsLoaded(true);
            setTitle(result.title);
            setEpisode_id(result.episode_id);
            setOpening_crawl(result.opening_crawl);
            setDirector(result.director);
            setProducer(result.producer);
            setRelease_date(result.release_date);
            setCharacters(result.characters);
        },
          (error) => {
              setIsLoaded(true);
              setError(error);
          })}, []);

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
          <div>
              <h1>Episode {episode_id}: {title}</h1>
              <p>{opening_crawl}</p>
              <h2>Director: {director}</h2>
              <h2>Producer: {producer}</h2>
              <h3>Release Date: {release_date}</h3>
              <Link to={"/people?episode=" + episode_id}>Characters</Link>
          </div>
      );
    }
}

export default Film;