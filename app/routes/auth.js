import express from 'express';
import { verifyUser, signToken } from '../helpers/auth';
const router = express.Router();

router.post('/signin', verifyUser(), (req, res, next) => {
    let token = signToken(req.user._id);
    res.json({ token: token })
})

export const authRouter = router;