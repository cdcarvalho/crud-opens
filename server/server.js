require('dotenv/config')

const express = require('express')
var cors = require('cors');
const app = express();
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const auth = require('../server/middlewares/auth')
const jwt = require('jsonwebtoken');
const httpEnum = require('../server/enum/Ehttp')
var User = require('../server/models/user')

mongoose.connect(process.env.URL_MONGODB, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

var router = express.Router();

router.get('/authenticate', function (request, response) {
    const [, hash] = request.headers.authorization.split(' ')
    const [username, password] = Buffer.from(hash, 'base64').toString().split(":");

    try {
        User.findOne({ 'login': username, 'password': password }, function (error, user) {
            if (error)
                response.send(error);

            if (user == null) {
                response.sendStatus(httpEnum.httpStatusCode.UNAUTHORIZED);
            }

            const token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: 7200 });

            return response.json({ 'token': token });
        });
    } catch (error) {
        response.sendStatus(httpEnum.httpStatusCode.SERVER_ERROR);
    }
})

router.get('/token-valid', function (request, response) {
    const authHeader = request.headers.authorization;

    try {

        if (!authHeader) {
            return response.status(httpEnum.httpStatusCode.UNAUTHORIZED).json({ message: 'Token is required!' });
        }

        const [, token] = authHeader.split(' ');

        try {
            jwt.verify(token, process.env.SECRET);
            return response.send(true)
        } catch (error) {
            return response.send(false)
        }

    } catch (error) {
        response.sendStatus(httpEnum.httpStatusCode.SERVER_ERROR);
    }
})

router.use(auth);

router.get('/users', function (request, response) {
    User.find(function (error, users) {
        if (error)
            response.send(error);

        response.json(users);
    });
});

router.route('/user')

    .post(function (request, response) {
        var user = new User();

        user.login = request.body.login;
        user.password = request.body.password;
        user.name = request.body.name;
        user.email = request.body.email;

        user.save(function (error) {
            if (error)
                response.send(error);

            response.json({ message: 'User createded.' });
        });
    })

router.route('/user/:id')

    .get(function (request, response) {
        User.findById(request.params.id, function (error, user) {
            if (error)
                response.send(error);

            response.json(user);
        });
    })

    .put(function (request, response) {
        User.findById(request.params.id, function (error, user) {
            if (error)
                response.send(error);

            user.login = request.body.login;
            user.password = request.body.password;
            user.name = request.body.name;
            user.email = request.body.email;

            user.save(function (error) {
                if (error)
                    response.send(error);

                response.json({ message: 'User updateded.' });
            });
        });
    })

    .delete(function (request, response) {
        User.remove({
            _id: request.params.id
        }, function (error) {
            if (error)
                response.send(error);

            response.json({ message: 'User deleted.' });
        });
    });

app.use('/api', router);

app.listen(process.env.PORT);
console.log('Running port '.concat(process.env.PORT));
