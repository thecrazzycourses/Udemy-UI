import {useEffect, useState} from 'react';
import SideMenu from "../components/sidemenu";
import Carousel from "../components/carousel";
import MovieList from "../components/movie-list";
import {getCategories, getMovies} from "../actions";

function Home(props) {

    const [movies, setMovies] = useState([]);
    const {images, categories} = props;

    useEffect(() => {
        const {movies} = props;
        setMovies(movies);
    }, []);

    return (
        <div>

            <div className="home-page">
                <div className="container">
                    <div className="row">

                        <div className="col-lg-3">
                            <SideMenu categories={categories}/>
                        </div>

                        <div className="col-lg-9">
                            <Carousel images={images}/>
                            <div className="row">
                                <MovieList movies={movies || []}/>
                            </div>
                        </div>

                    </div>
                </div>
            </div>


        </div>
    )
}

Home.getInitialProps = async () => {
    const movies = await getMovies();
    const images = movies.map((movie) => {
        return {
            id: `image-${movie.id}`,
            url: movie.cover,
            title: movie.name
        }
    })

    const categories = await getCategories();

    return {
        movies: movies,
        images: images,
        categories: categories
    }
}

export default Home;