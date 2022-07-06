import React from "react";

export default class Film extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            title: null,
            episode_id: null,
            opening_crawl: null,
            director: null,
            producer: null,
            release_date: null
          };
    }

    componentDidMount() {
    fetch("https://swapi.dev/api/" + window.location.pathname)
        .then(res => res.json())
        .then((result) => {
            this.setState({
                isLoaded: true,
                title: result.title,
                episode_id: result.episode_id,
                opening_crawl: result.opening_crawl,
                director: result.director,
                producer: result.producer,
                release_date: result.release_date
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
                <h1>Episode {this.state.episode_id}: {this.state.title}</h1>
                <p>{this.state.opening_crawl}</p>
                <h2>{this.state.producer}</h2>
            </div>
        );
      }
    }
}