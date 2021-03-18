import React, { Component } from 'react'
import Player from '../Player/Player'
import './boardStyle.css'

export default class Board extends Component {
  state = {
    player1Id: "1",
    player1Score: 0,
    player1Current: 0,
    player1Active: 0,
    player2Id: "2",
    player2Score: 0,
    player2Current: 0,
    player2Active: 1,
    dice1: 0,
    dice2: 0,
  }

  randomDice = () => Math.trunc(Math.random() * 6) + 1;
  roleDice = () => this.setState({ dice1: this.randomDice(), dice2: this.randomDice() });
  hold = () => {
    console.log(this.state.player1Active);
    if (this.state.player1Active === 1) {
      this.setState({
        dice1: 0,
        dice2: 0,
        player1Score: this.state.player1Current + this.state.player1Score,
        player1Scurrent: 0,
        player1Active: 0,
        player2Active: 1,
      })
    }
    else {
      this.setState({
        dice1: 0,
        dice2: 0,
        player2Score: this.state.player2Current + this.state.player2Score,
        player2Scurrent: 0,
        player2Active: 0,
        player1Active: 1,
      })
    }
  }


  componentDidUpdate (){
    console.log("Parentupdated");
  }


  render() {
    return (
      <div className="boardContainer">
        <div className="buttons">
          <button><span><i className="crosshairs icon"></i></span> NEW GAME</button>
          <div className="diceContainer">
            <div className={`dice dice${this.state.dice1}`}></div>
            <div className={`dice dice${this.state.dice2}`}></div>
          </div>
          <div className="bottomBut">
            <button onClick={this.roleDice}
            ><span><i className="sync icon"></i>
              </span> ROLE DICE</button>
            <button onClick={this.hold}
            ><span><i className="hand rock icon"></i>
              </span>  HOLD</button>
            <input type="text" placeholder="Points to win" disabled={(true)} />
          </div>
        </div>
        <Player
          id={this.state.player1Id}
          score={this.state.player1Score}
          current={this.state.player1Current}
          active={this.state.player1Active} />
        <Player
          id={this.state.player2Id}
          score={this.state.player2Score}
          current={this.state.player2Current}
          active={this.state.player2Active} />
      </div>
    )
  }
}
