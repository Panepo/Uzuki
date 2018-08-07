import React, { Component } from 'react'
import './Content.css'

export default class Content extends Component {
  render() {
    return (
      <main className="layout-main mdl-layout__content">
        <div className="layout-container mdl-grid">
          <div className="mdl-cell mdl-cell--3-col">Drawer</div>
          <div className="layout-content mdl-color--white mdl-shadow--4dp content mdl-color-text--grey-800 mdl-cell mdl-cell--9-col">
            Content
          </div>
        </div>
      </main>
    )
  }
}
