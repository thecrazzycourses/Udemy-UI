import React, {Component} from 'react';
import Link from "next/link";

class MovieList extends Component {

    shorten = (text, maxLength) => {
        if (text && text.length > maxLength) {
            return text.substr(0, maxLength) + '...';
        }
        return text;
    }

    render() {
        const movies = this.props.movies;
        return (
            // <> or <ReactFragment>
            <>
                {movies.map(movie => {
                    return (
                        <div key={movie.id} className="col-lg-4 col-md-6 mb-4">
                            <div className="card h-100">
                                <Link href="/movies/[id]" as={`/movies/${movie.id}`}>
                                    <a><img className="card-img-top" src={movie.image} alt=""/></a>
                                </Link>
                                <div className="card-body">
                                    <h4 className="card-title">
                                        <Link href="/movies/[id]" as={`/movies/${movie.id}`}>
                                            <a>{movie.name}</a>
                                        </Link>
                                    </h4>
                                    <h5>$24.99</h5>
                                    <p className="card-text">{this.shorten(movie.description, 100)}</p>
                                </div>
                                <div className="card-footer">
                                    <small className="text-muted">{movie.rating}</small>
                                </div>
                            </div>
                        </div>
                    )
                })}

            </>
        );
    }
}

export default MovieList;