class EnvironmentValues {
  title = 'Uzuki'
  urlDev = '/'
  urlProd = 'https://panepo.github.io/Uzuki/'
  GithubLink = 'https://github.com/Panepo/Uzuki'
  GoogleAnalyticsID = 'UA-106126363-3'
  ColorMenuIcon = '#ff6699'
  ColorRibbon = 'linear-gradient(165deg, #ff6699 20%, #ffccdc 90%)'

  // Video options
  videoCanvas = {
    width: 640,
    height: 360
  }

  // TinyFaceDetector options
  tinyInputSize = 160
  tinyThreshold = 0.5
}

// Export as singleton
const environmentValuesLoader = new EnvironmentValues()
Object.freeze(environmentValuesLoader)
export { environmentValuesLoader as environment }
