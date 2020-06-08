import {useEffect, useState} from 'react';
import SideMenu from "../components/sidemenu";
import Carousel from "../components/carousel";
import MovieList from "../components/movie-list";
import {getCategories, getMovies} from "../actions";

function Home(props) {

    const [movies, setMovies] = useState([]);
    const {images, categories} = props;
    const [filter, setFilter] = useState('all')

    useEffect(() => {
        const {movies} = props;
        setMovies(movies);
    }, []);

    const changeCategory = (category) => {
        setFilter(category);
    }

    const filterMovies = (movies) => {

        if (filter === 'all') {
            return movies
        }

        return movies.filter((movie) => {
            return movie.genre && movie.genre.includes(filter)
        })
    }

    return (
        <div>

            <div className="home-page">
                <div className="container">
                    <div className="row">

                        <div className="col-lg-3">
                            <SideMenu
                                activeCategory={filter}
                                changeCategory={changeCategory}
                                categories={categories}/>
                        </div>

                        <div className="col-lg-9">
                            <Carousel images={images}/>
                            <h1>{filter && `Displaying ${filter} Movies`}</h1>
                            <div className="row">
                                <MovieList movies={filterMovies(movies) || []}/>
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