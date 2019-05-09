// @flow

import React from 'react'
import type { ComponentType } from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import pink from '@material-ui/core/colors/pink'
import deepPurple from '@material-ui/core/colors/deepPurple'
import CssBaseline from '@material-ui/core/CssBaseline'
import 'typeface-roboto'

// A theme with custom primary and secondary color.
// It's optional.
const theme = createMuiTheme({
  palette: {
    primary: pink,
    secondary: deepPurple
  },
  typography: {
    useNextVariants: true
  }
})

function withRoot(Component: ComponentType<*>) {
  function WithRoot(props: Object) {
    // MuiThemeProvider makes the theme available down the React tree
    // thanks to React context.
    return (
      <MuiThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...props} />
      </MuiThemeProvider>
    )
  }

  return WithRoot
}

export default withRoot
