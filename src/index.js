import React from 'react';
import ReactDOM from 'react-dom';

//Import the styles so that Webpack can pick them up
import 'Style/index.scss';

//Environment monkey-patching
//This just adds a convienient console.debug() function in development env
if(ENVIRONMENT === 'LOCAL') {
    console.debug = function() {
        if(arguments.length > 0) {
            if(typeof arguments[0] === 'string')
                arguments[0] = '[DEBUG] '+arguments[0];
            else
                arguments.unshift('[DEBUG]');
            console.log.apply(null, arguments);
        }
    };
} else {
    console.debug = function() {};
}

//Render the application
import Application from './application';
ReactDOM.render(<Application />, document.getElementById('root'));
