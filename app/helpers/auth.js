import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import { auth } from '../config';



const checkToken = expressJwt({ secret: auth.jwt.secret });
const User = require('../models/user');

export const decodeToken = () => {
    return function (req, res, next) {

        if ( (req.headers && req.headers.hasOwnProperty(auth.CUSTOM_TOKEN_HEADER))) {
            req.headers.authorization = 'Bearer ' + req.headers[auth.CUSTOM_TOKEN_HEADER];
        }

        checkToken(req, res, next);
    };
};

export const getFreshUser = function () {
    return function (req, res, next) {
        User.findById(req.user._id)
            .then(function (user) {
                if (!user) {
                    
                    res.status(401).send('Unauthorized');
                } else {
                    
                    req.user = user;
                    next();
                }
            }, function (err) {
                next(err);
            });
    }
};

export const verifyUser = function () {
    return function (req, res, next) {
        var email = req.body.email;
        var password = req.body.password;

        
        if (!email || !password) {
            res.status(400).send('You need a email and password');
            return;
        }

        
        User.findOne({ email : email })
            .then(function (user) {
                if (!user) {
                    res.status(401).send('No user with the given email');
                } else {
                    
                    if (!user.authenticate(password)) {
                        res.status(401).send('Wrong password');
                    } else {
                        
                        req.user = user;
                        next();
                    }
                }
            }, function (err) {
                next(err);
            });
    };
};


export const signToken = (id) => {
    return jwt.sign(
        { _id: id },
        auth.jwt.secret,
        { expiresIn: auth.jwt.tokenExpiryInMins * 60 }
    );
};