import { useEffect, useState } from "react";

const Films = () => {
    const [error, setError] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [count, setCount] = useState(0);
    const [filmsList, setfilmsList] = useState([]);
    //const [next, setNext] = useState(null);
    //const [previous, setPrevious] = useState(null);

    useEffect(() => {
        fetch("https://swapi.dev/api/films/")
        .then(res => res.json())
        .then((result) => {
            setIsLoaded(true);
            setCount(result.count);
            setfilmsList(result.results)
        },
        (error) => {
            setError(error)
        })}, []);


    if (error) {
          return <div>Error: {error.message}</div>;
    }
    else if (!isLoaded) {
          return <div>Loading...</div>;
        } else {
          return (
            <div>
              <h1>Films</h1>
              <h2>Count: {count}</h2>
                <div>
                  <nav>
                    <ul>
                      {filmsList.map((item, index) => (
                        <li key={item.episode_id}>
                          <a href={"/films/" + (index + 1)}>Episode {item.episode_id}: {item.title}</a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
            </div>
          );
        }
}

export default Films;