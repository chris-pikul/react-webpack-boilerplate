/**
 * This is the babel configuration loader.
 * Babel will detect this file, and execute the JS within like a normal script.
 * I do this, so that we can load the proper "sub-configuration" depending
 * on which environment we are using.
 * When developing, it loads babel.dev.json
 * When making the final production build, it uses babel.prod.json
 */

const Path = require('path');

module.exports = (api) => {
    if(api.env("production") || (process && process.env.NODE_ENV === "production")) {
        console.log('BABEL IS USING PRODUCTION CONFIG');
        return require( Path.resolve(__dirname, 'babel.prod.json') );
    }

    console.log('Babel is using Development configuration');
    return require( Path.resolve(__dirname, 'babel.dev.json') );
};