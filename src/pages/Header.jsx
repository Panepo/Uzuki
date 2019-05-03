// @flow

import * as React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import IconBookmark from '@material-ui/icons/Bookmarks'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { linkDrawer, linkHeader } from '../constants/link.constant'
import type { LinkSite } from '../models/misc.model'

const styles = (theme: Object) => ({
  root: {},
  appBar: {
    position: 'relative'
  },
  button: {
    margin: theme.spacing.unit
  },
  drawer: {
    color: '#616161'
  },
  drawerTitle: {
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    color: '#ff6699',
    marginLeft: -12,
    marginRight: 20
  }
})

type ProvidedProps = {
  classes: Object
}

type Props = {}

type State = {
  drawer: boolean
}

class Header extends React.Component<ProvidedProps & Props, State> {
  state = {
    drawer: false
  }

  toggleDrawer = (side: string, open: boolean) => () => {
    this.setState({
      [side]: open
    })
  }

  render() {
    const { classes } = this.props

    const renderLink = linkHeader.map((data: LinkSite) => (
      <Link to={data.link} key={data.text}>
        <Button color="primary">{data.text}</Button>
      </Link>
    ))

    const renderDrawer = (
      <List>
        {linkDrawer.map((data: LinkSite) => (
          <ListItem
            button
            divider
            key={data.text}
            component="a"
            href={data.link}>
            <ListItemIcon>
              <IconBookmark color="secondary" />
            </ListItemIcon>
            <ListItemText primary={data.text} />
          </ListItem>
        ))}
      </List>
    )

    return (
      <header className={classes.root}>
        <AppBar position="static" color="inherit" className={classes.appBar}>
          <Drawer
            className={classes.drawer}
            open={this.state.drawer}
            onClose={this.toggleDrawer('drawer', false)}>
            <Typography
              className={classes.drawerTitle}
              variant="h6"
              color="inherit"
              noWrap>
              Reference
            </Typography>
            <div
              tabIndex={0}
              role="button"
              onClick={this.toggleDrawer('drawer', false)}
              onKeyDown={this.toggleDrawer('drawer', false)}>
              {renderDrawer}
            </div>
          </Drawer>
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
              onClick={this.toggleDrawer('drawer', true)}>
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              color="inherit"
              className={classes.grow}
              noWrap>
              Uzuki
            </Typography>
            {renderLink}
          </Toolbar>
        </AppBar>
      </header>
    )
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Header)
