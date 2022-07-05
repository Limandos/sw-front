import React from "react";

export default class Films extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        items: {}
      };
    }
  
    componentDidMount() {
      fetch("https://swapi.dev/api/films/")
        .then(res => res.json())
        .then((result) => {
            this.setState({
              isLoaded: true,
              items: result.results
            });
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
        console.log(this.state.items)
    }
  
    render() {
      const { error, isLoaded} = this.state;
      if (error) {
        return <div>Ошибка: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Загрузка...</div>;
      } else {
        return (
          <div>
          {this.items.map(item => (
            <div>
                <h1>Фильмы</h1>
                <h2>Количество: {item.count}</h2>
            </div>
          ))}
          </div>
        );
      }
    }
  }