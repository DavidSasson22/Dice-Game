import React, { Component } from 'react'
import Player from '../Player/Player'
import './boardStyle.css'

export default class Board extends Component {

  //Set all state and props
  state = {
    player1Id: "1",
    player1Score: 0,
    player1Current: 0,
    player1Active: 0,
    player2Id: "2",
    player2Score: 0,
    player2Current: 0,
    player2Active: 1,
    dice1: null,
    dice2: 0,
    input: false,
    toWin: "",
    playAble: false,
  }


  //Random function for the dice
  randomDice = () => Math.trunc(Math.random() * 6) + 1;


  //Set new values for dices
  roleDice1 = () => {
    console.log();
    this.setState({
      dice1: this.randomDice(),
      dice2: this.randomDice(),
    })
  }


  //Update player score, curront score, and passes the turn to other player according to game's rules
  roleDice2 =  () => {
    if (this.state.player1Active === 1) {
      if (this.state.dice1 === this.state.dice2) {
        this.hold();
        this.setState({ player1Current: 0 });
      }
      else {
        this.setState({
          player1Current: this.state.player1Current + this.state.dice1 + this.state.dice2,
        })
      }
    }
    else {
      if (this.state.dice1 === this.state.dice2) {
        this.hold();
        this.setState({ player2Current: 0 });
      }
      else {
        this.setState({
          player2Current: this.state.player2Current + this.state.dice1 + this.state.dice2,
        })
      }
    }
  };


  //Combines roleDice1 and roleDice2 in async way
  roleDice = async () => {
    if (this.state.playAble) {
      this.roleDice1();
      setTimeout(() => {
        this.roleDice2();
      }, 500);
    }
    else {
      alert("Please insert a winning value at the bottom of the page, and than click on the 'NEW GAME' button");
    }
  }


  //Update values and pass turn to other player
  hold1 = async () => {
    this.setState({
      dice1: null,
      dice2: 0,
      player1Current: 0,
      player2Current: 0,
    })
    if (this.state.player1Active === 1) {
      this.setState({
        player1Score: this.state.player1Current + this.state.player1Score,
        player1Active: 0,
        player2Active: 1,
      })
    }
    else if (this.state.player2Active === 1) {
      this.setState({
        player2Score: this.state.player2Current + this.state.player2Score,
        player2Active: 0,
        player1Active: 1,
      })
    }
    else {
      alert("You should role the dice at least once before click on the HOLD button")
    }
  }


  //Call hold1 and than check if player won
  hold = async () => {
    if (this.state.playAble) {
      await this.hold1();
      this.checkWinCon();
    }
    else {
      alert("Please insert a winning value at the bottom of the page, and than click on the 'NEW GAME' button");
    }
  }


  checkWinCon = () => {
    if (this.state.player2Score >= this.state.toWin) {
      this.setState({
        player2Score: 'YOU WON!',
        player1Score: 'You loose',
        input: false,
        playAble: false,
        toWin: 0,
      })
    }
    if (this.state.player1Score >= this.state.toWin) {
      this.setState({
        player1Score: 'YOU WON!',
        player2Score: 'You loose',
        input: false,
        playAble: false,
        toWin: 0,
      })
    }
  }


  updatePointsToWin = (e) => {
    this.setState({ toWin: e.target.value });
  }


  newGame = async () => {
    // await this.disablePontsToWin();
    if (this.state.toWin > 0) {
      this.setState({
        input: true,
        player1Score: 0,
        player1Current: 0,
        player1Active: 0,
        player2Score: 0,
        player2Current: 0,
        player2Active: 1,
        dice1: null,
        dice2: 0,
        playAble: true,
      })
    }
    else {
      alert("You shoud set point's to win value at the bottom of the page before starting a new gane")
    }
  }


  render() {
    return (
      <div className="boardContainer">
        <div className="buttons">
          <button onClick={this.newGame}><span><i className="crosshairs icon"></i></span> NEW GAME</button>
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
            <input type="number" placeholder="Points to win" value={this.state.toWin} disabled={this.state.input} onChange={this.updatePointsToWin} />
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
