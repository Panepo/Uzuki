# [Uzuki](https://panepo.github.io/Uzuki/)

[![Build Status][travis-image]][travis-url] [![Style Status][prettier-image]][prettier-url] [![Coverage Status][codecov-image]][codecov-url]

[travis-image]: https://travis-ci.org/Panepo/Uzuki.svg
[travis-url]: https://travis-ci.org/Panepo/Uzuki.svg?branch=master

[prettier-image]: https://img.shields.io/badge/code_style-prettier-ff69b4.svg
[prettier-url]: https://github.com/prettier/prettier

[codecov-image]: https://codecov.io/gh/Panepo/Uzuki/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/Panepo/Uzuki

React implementation of Boss sensor. Popup nonsense activity generator when boss is approaching with your browser and webcam.

## FAQ

### What is this?

This is an implementation of face recognition algorithm running purely on the browser using the Tensorflow.js and face.api library. The basic concept of this project comes from [BossSensor](https://github.com/Hironsan/BossSensor).

### How the boss sensor works?

The program scan images from webcam frame by frame. Finding if there is a face on the image and recognizing the face if it is momorized by deeplearning technique. Then alert the user to hide the screens.

### Is my data safe?

Your data and pictures here never leave your computer! In fact, this is one of the main advantages of running neural networks in your browser. Instead of sending us your data, we send you both the model and the code to run the model. You don't need to install Python, Tensorflow or something, these are then run by your browser.

### How big are the models I'm downloading?

Your browser will download a model around ~6.4MB in size. Be careful if you have limited bandwidth (mobile data users). The face recognition models will be downloaded once you click on train or sensor page.

### That's cool, how can I use it?

Just follow these steps. This is the main screenshot. Once your face data is ready, a green tick will be shown on the Train button. If you didn't prepare the face image to program, click Train button first.

![home](https://github.com/Panepo/Uzuki/blob/master/documents/usage-home.png)

This is the train page. Add your boss images from your computer or use the webcam to capture some. Once there are face images on the application, the train button will appears, click it to train the neural network.

![Train](https://github.com/Panepo/Uzuki/blob/master/documents/usage-train1.png)
![Train](https://github.com/Panepo/Uzuki/blob/master/documents/usage-train2.png)

Second, coordinate your webcam to let it face the passage, then click and drag the green rectangle to select the scanning zoom. The application with a smaller scanning zoom will run faster. (It means will react faster. :P)

![setting](https://github.com/Panepo/Uzuki/blob/master/documents/usage-setting.png)

Third, set up the sensor. Click the webcam buttom to active and click recognize buttom to active face recognization. Note that the application will only detect face in this step, no warning will shown.

![sensor](https://github.com/Panepo/Uzuki/blob/master/documents/usage-sensor1.png)

Final Then click the detecting buttom, once the application detect the boss, an alert window will pop and redirect to non-sense generator.

![sensor](https://github.com/Panepo/Uzuki/blob/master/documents/usage-sensor2.png)

## Requirements

* Webcam
* Browser (Chrome is perfered)
* Some images of your boss

## Install

Nothing. Only a webcam and a tensorflow.js supported browser are needed.

## Reference

* [BossSensor](https://github.com/Hironsan/BossSensor)
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
* yarn `^1.13.0`

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
