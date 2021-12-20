import React, { Component } from 'react';
import './ListPage.css';

class ListPage extends Component {
    state = {
        movies: [],
        title: '',
        error: ''
    }
    componentDidMount() {
        let id = this.props.match.params.id;
        console.log(id);
            fetch(`https://acb-api.algoritmika.org/api/movies/list/${id}`)
            .then(resp => {
                return resp.json();
            })
            .then(data => {
                console.log(data)
                this.setState({
                    movies: data.movies,
                    title: data.title
                });
            })
            .catch((error) => {
                console.log('Ошибка', error);
            })  
    }

    render() { 
        return (
            <div className="list-page">
                <h1 className="list-page__title">{this.state.title}</h1>
                <ul>
                    {this.state.movies.map((item) => {
                        return (
                            <li key={item.movies}>
                                <a href={`https://www.imdb.com/title/${item.id}/`} rel="noopener noreferrer" target="_blank">{item.title} ({item.year})</a>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}
 
export default ListPage;