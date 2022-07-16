import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Films.module.css";
import { getData } from "../../API";

const FilmShort = ({film}) => {
    const [filmData, setFilmData] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getData(film).then(res => {
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
      }, [film]);

      if (isLoading) {
        return <div>Loading...</div>;
      } else if (filmData.success) {
        return (
          <div className={styles.element}>
              <Link to={"/" + filmData.url.substring(filmData.url.indexOf("films"))}>Episode {filmData.episode_id + ": " + filmData.title}
                  <br />
                  Release Date: {filmData.release_date}
              </Link>
          </div>
      );
      } else {
        return <div>Error: open console to see log.</div>;
      }
}

export default FilmShort;