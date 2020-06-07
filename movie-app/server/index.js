const next = require('next')
const express = require('express');
const bodyParser = require('body-parser');

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const filePath = './data.json'
const data = require(filePath)

app.prepare().then(() => {

    const server = express();
    server.use(bodyParser.json());

    server.get("/api/v1/movies", (req,res) => {
        return res.json(data)
    })

    server.post("/api/v1/movies", (req,res) => {
        const movie = req.body;
        return res.json({movie})
    })

    server.patch("/api/v1/movies/:id", (req,res) => {
        const {id} = req.params;
        return res.json({message: `Update Movie with ID: ${id}`})
    })

    server.delete("/api/v1/movies/:id", (req,res) => {
        const {id} = req.params;
        return res.json({message: `Deleted Movie with ID: ${id}`})
    })

    server.get('*', (req, res) => {
        // This handle is from NextJS. NextJS handle all the request for us from Pages Dir
        return handle(req, res)
    })

    const PORT = process.env.PORT || 3000;

    server.use(handle).listen(PORT, (err) => {
        if (err) throw err
        console.log('> Ready on port ' + PORT)
    })
})