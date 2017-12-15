import React, { Component } from 'react';
import  { connect }from 'react-redux'
import {changeTurns, jumpSteps} from "../actions/turnsAction";

import Board from "../components/Board";
import { winner }from '../reducers/turnsReducer'
import {spChangeTurns} from "../actions/singlePlayerAction";

class Game extends Component {

    jumpTo(step) {
        return this.props.jumpSteps(step);
    }

    handleClick(index){
        let singlePlayer = true;
        if(singlePlayer){
            return this.props.spChangeTurns(index);
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

        }else return null;
    }


    tie(board) {
        let moves = board.join('').replace(/ /g, '');
        return moves.length === 9;

    }

    copyBoard(baord){
        return baord.slice();
    }

    validMove(move, player, board){
        let newBoad = this.copyBoard(board);

        if(newBoad[move] !== '') return;
        if(newBoad[move] === ''){
            newBoad[move] = player;
            return newBoad;
        }
    }

    findAiMove(board) {
        let bestMoveScore = 100;
        let move = null;
        if(this.winning(board, 'X') || this.winning(board, 'O' || this.tie(board))) {
            return null;
        }
        for(let i = 0; i < board.length; i++){
            let newBoard = this.validMove(i, this.props.sp.minPlayer, board);
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
                let newBoard = this.validMove(i, this.props.sp.minPlayer, board);
                if (newBoard) {
                    let predictedMoveValue = this.maxScore(newBoard);
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
                let newBoard = this.validMove(i, this.props.sp.maxPlayer, board);
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

    gameUpdate(move){
        let player = this.props.sp.turn;
        let currentGameBoard = this.validMove(move, player, this.props.sp.board);

        if(this.winning(currentGameBoard, player)){

            this.props.spChangeTurns({
                board: currentGameBoard,
                winner: player
            });
            return;
        }

        if(this.tie(currentGameBoard)){

            this.props.spChangeTurns({
               board: currentGameBoard,
               winner: 'd'
            });
            return;
        }

        player = 'O';

        currentGameBoard = this.validMove(this.findAiMove(currentGameBoard), player, currentGameBoard);

        if(this.winning(currentGameBoard, player)){
            this.props.spChangeTurns({
                board: currentGameBoard,
                winner: player
            });
            return;
        }

        if(this.tie(currentGameBoard)){
            this.props.spChangeTurns({
                board: currentGameBoard,
                winner: player
            });
            return;
        }

        this.props.spChangeTurns({
            board: currentGameBoard,
        });

    }

    render() {

        const history = this.props.mp.history;
        // const current = history[this.props.mp.stepNumber];
        // const squares = current.squares;
        const squares = this.props.sp.board;
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
                    onClick={(i) => this.gameUpdate(i)}
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
        },
        spChangeTurns(values){
            dispacth(spChangeTurns(values))
        }


    }
};


export  default connect(mapStateToProps, mapDispatchToProps)(Game);
