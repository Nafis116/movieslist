import React, { Component } from 'react';
import './MovieItem.css';
import store from '../../redux/store';

class MovieItem extends Component {
    addToList=(Title, Year, Poster, imdbID) => {
        store.dispatch({
            type: 'ADD_TO-LIST',
            payload:{
                id: imdbID,
                title: Title,
                year: Year,
                poster: Poster
            }
        })
    }

    render() {
        const { Title, Year, Poster, imdbID } = this.props;
        return (
            <article className="movie-item">
                <img className="movie-item__poster" src={Poster} alt={Title} />
                <div className="movie-item__info">
                    <h3 className="movie-item__title">{Title}&nbsp;({Year})</h3>
                    <button key={imdbID} onClick={()=>this.addToList(Title, Year, Poster, imdbID)} type="button" className="movie-item__add-button">Добавить в список</button>
                </div>
            </article>
        );
    }
}
 
export default  MovieItem;