import React, { Component } from 'react';
import  { connect }from 'react-redux'
import {changeTurns, jumpSteps} from "../actions/turnsAction";

import Board from "../components/Board";
import { winner }from '../reducers/turnsReducer'

class Game extends Component {

    jumpTo(step) {
        return this.props.jumpSteps(step);
    }

    handleClick(index){
        let singlePlayer = false
        if(singlePlayer){
            return 1;
        }else return this.props.changeTurns(index);
    }

     winning(board, player){
        if(
            (board[0] === player && board[1] === player && board[2] === player) ||
            (board[3] === player && board[4] === player && board[5] === player) ||
            (board[6] === player && board[7] === player && board[8] === player) ||
            (board[0] === player && board[3] === player && board[6] === player) ||
            (board[1] === player && board[4] === player && board[7] === player) ||
            (board[2] === player && board[5] === player && board[8] === player) ||
            (board[0] === player && board[4] === player && board[8] === player) ||
            (board[2] === player && board[4] === player && board[6] === player)
        ){
            return true;

        }else return false;
    }


    tie(board) {
        let moves = board.join('').replace(/ /g, '');
        if (moves.length === 9) {
            return true;
        }
        return false;
    }

    copyBoard(baord){
        return baord.slice(0);
    }

    validMove(move, player, board){
        let newBoad = this.copyBoard(board);
        if(newBoad[move] === null){
            newBoad[move] = player;
            return newBoad;
        }else return null;
    }

    findAiMove(board) {
        let bestMoveScore = 100;
        let move = null;
        if(this.winning(board, 'X') || this.winning(board, 'O' || this.tie(board))) {
            return null;
        }
        for(let i = 0; i < board.length; i++){
            let newBoard = this.validMove(i, this.state.minPlayer, board);
            if(newBoard) {
                let moveScore = this.maxScore(newBoard);
                if (moveScore < bestMoveScore) {
                    bestMoveScore = moveScore;
                    move = i;
                }
            }
        }
        return move;
    }

    minScore(board) {
        if (this.winning(board, 'X')) {
            return 10;
        } else if (this.winning(board, 'O')) {
            return -10;
        } else if (this.tie(board)) {
            return 0;
        } else {
            let bestMoveValue = 100;
            let move = 0;
            for (let i = 0; i < board.length; i++) {
                let newBoard = this.validMove(i, this.state.minPlayer, board);
                if (newBoard) {
                    let predictedMoveValue = this.state.maxScore(newBoard);
                    if (predictedMoveValue < bestMoveValue) {
                        bestMoveValue = predictedMoveValue;
                        move = i;
                    }
                }
            }
            return bestMoveValue;
        }
    }

    maxScore(board) {
        if(this.winning(board, 'X')) {
            return 10;
        } else if(this.winning(board, 'O')) {
            return -10;
        } else if(this.tie(board)) {
            return 0;
        } else {
            let bestMoveValue = -100;
            let move = 0;
            for (let i = 0; i < board.length; i++) {
                let newBoard = this.validMove(i, this.state.maxPlayer, board);
                if (newBoard) {
                    let predictedMoveValue = this.minScore(newBoard);
                    if (predictedMoveValue > bestMoveValue) {
                        bestMoveValue = predictedMoveValue;
                        move = i;
                    }
                }
            }
            return bestMoveValue;
        }
    }

    render() {

        console.log(this.props);

        const history = this.props.mp.history;
        const current = history[this.props.mp.stepNumber];
        const squares = current.squares;
        const theWinner = winner(squares);
        let status;

        const moves = history.map((step, move) => {
            const desc = move ? 'Go to move #' + move : 'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            )
        });


        if (theWinner) {
            status = `Winner: ${theWinner}`;
        } else {
            status = `${this.props.myTurn ? 'X' : 'O'}'s turn now :)`;
        }

        return (
            <div className="container">
                <div className="row">
                    One
                </div>
                <div className="row">
                    Two
                    <div className="col neat">1</div>
                    <div className="col">2</div>
                    <div className="col neat">3</div>
                </div>
                <div className="row">
                    Three
                    <div className="col">4</div>
                    <div className="col neat">5</div>
                    <div className="col">6</div>
                </div>
                <div className="row">
                    Four
                    <div className="col neat">7</div>
                    <div className="col">8</div>
                    <div className="col neat">9</div>
                </div>
                <div className="row">
                    Five
                    <div className="game">
                    <div className="game-board">
                    <Board
                    squares={squares}
                    onClick={(i) => this.handleClick(i)}
                    />
                    </div>
                    <div className="game-info">
                    <div> {status}</div>

                    <ol>
                    {moves}
                    </ol>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}



const mapStateToProps = (state) => {
    return{
        mp: state.turnsReducer,
        sp: state.singlePlayerReducer
    }
};

const mapDispatchToProps = (dispacth) => {
    return{
        changeTurns (index){
            dispacth(changeTurns(index))
        },
        jumpSteps (step){
            dispacth(jumpSteps(step))
        }

    }
};


export  default connect(mapStateToProps, mapDispatchToProps)(Game);
