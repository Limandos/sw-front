import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./People.module.css";
import { getData } from "../../API";

const PeopleShort = ({character}) => {
    const [result, setResult] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        getData(character).then(res => {
            setIsLoaded(true);
            if (res.success) {
                setResult(res);
            }
        })
        .catch(error => {;
          console.error(error);
        });
      }, [character]);

      if (!isLoaded) {
        return <div>Loading...</div>;
      } else if (!result.success) {
        return <div>Error: open console to see log.</div>;
      } else {
        return (
            <div className={styles.element}>
                <Link to={"/" + result.url.substring(result.url.indexOf("people"))}>
                    {result.name}<br />
                    Gender: {result.gender}<br />
                    Birth year: {result.birth_year}
                </Link>
            </div>
        );
      }
}

export default PeopleShort;