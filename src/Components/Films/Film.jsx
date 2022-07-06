import React, { useEffect, useState } from "react";
import People from "../People/People";

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

    const charactersClick = () => {
        setShowCharacters(!showCharacters);
        console.log(characters);
    }
  

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
              <button onClick={charactersClick}>Characters ({showCharacters ? 'on' : 'off'})</button>
              {showCharacters ? (
                characters.map(char => 
                <People character={char}/>))
                : null}
          </div>
      );
    }
}

export default Film;