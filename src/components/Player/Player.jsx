import React, { Component } from 'react'
import './playerStyle.css'

export default class Player extends Component {

  render() {
    return (
      <div className={`player player${this.props.active}`}>
        <h1>PLAYER {this.props.id} <span style={{ color: this.props.active ? '#3d405b' : 'transparent' }}>.</span></h1>
        <h1 className="score">{this.props.score}</h1>
        <br />
        <div className="current">
          <h3>Current</h3>
          <h2>{this.props.current}</h2>
        </div>
      </div>
    )
  }
}
