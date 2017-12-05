import React, { Component } from 'react';

import Board from "./Board";

export default class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            myTurn: true,
        }
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        const myTurn = this.state.myTurn;

        if (winner(squares)) return;

        if (squares[i] === null && myTurn) {
            squares[i] = 'X';
            this.setState({
                history: history.concat([{
                    squares: squares
                }]),
                stepNumber: history.length,
                myTurn: !this.state.myTurn,
            });

        } else if (squares[i] === null && !myTurn) {
            squares[i] = 'O';
            this.setState({
                history: history.concat([{
                    squares: squares
                }]),
                stepNumber: history.length,
                myTurn: !this.state.myTurn,
            });
        }
    }

    jumpTo(step) {

        this.setState({
            stepNumber: step,
            myTurn: ( step % 2 ) === 0
        });

    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
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
            status = `${this.state.myTurn ? 'X' : 'O'}'s turn now :)`;
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

