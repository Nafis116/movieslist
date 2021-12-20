import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import store from '../../redux/store';
import './Favorites.css';


class Favorites extends Component {
    state = {
        title: 'Новый список',
        listMovFavorites: [],
        postId: "",
        showLink: true
    }

    componentDidMount() {
        store.subscribe(() => {
            const state = store.getState();
            this.setState({ 
                listMovFavorites: state.listMovFavorites 
            });
        })
    }

    deleteMovie = (id) => {
        store.dispatch({
            type: 'DELETE_MOV-FROM_LIST',
            payload:{
                id: id
            }
        })
    }

    getPostID = (postId) => {
        store.dispatch({
            type: 'GET_ID',
            payload: {
                postId: postId,
            }
        })
    }


    titleChange = (e) => {
        this.setState({title: e.target.value});
    }

    handleSave = () => {
        let data = {
            title: "",
            movies: this.state.listMovFavorites
        };
        // this.state.listMovFavorites.forEach(elem => {
        //     data.movies.push(elem.id);
        // });
        data.title = this.state.title;

        fetch('https://acb-api.algoritmika.org/api/movies/list', {
          method: 'POST',  
          headers: {      
            'Accept': 'application/json',
            'Content-Type': 'application/json',  
          },  
          body: JSON.stringify(data)})
          .then(resp => resp.json())
          .then(data => this.setState({ postId: data.id })
        );
        if (this.state.listMovFavorites.length !== 0) {
            this.setState({ showLink: false });
        } else {
            this.setState({ showLink: true });
        }
    }

    
    render() {
        return (
            <div className="favorites">
                <div >
                <input onChange={this.titleChange} value={this.state.title} className="favorites__name" />
                <ul className="favorites__list">
                    {this.state.listMovFavorites.map((item) => (
                        <li  key={item.id}>{item.title} ({item.year})
                        <button onClick={() => this.deleteMovie(item.id)} type="button" className="favorites__delete">X</button>
                        </li> 
                    ))} 
                </ul>
                <button onClick={() => this.handleSave()} type="button" className={this.state.showLink ? "favorites__save" : "favorites__save-none"}>Сохранить список</button>
                </div>
                <div className={this.state.showLink ? "favorites-link" : ""}>
                    <Link to={`/list/${this.state.postId}`}>Перейти к списку</Link>
                </div>
            </div>
        );
    }
}
 
export default Favorites;

