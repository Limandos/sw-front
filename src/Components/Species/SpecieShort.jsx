import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Species.module.css";
import { getData } from "../../API";

const SpecieShort = ({specie}) => {
    const [result, setResult] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        getData(specie).then(res => {
            setIsLoaded(true);
            if (res.success) {
                setResult(res);
            }
        })
        .catch(error => {;
          console.error(error);
        });
      }, [specie]);

      if (!isLoaded) {
        return <div>Loading...</div>;
      } else if (!result.success) {
        return <div>Error: open console to see log.</div>;
      } else {
        return (
            <div className={styles.listElement}>
                <Link to={"/" + result.url.substring(result.url.indexOf("species"))}>{result.name}<br/>
                    Classification: {result.classification}<br/>
                    Language: {result.language}<br/>
                </Link>
            </div>
        );
      }
}

export default SpecieShort;