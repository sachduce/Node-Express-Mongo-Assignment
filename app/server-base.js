import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors'

import {
    userRouter,
    authRouter,
    blogPostRouter,
    categoryRouter
}
    from './routes';


const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, type: '*/x-www-form-urlencoded' }));
app.use(bodyParser.json({ type: '*/json' }));
app.use(bodyParser.text({ type: 'text/*' }));

app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/post', blogPostRouter)
app.use('/category', categoryRouter)




app.use(function (err, req, res, next) {
    console.error('error at %s\n', req.url, err);
    res.status(500).send(err.message)
})



export const expressApp = app;