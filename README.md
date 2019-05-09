# [Uzuki](https://panepo.github.io/Uzuki/)

[![Build Status][travis-image]][travis-url] [![Style Status][prettier-image]][prettier-url] [![Coverage Status][codecov-image]][codecov-url]

[travis-image]: https://travis-ci.org/Panepo/Uzuki.svg
[travis-url]: https://travis-ci.org/Panepo/Uzuki.svg?branch=master

[prettier-image]: https://img.shields.io/badge/code_style-prettier-ff69b4.svg
[prettier-url]: https://github.com/prettier/prettier

[codecov-image]: https://codecov.io/gh/Panepo/Uzuki/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/Panepo/Uzuki

React implementation of Boss sensor. Popup nonsense activity generator when boss is approaching with your browser and webcam.

## Requirements

* Webcam
* Browser (Chrome is perfered)
* Some images of your boss

## Usage

Ongoing

## Install

Nothing. Only a webcam and a tensorflow.js supported browser are needed.

## Reference

* [face-api.js](https://github.com/justadudewhohacks/face-api.js)
* [Tensorflow.js](https://js.tensorflow.org/)
* [React](https://facebook.github.io/react/)
* [Redux](http://redux.js.org/)
* [Create React App ](https://github.com/facebook/create-react-app)
* [Material Design Lite](https://getmdl.io/)
* [Material-UI](https://material-ui.com/)
* [react-webcam](https://github.com/mozmorris/react-webcam)

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

### Production

Build code before deployment by running `yarn build`.

## Author

[Panepo](https://github.com/Panepo)
