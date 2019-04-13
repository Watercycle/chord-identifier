## Overview

[Chords](https://en.wikipedia.org/wiki/Chord_(music)) are an important pain in the ass.
The point of this project is to facilitate learning about them while also exploring a variety of tools.

## Getting Started

Run`npm install` in the client directory.

## Testing

Run `npm test` in the client directory.

## Deploying

Run `npm run deploy`in the client directory. 
This will generate public assets and put them in `server/public`.

Then, run `cargo run` in the server directory. The app will be available at `localhost:8000`.

## Technologies

#### Server
* [Rust](https://www.rust-lang.org/) - Programming Language
* [Cargo](https://crates.io/) - Package Manager
* [Rocket](https://rocket.rs/) - Web Server Framework
* [Docker](https://www.docker.com/) - Deployment Environment

#### Client
* [Typescript](https://www.typescriptlang.org/) - Programming Language
* [npm](https://www.npmjs.com/) - Package Manager
* [Webpack](https://webpack.js.org/) - Fancy File Transformer
* [React](https://reactjs.org/) - UI Library
* [Redux](https://redux.js.org/) - Fancy Global Variable
* [Stylus](http://stylus-lang.com/) - Prettier CSS
* [Jest](https://jestjs.io/) - Testing Framework
* [Babel](https://babeljs.io/) - Modern Javascript Compiler
* [Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers) - Offline Support
