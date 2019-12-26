import express from 'express';
import { decodeToken, getFreshUser } from '../helpers/auth';
import * as blogpostService from '../services/blogpost';

let checkUser = [decodeToken(), getFreshUser()];
const router = express.Router();


router.param('id', blogpostService.params);

router.route('/')
    .get(blogpostService.get)
    .post(checkUser, blogpostService.post)

router.route('/:id')
    .get(blogpostService.getOne)
    .put(checkUser, blogpostService.put)
    .delete(checkUser, blogpostService.deleted)

export const blogPostRouter = router;