// @flow

import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import IconDelete from '@material-ui/icons/Delete'
import IconCancel from '@material-ui/icons/Cancel'

const styles = (theme: Object) => ({})

type Props = {
  classes: Object,
  dialogStatus: boolean,
  imageSrc: string,
  toggleDialog: (target: string, onoff: boolean, name: string) => () => null,
  handleAccept: (
    target: string
  ) => (event: SyntheticEvent<HTMLInputElement>) => null
}

const DialogDelete = (props: Props) => {
  return (
    <Dialog
      open={props.dialogStatus}
      onClose={props.toggleDialog('delete', false, '')}
      aria-labelledby="select-dialog-title"
      aria-describedby="select-dialog-description"
      maxWidth={'xl'}>
      <DialogTitle id="select-dialog-title">Delete</DialogTitle>
      <DialogContent>
        <img src={props.imageSrc} alt={'delete'} height={256} />
      </DialogContent>
      <DialogActions>
        <Tooltip title="Delete file">
          <IconButton
            className={props.classes.icon}
            onClick={props.handleAccept('delete')}
            color="primary">
            <IconDelete />
          </IconButton>
        </Tooltip>
        <Tooltip title="Cancel">
          <IconButton
            className={props.classes.icon}
            onClick={props.toggleDialog('delete', false, '')}
            color="secondary">
            <IconCancel />
          </IconButton>
        </Tooltip>
      </DialogActions>
    </Dialog>
  )
}

DialogDelete.propTypes = {
  classes: PropTypes.object.isRequired,
  dialogStatus: PropTypes.bool.isRequired,
  toggleDialog: PropTypes.func.isRequired,
  handleAccept: PropTypes.func.isRequired
}

export default withStyles(styles)(DialogDelete)
