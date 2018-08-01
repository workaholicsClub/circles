import React, { Component } from 'react'
import logoImage from './logo.svg'

class CenteredLayout extends Component {
  render() {
    const logo = this.props.logo ? (
      <img alt="logo" className="img-fluid d-block mx-5 pb-4" src={logoImage} />
    ) : (
      ''
    )

    const title = this.props.title ? (
      <h1 className="display-4 text-center">{this.props.title}</h1>
    ) : (
      ''
    )

    return (
      <div className="py-5">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-md-6">
              {logo}
              {title}
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CenteredLayout
