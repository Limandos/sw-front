import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FilmShort = ({film}) => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const [title, setTitle] = useState("");
    const [episodeId, setEpisodeId] = useState(0);
    const [releaseDate, setReleaseDate] = useState("");
    const [url, setUrl] = useState();

    useEffect(() => {
        fetch(film)
        .then(res => res.json())
        .then((result) => {
                setIsLoaded(true);
                setTitle(result.title);
                setEpisodeId(result.episode_id);
                setReleaseDate(result.release_date);
                setUrl(result.url);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        );
    });

    if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        return (
            <div>
                <Link to={"/" + url.substring(url.indexOf("films"))}><h2>Episode {episodeId + ": " + title}</h2>
                    <h5>Release Date: {releaseDate}</h5>
                </Link>
            </div>
        );
      }
}

export default FilmShort;