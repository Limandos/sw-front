import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Species.module.css";
import { getData } from "../../API";

const SpecieShort = ({specie}) => {
    const [specieData, setSpecieData] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getData(specie).then(res => {
            if (res.success) {
                setSpecieData(res);
            }
        })
        .catch(error => {;
          console.error(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
      }, [specie]);

      if (isLoading) {
        return <div>Loading...</div>;
      } else if (specieData.success) {
        return (
          <div className={styles.listElement}>
              <Link to={"/" + specieData.url.substring(specieData.url.indexOf("species"))}>{specieData.name}<br/>
                  Classification: {specieData.classification}<br/>
                  Language: {specieData.language}<br/>
              </Link>
          </div>
      );
      } else {
        return <div>Error: open console to see log.</div>;
      }
}

export default SpecieShort;