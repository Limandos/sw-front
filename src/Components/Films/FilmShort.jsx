import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Films.module.css";
import { getData } from "../../API";

const FilmShort = ({film}) => {
    const [result, setResult] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        getData(film).then(res => {
            setIsLoaded(true);
            if (res.success) {
                setResult(res);
            }
        })
        .catch(error => {;
          console.error(error);
        });
      }, [film]);

      if (!isLoaded) {
        return <div>Loading...</div>;
      } else if (!result.success) {
        return <div>Error: open console to see log.</div>;
      } else {
        return (
            <div className={styles.element}>
                <Link to={"/" + result.url.substring(result.url.indexOf("films"))}>Episode {result.episode_id + ": " + result.title}
                    <br />
                    Release Date: {result.release_date}
                </Link>
            </div>
        );
      }
}

export default FilmShort;