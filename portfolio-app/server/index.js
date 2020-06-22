const express = require('express')
const next = require('next')
const mongoose = require('mongoose')

const authService = require('./services/auth');
const routes = require('../routes')
const config = require('./config')

const dev = process.env.NODE_ENV !== 'production'
const app = next({dev})
const handle = routes.getRequestHandler(app)

const secretData = [{title: 'Secret Data', description: 'Plan 1'}, {title: 'Secret Data', description: 'Plan 2'}]

// Connect To MongoDB
mongoose.connect(config.DB_URI, {useNewUrlParser: true}).then(() => {
    console.log('Database Connected');
}).catch((err) => {
    console.log(err);
})

app.prepare().then(() => {

    const server = express();

    server.get('/api/v1/secret', authService.checkJWT, (req, res) => {
        return res.json(secretData);
    })
    server.get('/api/v1/onlySiteOwner', authService.checkJWT, authService.checkRole('siteOwner'), (req, res) => {
        return res.json(secretData);
    })

    server.get('*', (req, res) => {
        return handle(req, res);
    })

    server.use(function (err, req, res, next) {
        if (err.name === 'UnauthorizedError') {
            res.status(401).send({title: 'Unauthorized', detail: 'Unauthorized Access!'});
        }
    });

    server.use(handle).listen(3000, (err) => {
        if (err) throw err
        console.log('> Ready on http://localhost:3000')
    })
})