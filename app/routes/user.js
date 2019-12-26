import express from 'express';
import { decodeToken, getFreshUser } from '../helpers/auth';
import * as userService from '../services/user';

let checkUser = [decodeToken(), getFreshUser()];

const router = express.Router();


router.param('id', userService.params);
router.get('/me', checkUser, userService.me);

router.route('/')
  .get(userService.get)
  .post(userService.post)

router.route('/:id')
  .get(userService.getOne)
  .put(checkUser, userService.put)
  .delete(checkUser, userService.deleted)

export const userRouter = router;