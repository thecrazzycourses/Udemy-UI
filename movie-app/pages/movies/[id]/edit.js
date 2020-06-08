import React, {Component} from 'react';
import CreateMovieForm from "../../../components/create-movie-form";
import {updateMovie, getMovieByID} from "../../../actions";
import Router from 'next/router'

class EditMovie extends Component {

    handleUpdateMovie = (movie) => {
        updateMovie(movie).then((updatedMovie) => {
            Router.push("/movies/[id]",`/movies/${movie.id}`)
        });
    }

    render() {
        const {movie} = this.props;
        return (
            <div className="container">
                <h1>Edit Movie</h1>
                <CreateMovieForm
                    submitButton="Update"
                    movie={movie}
                    handleFormSubmit={this.handleUpdateMovie}
                />
            </div>
        );
    }
}

EditMovie.getInitialProps = async (context) => {
    const {id} = context.query;
    const movie = await getMovieByID(id);
    return {
        movie: movie
    }
}

export default EditMovie;