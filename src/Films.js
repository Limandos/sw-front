import React from "react";

export default class Films extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        count: 0,
        next: null,
        previous: null,
        filmsList: [],
      };
    }
  
    componentDidMount() {
      fetch("https://swapi.dev/api/films/")
        .then(res => res.json())
        .then((result) => {
            this.setState({
              isLoaded: true,
              count: result.count,
              next: result.next,
              previous: result.previous,
              filmsList: result.results
            });
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
    }
  
    render() {
      if (this.state.error) {
        return <div>Error: {this.state.error.message}</div>;
      } else if (!this.state.isLoaded) {
        return <div>Loading...</div>;
      } else {
        return (
          <div>
            <h1>Films</h1>
            <h2>Count: {this.state.count}</h2>
              <div>
                <nav>
                  <ul>
                    {this.state.filmsList.map((item, index) => (
                      <li><a href={"/films/" + (index + 1)}>Episode {item.episode_id}: {item.title}</a></li>
                    ))}
                  </ul>
                </nav>
              </div>
          </div>
        );
      }
    }
  }