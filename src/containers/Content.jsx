import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { imageUpload } from '../actions'
import ImageUploaderM from '../components/ImageUploaderM'
import './Content.css'

class Content extends Component {
  renderContent = () => {
    const { contentDisplay } = this.props

    if (contentDisplay) {
      return (
        <div className="layout-content mdl-color--white mdl-shadow--4dp content mdl-color-text--grey-800 mdl-cell mdl-cell--6-col">
          Content
        </div>
      )
    }
  }
  render() {
    const { imageUpload, tfjsTick } = this.props
    return (
      <main className="layout-main mdl-layout__content">
        <div className="layout-container mdl-grid">
          <div className="mdl-cell mdl-cell--1-col mdl-cell--hide-tablet mdl-cell--hide-phone" />
          <div className="layout-content mdl-color--white mdl-shadow--4dp mdl-color-text--grey-800 mdl-cell mdl-cell--4-col">
            <ImageUploaderM propFunc={imageUpload} serverTick={tfjsTick} />
          </div>
          {this.renderContent()}
        </div>
      </main>
    )
  }
}

Content.propTypes = {
  imageUpload: PropTypes.func.isRequired,
  contentDisplay: PropTypes.bool.isRequired,
  tfjsTick: PropTypes.number.isRequired
}

const mapStateToProps = function(state) {
  return {
    contentDisplay: state.reducerLayout.contentDisplay,
    tfjsTick: state.reducerTensor.serverTick
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    imageUpload: bindActionCreators(imageUpload, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Content)
