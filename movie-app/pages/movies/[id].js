import React from 'react';
import {useRouter} from "next/router";
import {getMovieByID} from "../../actions";

const Movie = (props) => {
    const router = useRouter();
    const {id} = router.query;

    const {movie} = props;

    return (
        <div className="container">
            <div className="jumbotron">
                <h1 className="display-4">{movie.name}</h1>
                <p className="lead">{movie.description}</p>
                <hr className="my-4"/>
                <p>{movie.genre}</p>
                <a className="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
            </div>

            <p className="desc-text">{movie.longDesc}</p>

            <style jsx>{`
                .desc-text {
                    font-size: 18px
                }
            `}</style>
        </div>
    );
};

Movie.getInitialProps = async (context) => {
    const {id} = context.query;
    const movie = await getMovieByID(id);
    return {
        movie: movie
    }
}

export default Movie;