require('dotenv/config');

const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
var User = require('../server/models/user');

mongoose.connect(process.env.URL_MONGODB, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var router = express.Router();

router.use(function (req, res, next) {
    console.log('Executing Action...');
    next();
});

router.get('/', function (req, res) {
    User.find(function (error, users) {
        if (error)
            res.send(error);

        res.json(users);
    });
});

router.route('/user')

    .post(function (req, res) {
        var user = new User();

        user.login = req.body.login;
        user.password = req.body.password;
        user.name = req.body.name;
        user.email = req.body.email;

        user.save(function (error) {
            if (error)
                res.send(error);

            res.json({ message: 'User createded.' });
        });
    })

router.route('/user/:id')

    .get(function (req, res) {
        User.findById(req.params.id, function (error, user) {
            if (error)
                res.send(error);

            res.json(user);
        });
    })

    .put(function (req, res) {
        User.findById(req.params.id, function (error, user) {
            if (error)
                res.send(error);

            user.login = req.body.login;
            user.password = req.body.password;
            user.name = req.body.name;
            user.email = req.body.email;

            user.save(function (error) {
                if (error)
                    res.send(error);

                res.json({ message: 'User updateded.' });
            });
        });
    })

    .delete(function (req, res) {
        User.remove({
            _id: req.params.id
        }, function (error) {
            if (error)
                res.send(error);

            res.json({ message: 'User deleted.' });
        });
    });

app.use('/api', router);

app.listen(process.env.PORT);
console.log('Running port ' + process.env.PORT);
