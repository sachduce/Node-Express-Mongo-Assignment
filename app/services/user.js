import User from '../models/user';
import { merge } from 'lodash';
import { signToken } from '../helpers/auth';

export const params = (req, res, next, id) => {
    User.findById(id)
        .select('-password')
        .exec()
        .then((user) => {
            if (!user) {
                next(new Error('No user with that id'));
            } else {
                req.user = user;
                next();
            }
        }).catch((err) => {
            next(err);
        });
};

export const get = (req, res, next) => {
    User.find({})
        .select('-password')
        .exec()
        .then((users) => {
            res.json(users.map((user) => {
                return user.toJson();
            }));
        }).catch(function (err) {
            next(err);

        })
}
export const getOne = (req, res, next) => {
    var user = req.user;
    res.json(user.toJson());
};

export const put = (req, res, next) => {
    var user = req.user;

    var update = req.body;

    merge(user, update);

    user.save((err, saved) => {
        if (err) {
            next(err);
        } else {
            res.json(saved.toJson());
        }
    })
};

export const post = (req, res, next) => {
    var newUser = new User(req.body);

    newUser.save((err, user) => {
        if (err) { return next(err); }

        var token = signToken(user._id);
        res.json({ token: token });
    });
};

export const deleted = (req, res, next) => {
    req.user.remove((err, removed) => {
        if (err) {
            next(err);
        } else {
            res.json(removed.toJson());
        }
    });
};

export const me = (req, res) => {
    res.json(req.user.toJson());
};