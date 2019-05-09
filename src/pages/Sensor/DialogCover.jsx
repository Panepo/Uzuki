// @flow

import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'

const styles = (theme: Object) => ({
  iframe: {
    width: '1600px',
    height: '800px'
  }
})

type Props = {
  classes: Object,
  dialogStatus: boolean,
  toggleDialog: (target: string, onoff: boolean) => () => null
}

const DialogCover = (props: Props) => {
  return (
    <Dialog
      className={props.classes.root}
      open={props.dialogStatus}
      onClose={props.toggleDialog('cover', false)}
      aria-labelledby="select-dialog-title"
      aria-describedby="select-dialog-description"
      maxWidth={'xl'}>
      <iframe
        className={props.classes.iframe}
        title="nonsense"
        src="https://svenstaro.github.io/genact/"
      />
    </Dialog>
  )
}

DialogCover.propTypes = {
  classes: PropTypes.object.isRequired,
  dialogStatus: PropTypes.bool.isRequired,
  toggleDialog: PropTypes.func.isRequired
}

export default withStyles(styles)(DialogCover)
