import axios from 'axios';

const BASE_URL = 'http://localhost:3000';
const MOVIE_DATA = []

const CATEGORY_DATA = [
    {"id": "0", "name": "all"},
    {"id": "1", "name": "drama"},
    {"id": "2", "name": "action"},
    {"id": "3", "name": "adventure"},
    {"id": "4", "name": "historical"}
]

export const createMovie = (movie) => {
    movie.id = Math.random().toString(36).substr(2,7);
    return axios.post(`${BASE_URL}/api/v1/movies`, movie).then((res) => {
        return res.data;
    })
}

export const getMovies = () => {
    return axios.get(`${BASE_URL}/api/v1/movies`)
        .then(res => res.data)
}

export const getMovieByID = (id) => {
    return axios.get(`${BASE_URL}/api/v1/movies/${id}`).then((res) => {
        return res.data;
    })
}

export const deleteMovieByID = (id) => {
    return axios.delete(`${BASE_URL}/api/v1/movies/${id}`).then((res) => {
        return res.data;
    })
}

export const updateMovie = (movie) => {
    return axios.patch(`${BASE_URL}/api/v1/movies/${movie.id}`, movie).then((res) => {
        return res.data;
    })
}

export const getCategories = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(CATEGORY_DATA)
        }, 50)
    })
}

export const getPosts = () => {
    return axios.get(`${BASE_URL}/api/v1/posts`).then((res) => {
        return res.data;
    })
}