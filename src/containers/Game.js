import React, { Component } from 'react';
import  { connect }from 'react-redux'
import {changeTurns, jumpSteps} from "../actions/turnsAction";

import Board from "../components/Board";

class Game extends Component {
    jumpTo(step) {
        return this.props.jumpSteps(step);
    }

    handleClick(index){
        return this.props.changeTurns(index);
    }

    render() {

        const history = this.props.history;
        const current = history[this.props.stepNumber];
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
        )
    }
}



const mapStateToProps = (state) => {
    return{
        ...state.turnsReducer,
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




function winner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}