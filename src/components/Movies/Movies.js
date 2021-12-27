import React, { Component } from 'react';
import MovieItem from '../MovieItem/MovieItem';
import './Movies.css';

import store from '../../redux/store';

class Movies extends Component {
    state = {
        movies: [],
        searchLine: ""
    };

    componentDidMount() {
        store.subscribe(() => {
            const state = store.getState();
            fetch(`http://www.omdbapi.com/?s=${state.searchLine}&apikey=fb93debc`)
            .then(resp => {
                return resp.json();
            })
            .then(data => {
                this.setState({
                    movies: data.Search
                });
            })
        })
    };

    render() { 
        return ( 
            <ul className="movies">
                {this.state.movies.map((movie) => (
                    <li className="movies__item" key={movie.imdbID}>
                        <MovieItem {...movie} />
                    </li>
                ))}
            </ul>
        );
    }
}
 
export default Movies;