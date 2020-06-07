import React from 'react';
import Modal from "./modal";
import CreateMovieForm from "./create-movie-form";
import {createMovie} from "../actions";

const SideMenu = (props) => {

    const {categories} = props;
    let modal = null;

    const handleCreateMovie = (movie) => {
        createMovie(movie).then((movies) => {
            console.log(JSON.stringify(movies));
            modal.closeModal();
        });
    }

    return (
        <div>
            <Modal ref={element => {modal = element}} hasSubmit={false}>
                <CreateMovieForm handleFormSubmit={handleCreateMovie} />
            </Modal>
            <h1 className="my-4">Categories</h1>
            <div className="list-group">
                {
                    categories.map((category) => {
                        return (
                            <a key={category.id} href="#" className="list-group-item">{category.name}</a>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default SideMenu;