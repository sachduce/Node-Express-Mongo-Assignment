import Category from '../models/category';
import { merge } from 'lodash';


export const params = (req, res, next, id) => {
  Category.findById(id)
    .then((category) => {
      if (!category) {
        next(new Error('No category with that id'));
      } else {
        req.category = category;
        next();
      }
    }).catch((err) => {
      next(err)
    });
};

export const get = (req, res, next) => {
  Category.find({})
    .then((categories) => {
      res.json(categories);
    }).catch((err) => {
      next(err);
    });
};

export const getOne = (req, res, next) => {
  var category = req.category;
  res.json(category);
};

export const put = (req, res, next) => {
  var category = req.category;

  var update = req.body;

  merge(category, update);

  category.save((err, saved) => {
    if (err) {
      next(err);
    } else {
      res.json(saved);
    }
  })
};

export const post = (req, res, next) => {
  var newcategory = req.body;

  Category.create(newcategory)
    .then(function (category) {
      res.json(category);
    }, function (err) {
      next(err);
    });
};

export const deleted = (req, res, next) => {
  req.category.remove((err, removed) => {
    if (err) {
      next(err);
    } else {
      res.json(removed);
    }
  });
};