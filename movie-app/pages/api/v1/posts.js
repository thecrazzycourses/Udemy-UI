import axios from "axios";

const Posts = async (req, res) => {

    if (req.method === 'POST') {

        const postData = JSON.parse(req.body);
        console.log(postData);
        return res.json({
            status: 'Saving Post to DB',
            post: {...postData}
        })

    } else {
        const postsData = await axios.get('https://jsonplaceholder.typicode.com/posts');
        const posts = postsData.data
        return res.json(posts.slice(0, 15));
    }

};

export default Posts;