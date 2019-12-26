import BlogPost from '../models/blogpost';
import { merge } from 'lodash';


export const params = function (req, res, next, id) {
    BlogPost.findById(id)
        .populate('author', 'email')
        .populate('categories', 'name')
        .exec()
        .then((post) => {
            if (!post) {
                next(new Error('No post with that id'));
            } else {
                req.post = post;
                next();
            }
        }).catch((err) => {
            next(err);
        });
};

export const get = function (req, res, next) {
    BlogPost.find({})
        .populate('author', 'email')
        .populate('categories', 'name')
        .exec()
        .then((posts) => {
            res.json(posts);
        }).catch((err) => {
            next(err);
        });
};

export const getOne = function (req, res, next) {
    var post = req.post;
    res.json(post);
};

export const put = function (req, res, next) {
    var post = req.post;

    var update = req.body;

    merge(post, update);

    BlogPost.update(post).then((saved) => {
        res.json(post);
    }).catch((err) => {
        next(err);
    })

};

export const post = function (req, res, next) {
    var newpost = req.body;
    newpost.author = req.user._id;
    BlogPost.create(newpost)
        .then((post) => {
            res.json(post);
        }).catch(err => {
            next(err);
        })
};

export const deleted = function (req, res, next) {
    req.post.remove((err, removed) => {
        if (err) {
            next(err);
        } else {
            res.json(removed);
        }
    });
};