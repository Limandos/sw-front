import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./People.module.css";
import { getData } from "../../API";

const PeopleShort = ({character}) => {
    const [peopleData, setPeopleData] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getData(character).then(res => {
            if (res.success) {
                setPeopleData(res);
                setIsLoading(false);
            }
        })
        .catch(error => {;
          console.error(error);
        });
      }, [character]);

      if (isLoading) {
        return <div>Loading...</div>;
      } else if (peopleData.success) {
        return (
          <div className={styles.element}>
              <Link to={"/" + peopleData.url.substring(peopleData.url.indexOf("people"))}>
                  {peopleData.name}<br />
                  Gender: {peopleData.gender}<br />
                  Birth year: {peopleData.birth_year}
              </Link>
          </div>
      );
      } else {
        return <div>Error: open console to see log.</div>;
      }
}

export default PeopleShort;