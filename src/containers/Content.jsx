import React, { Component } from 'react'
import Sensor from './Sensor'
import './Content.css'

export default class Content extends Component {
  render() {
    return (
      <main className="layout-main mdl-layout__content">
        <Sensor />
      </main>
    )
  }
}
