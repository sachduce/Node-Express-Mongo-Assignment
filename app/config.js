const env = process.env;

export const auth = {
    jwt: {
        secret: "jlkasdjalksdjlkasjdqwlej",
        beTokenSecret: env.BE_TOKEN_SECRET,
        tokenExpiryInMins: 5 * 24 * 60
    },

    TOKEN_NAME: 'access_token',
    CUSTOM_TOKEN_HEADER: 'x-access-token',

};

export const Mongo = {
    URL: 'mongodb://localhost/blog',
    userMessageRetryTimeoutSec: 1
};



