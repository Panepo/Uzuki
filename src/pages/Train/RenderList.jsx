// @flow

import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import IconButton from '@material-ui/core/IconButton'
import IconDelete from '@material-ui/icons/Delete'
import IconAdd from '@material-ui/icons/PersonAdd'
import IconCamera from '@material-ui/icons/Camera'
import Tooltip from '@material-ui/core/Tooltip'
import { basename } from 'path'

const imageList = require('../../images/list.jpg')

const styles = (theme: Object) => ({
  gridList: {
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)'
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
  },
  icon: {
    color: 'white'
  }
})

type Props = {
  classes: Object,
  faces: string[],
  toggleDialog: (target: string, onoff: boolean, key: number) => () => null
}

const RenderList = (props: Props) => {
  return (
    <GridList
      cellHeight={256}
      cols={5}
      spacing={1}
      className={props.classes.gridList}>
      {props.faces.map((file, index) => (
        <GridListTile key={file} cols={1} rows={1}>
          <img src={file} alt={file} width={256} height={256} />
          <GridListTileBar
            title={basename(file)}
            titlePosition="bottom"
            actionIcon={
              <Tooltip title="Delete file">
                <IconButton
                  className={props.classes.icon}
                  onClick={props.toggleDialog('delete', true, index)}>
                  <IconDelete />
                </IconButton>
              </Tooltip>
            }
            actionPosition="right"
            className={props.classes.titleBar}
          />
        </GridListTile>
      ))}
      {props.faces.length === 0 ? (
        <GridListTile cols={1} rows={1}>
          <img src={imageList} alt={'add'} width={256} height={256} />
          <GridListTileBar
            title={'Add image'}
            titlePosition="bottom"
            actionIcon={
              <div>
                <Tooltip title="Add face image from computer">
                  <IconButton
                    className={props.classes.icon}
                    onClick={props.toggleDialog('upload', true, 0)}>
                    <IconAdd />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Start camera to capture face image">
                  <IconButton
                    className={props.classes.icon}
                    onClick={props.toggleDialog('camera', true, 0)}>
                    <IconCamera />
                  </IconButton>
                </Tooltip>
              </div>
            }
            actionPosition="right"
            className={props.classes.titleBar}
          />
        </GridListTile>
      ) : null}
    </GridList>
  )
}

RenderList.propTypes = {
  classes: PropTypes.object.isRequired,
  faces: PropTypes.arrayOf(PropTypes.string).isRequired,
  toggleDialog: PropTypes.func.isRequired
}

export default withStyles(styles)(RenderList)
