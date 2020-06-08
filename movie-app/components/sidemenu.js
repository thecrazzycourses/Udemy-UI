import React from 'react';
import Modal from "./modal";
import CreateMovieForm from "./create-movie-form";
import {createMovie} from "../actions";
import {useRouter} from "next/router";

const SideMenu = (props) => {

    const {categories} = props;
    let modal = null;
    const router = useRouter();

    const handleCreateMovie = (movie) => {
        createMovie(movie).then(() => {
            modal.closeModal();
            router.push('/');
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
                            <a key={category.id}
                               href="#"
                               className={`list-group-item ${props.activeCategory === category.name ? 'active' : ''} `}
                               onClick={() => props.changeCategory(category.name)}>
                                {category.name}
                            </a>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default SideMenu;