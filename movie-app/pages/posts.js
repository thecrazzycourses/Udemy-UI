import React, {Component} from 'react';
import {getPosts} from "../actions";

class Posts extends Component {

    static async getInitialProps() {
        const posts = await getPosts();
        return {posts: posts}
    }

    render() {
        const {posts} = this.props;
        return (
            <div className="container">
                <h1>All Posts</h1>
                {posts.map((post) => {
                    return (
                        <ul key={post.id}>
                            <li>
                                <span>{post.id}</span> <span>{post.title}</span>
                            </li>
                        </ul>
                    )
                })}
            </div>
        );
    }
}

export default Posts;