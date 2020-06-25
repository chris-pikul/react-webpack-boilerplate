const express = require('express');
const path = require('path');

const app = express();
const port = 8080;

app.use( (req, res, next) => {
    const extInd = req.path.lastIndexOf('.');
    const ext = req.path.substr(extInd);
    if(ext && ext.length > 1) {
        //Prevent directories from using relative filenames,
        //this seems to be a thing with the dynamic import from webpack
        const subPathInd = req.path.lastIndexOf('/');
        if(subPathInd > 1) {
            const firstPath = req.path.substr(1, req.path.indexOf('/', 1)-1);
            switch(firstPath) {
                case 'locales':
                case 'fonts':
                    console.log('\tOK');
                    return next();
            }

            const nextPath = req.path.substr(subPathInd);
            console.log(`\tREWRITE ${nextPath}`);

            return next(nextPath);
        }
        return next();
    } else {
        return next();
    }
});
app.use( express.static('./dist') );
app.get('*', (_, res) => 
    res.sendFile( path.resolve(__dirname, '../../dist', 'index.html') )
);

app.listen(port, () => console.log(`Serving package on port ${port}`));