// @flow

import type { LinkSite } from '../models/misc.model'

export const linkHeader: LinkSite[] = [
  { text: 'Home', link: '/home' },
  { text: 'Train', link: '/train' },
  { text: 'Setting', link: '/setting' },
  { text: 'Sensor', link: '/sensor' }
]

export const linkDrawer: LinkSite[] = [
  { text: 'BossSensor', link: 'https://github.com/Hironsan/BossSensor' },
  {
    text: 'face-api.js',
    link: 'https://github.com/justadudewhohacks/face-api.js'
  },
  { text: 'Tensorflow', link: 'https://www.tensorflow.org/' },
  { text: 'Tensorflow.js', link: 'https://js.tensorflow.org/' },
  { text: 'React', link: 'https://facebook.github.io/react/' },
  { text: 'Redux', link: 'http://redux.js.org/' },
  { text: 'Material Design Lite', link: 'https://getmdl.io/' },
  { text: 'Material-UI', link: 'https://material-ui.com/' },
  { text: 'Uzuki', link: 'https://github.com/Panepo/Uzuki' }
]
