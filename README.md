# [Uzuki](https://panepo.github.io/Uzuki/)

[![Build Status](https://travis-ci.org/Panepo/Uzuki.svg?branch=master)](https://travis-ci.org/Panepo/Uzuki.svg) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

React implementation of Boss sensor. Popup nonsense activity generator when boss is approaching with your browser and webcam.

## Requirements

* Webcam
* Browser (Chrome is perfered)
* Some images of your boss

## Usage

First visit this [page](https://panepo.github.io/Uzuki/) and follow these steps:

![usage](https://github.com/Panepo/Uzuki/blob/master/doc/usage.png)

1. Upload the images of your boss
2. Train the network
3. Setup and start the webcam
4. Start face detection
5. Start boss sensor alarming

When the boss approaches, browser will alarm you and the page will auto redirect to nonsense activity generator.

![nonsense](https://github.com/Panepo/Uzuki/blob/master/doc/nonsense.png)

## Install

Nothing. Only a webcam and a tensorflow.js supported browser are needed.

## Library used

* [face-api.js](https://github.com/justadudewhohacks/face-api.js)
* [Tensorflow.js](https://js.tensorflow.org/)
* [React](https://facebook.github.io/react/)
* [Redux](http://redux.js.org/)
* [Create React App ](https://github.com/facebook/create-react-app)
* [Material Design Lite](https://getmdl.io/)
* [react-webcam](https://github.com/mozmorris/react-webcam)
* [FlipMove](https://github.com/joshwcomeau/react-flip-move)

## Develop

### Development Requirements
* node `^8.11.0`
* yarn `^1.7.0`

### Getting Start

1. Clone source code
```
$ git clone https://github.com/Panepo/Uzuki.git
```
2. Install dependencies
```
$ cd Uzuki
$ yarn
```
3. Start development server and visit [http://localhost:3000/](http://localhost:3000/)
```
$ yarn start
```
### Scripts

|`yarn <script>`       |Description|
|-------------------|-----------|
|`start`            |Serves your app at `localhost:3000`|
|`test`             |Run test code in ./src|
|`lint`             |Lint code in ./src|
|`prettier`         |Prettier code in ./src|
|`build`            |Builds the production application to ./build|
|`deploy`           |Deploy the production application to github pages|

### Testing

Jest is used for test runner. Jest will look for test files with any of the following naming conventions:

* Files with `.js` suffix in `__tests__` folders.
* Files with `.test.js` suffix.
* Files with `.spec.js` suffix.

Jest has an integrated coverage reporter that works well with ES6 and requires no configuration.
Run `npm test -- --coverage` (note extra `--` in the middle) to include a coverage report.

### Production

Build code before deployment by running `yarn build`.

## Author

[Panepo](https://github.com/Panepo)
