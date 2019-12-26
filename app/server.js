import { expressApp as app } from './server-base';
import { connect } from './infrastructure/db';
import 'babel-polyfill';

const port = process.env.PORT || 3000;
// const connection = connect();

export const start = (async () => {
    try {
        await connect()
        app.listen(port, () => {
            console.log(`REST API on http://localhost:${port}`)
        })
    } catch (e) {
        console.error(e)
    }
})()



