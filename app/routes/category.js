import express from 'express';
import { decodeToken, getFreshUser } from '../helpers/auth';
import * as categoryService from '../services/category';

const checkUser = [decodeToken(), getFreshUser()];
const router = express.Router();

router.param('id', categoryService.params);

router.route('/')
  .get(categoryService.get)
  .post(checkUser, categoryService.post)

router.route('/:id')
  .get(categoryService.getOne)
  .put(checkUser, categoryService.put)
  .delete(checkUser, categoryService.deleted)

export const categoryRouter = router;