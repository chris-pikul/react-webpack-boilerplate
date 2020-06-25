# react-webpack-boilerplate
A basic boilerplate for setting up react-based web projects.

# installation
```
// If using NPM
npm install

// If using Yarn
yarn
```

# usage
To start the development server, which watches your files and re-compiles them as needed (hot reloading), just run this command:
```
// Using Gulp (comes in the package, and prefered)
gulp

// Using NPM
npm run start

// Using Yarn
yarn start
```

To package up the final production build, run the following command:
```
// Using Gulp (comes in the package, and prefered)
gulp package

// NPM
npm run package

// Yarn
yarn package
```
The production pipeline runs additional transformations on the code before bundling.
For the JavaScript code, it adds the `@babel/env` plugin using the `.browserlistrc` file for targetting and support.
For the Styles (CSS/SASS), it adds the `postcss` pluging with `autoprefixer`, again using the `.browserlistrc` file for targetting and support.

If you want to view the packaged product to check, you can use the following command:
```
// NPM
npm run serve:production

// Yarn
yarn serve:production
```
And then open your browser to `http://localhost:8080`.

# developing
The structure and some starting code is provided. 

Some important things to note and consider when using this:
- The `package.json` file is used to supply a bunch of string values, the most important to change is the `name` and `version` properties as you develop. These directly decide the file name for the bundles generated.
- In addition, a custom property is added to the `package.json` file called `details`. This supplies some strings and values which are used in the HTML generation. They include:
    + `title`: Used for the HTML `<title>` tag, giving the page it's name.
    + `charset`: Declares the `<meta charset />` tag, which is commonly used in pages. Suggested that you don't change this.
    + `meta`: This object is expanded to create more `<meta name content />` tags which are common in HTML files.
    + `opengraph`: This object is also expanded to create `<meta property content />` tags used by OpenGraph. OpenGraph tags are read by other websites and robots to help configure how links to your app are displayed.

Here are some explanations on what's going on:

## HTML Generation
This project uses Nunjucks to provide templating for HTML file generate. You can see this in the `html/` folder for the `index.njk` file.
The provided index file makes use of a few things. First it uses the `package.json` file, and expands the `details` property within it to generate the needed `<meta>` tags and `<title>` tag that are common in pages.
After that, it loads to appropriate .css and .js files depending on the environment (development or production).
It also provides a `<div id='root'>` tag for React to bind too.
Note that the React dependencies are loaded as externals, this is so that they don't get bundled with the application, speeding up page load.

## JavaScript
The code for the actual application is kept in the `src/` folder. Starting with the `index.js` file which loads up React and ReactDOM and any needed files. It also does a blank import of the `index.scss` file in order for webpack to detect and start processing the css styles. 

Also provided is a utility function inside of the standard `console` object to print "debug" logs. This new function is callable from anywhere else in your code, just like you would a regular `console.log()` call, but instead it's `console.debug()`.

The actual React application is kept in the `src/application.js` file.

## Styling (CSS/SASS)
This project assumes the usage of SASS to pre-process the CSS styles and keep them neat and tidy. The global styles are kept in the `style/` folder. The `index.scss` file performs a general reset of styles (giving you a blank slate to work with).

Note: if you want to add style files for individual React components, it's recommended to either place the file in the `style/` folder and import using:
```
import 'Style/YOUR-FILE.scss';
```
Or to place them next to the .js file and import with the relative path. The `Style/` portion of any imports will automatically route to the main `./style/` folder.

## Static Images & Resources
Any static images and resources needed (like videos/fonts/audio/etc.) should be kept in the `static/` folder. When packaging these will automatically be copied to the `dist/` folder for you, along side the bundled files.

## Scripts
The `scripts/` folder holds a couple utility scripts for Node to use in the building/running process.
