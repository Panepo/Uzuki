import React, { Component } from 'react'
import IframeCover from './IframeCover'
import { listLink } from '../constants/ConstLink'
import './Header.css'

export default class Header extends Component {
  generateLink = () => {
    const linkOut = []
    listLink.forEach((data, i) => {
      let linkTemp = (
        <a
          className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--primary"
          key={'header-link' + i.toString()}
          href={data.link}>
          {data.text}
        </a>
      )
      linkOut.push(linkTemp)
    })
    return linkOut
  }

  render() {
    return (
      <header className="layout-header mdl-layout__header mdl-layout__header--scroll mdl-color--grey-100 mdl-color-text--grey-800">
        <IframeCover />
        <div className="mdl-layout__header-row mdl-shadow--4dp">
          <span className="mdl-layout-title mdl-typography--title">
            <b>Uzuki</b>
          </span>
          <div className="mdl-layout-spacer" />
          <nav className="mdl-navigation">{this.generateLink()}</nav>
        </div>
      </header>
    )
  }
}
