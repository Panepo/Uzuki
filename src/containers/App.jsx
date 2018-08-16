import React, { Component } from 'react'
import Header from './Header'
import Drawer from './Drawer'
import Content from './Content'
import Footer from './Footer'
import './App.css'

export default class App extends Component {
  render() {
    return (
      <div>
        <div className="layout-app mdl-layout mdl-js-layout mdl-layout--fixed-header">
          <Header />
          <Drawer />
          <div className="layout-ribbon" />
          <Content />
          <Footer />
        </div>
      </div>
    )
  }
}